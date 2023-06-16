use rocket::{get, post, http::Status, serde::json::Json, request};
use serde::Deserialize;
use std::{fs, io::Read};
use sqlx::{migrate::MigrateDatabase, Row, Sqlite, SqlitePool};
use rand::Rng;
use base64::{Engine as _, engine::general_purpose};
#[path = "../../types/response.rs"] mod response;
use ring::{digest, pbkdf2};
// use std::sync::{Arc, Mutex};
use tokio::sync::{Mutex};

static PBKDF2_ALG: pbkdf2::Algorithm = pbkdf2::PBKDF2_HMAC_SHA256;

#[derive(Debug)]
pub struct BasicAuthHeader {
    Username: String,
    Password: String,
}

struct ApiKey<'r>(&'r str);

#[derive(Debug)]
enum ApiKeyError {
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


#[tokio::main]
#[post("/forum/register")]                                                                            
pub async fn registerRoutePost(header_text: ApiKey<'_>) -> Result<Json<response::GenericResponse<String>>, Status> {
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
    let pool = sqlx::sqlite::SqlitePoolOptions::new()
        .max_connections(5)
        .connect("sqlite://server/data/database.db?mode=rwc").await.unwrap();
    let time = format!("{}", chrono::Local::now().format("%Y-%m-%d %H:%M:%S"));
	let forumUserExistsQuery = "
      SELECT 
       id 
      from forum_users
      where
        lower(forum_username) = lower(?)
      limit 1;
    ";
    //let mut tx = pool.begin().await.expect("begin tx");
    let userExists = sqlx::query(forumUserExistsQuery)
        .bind(&creds.Username)
        //.execute(&db.acquire())
        .execute(&pool)
        .await
        .unwrap();
    // db.close();
    
    if userExists.rows_affected() == 1 {
        return Ok(Json(response::GenericResponse {
            success: false,
            data: None,
            errorMessage: Some(String::from("Username exists")),
        }));
    } else {
        let salt_length = dotenvy::var("forum-register-salt-length").expect("FORUM-REGISTER-SALT-LENGTH must be set").parse::<i32>().unwrap();
        let random = rand::thread_rng();
        let mut salt: Vec<u8> = Vec::new();
        for i in 0..salt_length {
            salt.push(random.clone().gen());
        }
        let its: std::num::NonZeroU32 = std::num::NonZeroU32::new(1000).unwrap();
        // let hash = crypto::pbkdf2::pbkdf2();
        let mut cred: [u8; 16] = [0u8; 16];
        let hash = pbkdf2::derive(PBKDF2_ALG, its, &salt,
            &creds.Password.as_bytes(), &mut cred);
        // let db = SqlitePool::connect(DB_URL).await.unwrap();
        let mut tx = pool.begin().await.expect("begin tx");
		let insertForumUserQuery = "INSERT INTO forum_users VALUES (NULL, ?, ?, ?, ?, 1, 1, 1);";
        let insert_user = sqlx::query(insertForumUserQuery)
            .bind(&time)
            .bind(&creds.Username.to_lowercase())
            .bind(&cred.to_ascii_lowercase())
            .bind(&salt)
            .execute(&mut tx)
            .await
            .unwrap();
        tx.commit().await.expect("tx commit");
    }

    Ok(Json(response::GenericResponse {
        success: true,
        data: None,
        errorMessage: None,
    }))
}
