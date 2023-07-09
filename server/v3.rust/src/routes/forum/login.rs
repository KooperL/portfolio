use rocket::{get, post, http::Status, serde::json::Json, request, futures::TryStreamExt, http::CookieJar, http::Cookie};
use serde::Deserialize;
use std::{fs, io::Read};
use sqlx::{migrate::MigrateDatabase, Row, Sqlite, SqlitePool};
use rand::Rng;
use base64::{Engine as _, engine::general_purpose};
#[path = "../../types/response.rs"] mod response;
#[path = "../../types/auth.rs"] mod auth;
use ring::{digest, pbkdf2, hmac};
use chrono::{Local, Duration};
// use std::sync::{Arc, Mutex};
use std::sync::{Mutex};
// use tokio::sync::{Mutex};

static PBKDF2_ALG: pbkdf2::Algorithm = pbkdf2::PBKDF2_HMAC_SHA256;

#[derive(Debug)]
pub struct BasicAuthHeader {
    Username: String,
    Password: String,
}

pub struct ApiKey<'r>(&'r str);

#[derive(Debug)]
pub enum ApiKeyError {
    Missing,
    Invalid,
}

#[rocket::async_trait]
impl<'r> request::FromRequest<'r> for ApiKey<'r> {
    type Error = ApiKeyError;

    async fn from_request(req: &'r request::Request<'_>) -> request::Outcome<Self, Self::Error> {
        /// Returns true if `key` is a valid API key string.
        fn is_valid(key: &str) -> bool {
            key.len() > 1
        }

        match req.headers().get_one("x-api-key") {
            None => request::Outcome::Failure((Status::BadRequest, ApiKeyError::Missing)),
            Some(key) if is_valid(key) => request::Outcome::Success(ApiKey(key)),
            Some(_) => request::Outcome::Failure((Status::BadRequest, ApiKeyError::Invalid)),
        }
    }
}

// #[derive(Debug, sqlx::FromRow, Ord, PartialOrd, Eq, PartialEq)]
#[derive(Debug, sqlx::FromRow)]
pub struct forum_user_row {
    id: i64,
    forum_password_hash: Vec<u8>,
    forum_password_salt: String,
    role_id: i64,
}
#[post("/forum/login")]
pub async fn loginRoutePost(header_text: ApiKey<'_>, cookies: &CookieJar<'_>) -> Result<Json<response::GenericResponse<String>>, Status> {
    let encoded = general_purpose::STANDARD_NO_PAD.decode(header_text.0).unwrap();
    let decoded: String = String::from_utf8(encoded).unwrap();
    let split_string: Vec<&str> = decoded.split(":").collect();
    let username: String = String::from(split_string[0]);
    let password: String = String::from(split_string[1]);
    let creds = BasicAuthHeader {
        Username: username,
        Password: password
    };

    const DB_URL: &str = "sqlite://server/data/database.db";
    // TODO: Don't you dare ignore me
    let pool = sqlx::sqlite::SqlitePoolOptions::new()
        .max_connections(5)
        .connect("sqlite://server/data/database.db?mode=rwc").await.unwrap();

    let mut connection = pool.acquire()
        .await
        .unwrap();

    let time = format!("{}", chrono::Local::now().format("%Y-%m-%d %H:%M:%S"));
	let forumUserQuery = "
      SELECT 
        id, forum_password_hash, forum_password_salt, role_id
      FROM forum_users
     WHERE 
        lower(forum_username) = lower(?)
      LIMIT 1;
    ";

    let mut user_res = sqlx::query_as::<_, forum_user_row>(forumUserQuery)
        .bind(&creds.Username)
        .fetch(&pool);

    if let Some(row) = user_res.try_next().await.unwrap() {
        // let salt = row[0].forum_password_salt;
        let salt = row.forum_password_salt;
        let its: std::num::NonZeroU32 = std::num::NonZeroU32::new(1000).unwrap();

        let password_has_as_bytes: [u8; 16] = row.forum_password_hash.try_into().unwrap();
        let external_hash = pbkdf2::verify(PBKDF2_ALG, its, &salt.as_bytes(),
            &creds.Password.as_bytes(), &password_has_as_bytes);
       
        let access_token_life = dotenvy::var("forum-access-token-life").expect("forum-access-token-life must be set").parse::<i64>().unwrap();
        let refresh_token_life = dotenvy::var("forum-refresh-token-life").expect("forum-refresh-token-life must be set").parse::<i64>().unwrap();

        let access_token_signing_string = dotenvy::var("forum-jwt-auth-token").expect("forum-jwt-auth-token must be set");
        let access_token_hmac_key = hmac::Key::new(hmac::HMAC_SHA256, access_token_signing_string.as_bytes());
        let refresh_token_signing_string = dotenvy::var("forum-jwt-refresh-token").expect("forum-jwt-refresh-token must be set");
        let refresh_token_hmac_key = hmac::Key::new(hmac::HMAC_SHA256, refresh_token_signing_string.as_bytes());
        
        let token_header = r#""{"alg":"HS256","typ":"JWT"}"#;
        
        let date = Local::now();
        let access_token_exp = date.clone() + Duration::minutes(access_token_life);
        let refresh_token_exp = date.clone() + Duration::minutes(refresh_token_life);

        // generate access token
        let access_token_body = auth::jwt_access_token_body {
            user_id: row.id,
            iat: date.timestamp(), 
            role: row.role_id,
            username: creds.Username.clone(),
            expires: access_token_exp.timestamp(),
        };
        // sign access token
        let access_token_as_string = format!("{head}.{body}", head = token_header, body = serde_json::to_string(&access_token_body).unwrap());
        let access_token_hash = hmac::sign(&access_token_hmac_key, access_token_as_string.as_bytes());
        // TODO trim == ??

        // generate refresh token
        let refresh_token_body = auth::jwt_refresh_token_body {
            user_id: row.id,
            expires: refresh_token_exp.timestamp()
        };
        // sign refresh token
        let refresh_token_as_string = format!("{head}.{body}", head = token_header, body = serde_json::to_string(&access_token_body).unwrap());
        let access_token_hash = hmac::sign(&refresh_token_hmac_key, refresh_token_as_string.as_bytes());

        // Add cookie/header TODO
        cookies.add(Cookie::new("refresh-token", refresh_token_as_string));

        // Delete old refresh token
        let delete_old_refresh_query = "DELETE from forum_refresh_tokens where forum_user_id = ?;";

        // Store refresh token in refresh database
        let instert_new_refresh_query = "INSERT INTO forum_refresh_tokens VALUES (?, ?, ?, ?);";

        return Ok(Json(response::GenericResponse {
            success: true,
            data: None,
            errorMessage: None,
        }));
    } else {
        return Ok(Json(response::GenericResponse {
            success: false,
            data: None,
            errorMessage: Some(String::from("User not found")),
        }));
}
}
