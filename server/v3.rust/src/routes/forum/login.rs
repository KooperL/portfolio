use chrono::{Local, Duration};
use rocket::{get, post, http::Status, serde::json::Json, request};
use serde::Deserialize;
use std::{fs, io::Read};
use sqlx::{migrate::MigrateDatabase, Row, Sqlite, SqlitePool, SqlitePoolOptions};
use rand::Rng;
use base64::{Engine as _, engine::general_purpose};
#[path = "../../types/response.rs"] mod response;
#[path = "../../types/auth.rs"] mod auth;
use ring::{digest, pbkdf2, hmac};
// use std::sync::{Arc, Mutex};
use std::sync::{Mutex};
// use tokio::sync::{Mutex};

static PBKDF2_ALG: pbkdf2::Algorithm = pbkdf2::PBKDF2_HMAC_SHA256;

#[derive(Debug)]
pub struct AccessTokenResponse {
    AccessToken: String,
    Password: String,
}

#[derive(Debug)]
pub struct BasicAuthHeader {
    Username: String,
    Password: String,
}

#[rocket::async_trait]
impl<'r> request::FromRequest<'r> for BasicAuthHeader {
    type Error = ();
    async fn from_request(request: &'r request::Request<'_>) -> request::Outcome<Self, Self::Error> {
        request.headers().get_one("Authorization")
            .map(|header_text| {
                let decoded: Vec<&str> = String::from_utf8(general_purpose::STANDARD_NO_PAD.decode(header_text)
                    .unwrap()).unwrap().split(":").collect();
                let username: String = String::from(decoded[0]);
                let password: String = String::from(decoded[1]);
                BasicAuthHeader {
                    Username: username,
                    Password: password
            }})
            .map(request::Outcome::Success)
            .unwrap_or_else(|| request::Outcome::Failure((Status::BadRequest, ())))
    }
}

#[post("/forum/login")]
async fn loginRoutePost(auth_header: BasicAuthHeader) -> Result<Json<response::GenericResponse<String>>, Status> {
    const DB_URL: &str = "sqlite://server/data/database.db";
    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        //.connect("sqlite::memory:")
        .connect(DB_URL)
        .await?;


    let mut connection = pool.acquire()
        .await
        .unwrap();
    //let db = SqlitePool::connect(DB_URL).await.unwrap();
    // let db = Arc::new(Mutex::new(db));
    // let db = Mutex::new(db);
    let time = format!("{}", chrono::Local::now().format("%Y-%m-%d %H:%M:%S"));
	let forumUserQuery = "
      SELECT 
        id, forum_password_hash, forum_password_salt, role_id
      FROM forum_users
     WHERE 
        lower(forum_username) = lower(?)
      LIMIT 1;
    ";
    let mut user_res = sqlx::query(forumUserQuery)
        .bind(&auth_header.Username)
        //.execute(db.lock().await)
        // .execute(&db)
        .fetch(&connection).await;
    

    if let Some(row) = user_res.try_next().await.unwrap() {
        return Ok(Json(response::GenericResponse {
            success: false,
            data: None,
            errorMessage: Some(String::from("User not found")),
        }));
    } else {
        if let Some(row) = user_res {
        // let salt = row[0].forum_password_salt;
        let salt = row.get("forum_password_salt");
        let its: std::num::NonZeroU32 = std::num::NonZeroU32::new(1000).unwrap();

        let mut cred: [u8; 16] = [0u8; 16];
        let external_hash = pbkdf2::derive(PBKDF2_ALG, its, &salt,
            &auth_header.Password.as_bytes(), &mut cred);       
        if cred != user_res[0].forum_password_hash {
            // throw new error("Incorrect username/password")
        }
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
        let access_token_body = auth::access_token_body {
            user_id: user_res[0].id,
            iat: date.timestamp(), 
            exp: access_token_exp.timestamp(),
            role: user_res[0].role,
            username: user_res[0].username
        };
        // sign access token
        let access_token_hash = hmac::sign(&access_token_hmac_key, format!("{head}.{body}", head = token_header, body = access_token_body.to_string()).as_bytes());
        // generate refresh token
        let refresh_token_body = auth::access_token_body {
            user_id: user_res[0].id,
            exp: refresh_token_exp.timestamp()
        };
;
        // sign refresh token
        // Add cookie/header
        // Delete old refresh token
        let delete_old_refresh_query = "DELETE from forum_refresh_tokens where forum_user_id = ?;";
        // Store refresh token in refresh database
        let instert_new_refresh_query = "INSERT INTO forum_refresh_tokens VALUES (?, ?, ?, ?);";

    Ok(Json(response::GenericResponse {
        success: true,
        data: None,
        errorMessage: None,
    }))
        } else {
    return Ok(Json(response::GenericResponse {
        success: false,
        data: None,
        errorMessage: Some(String::from("Error fetching row")),
    }));
    }
}
}
