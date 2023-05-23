use rocket::{get, post, http::Status, serde::json::Json, request};
use serde::Deserialize;
use std::{fs, io::Read};
use sqlx::{migrate::MigrateDatabase, Row, Sqlite, SqlitePool};
use rand::Rng;
use base64::{Engine as _, engine::general_purpose};
#[path = "../../types/response.rs"] mod response;
#[path = "../../types/auth.rs"] mod auth;
use ring::{digest, pbkdf2};
// use std::sync::{Arc, Mutex};
use tokio::sync::{Mutex};


pub struct bearer_token {
    header: auth::jwt_header,
    body: auth::jwt_access_token_body,
    signature: String
}

#[rocket::async_trait]
impl<'r> request::FromRequest<'r> for bearer_token {
    type Error = ();
    async fn from_request(request: &'r request::Request<'_>) -> request::Outcome<Self, Self::Error> {
        let header_body = request.headers().get_one("Authorization");
            header_body.map(|header_text| {
                let encoded = general_purpose::STANDARD_NO_PAD.decode(header_text).unwrap();
                let decoded = String::from_utf8(encoded).unwrap();
                let split_header: Vec<&str> = decoded.split(" ").collect();
                let auth_type: String = String::from(split_header[0]);

                if auth_type != "Bearer" {
                    // Throw 401
                }

                let auth_token: String = String::from(split_header[1]);
                let split_token: Vec<&str> = decoded.split(".").collect();
                serde_json::parse::<jwt_header>(split_token[0]);
                let parsed_header = jwt_header {
                };
                let parsed_body = jwt_access_token_body {
                    Username: username,
                    Password: password
                };
            })
            .map(request::Outcome::Success)
            .unwrap_or_else(|| request::Outcome::Failure((Status::BadRequest, ())))
    }
}


#[tokio::main]
#[post("/forum/logout")]                                                                            
pub async fn logoutRoutePost(auth_header: bearer_token) -> Result<Json<response::GenericResponse<String>>, Status> {
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
        .bind(&auth_header.Username)
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
        let insertForumUserQuery = "INSERT INTO forum_users VALUES (NULL, ?, ?, ?, ?, 1, 1, 1);";
        let random = rand::thread_rng();
        let mut salt: Vec<u8> = Vec::new();
        for i in 0..salt_length {
            salt.push(random.clone().gen());
        }
        let its: std::num::NonZeroU32 = std::num::NonZeroU32::new(1000).unwrap();
        // let hash = crypto::pbkdf2::pbkdf2();
        let mut cred: [u8; 16] = [0u8; 16];
        let hash = pbkdf2::derive(PBKDF2_ALG, its, &salt,
            &auth_header.Password.as_bytes(), &mut cred);
        // let db = SqlitePool::connect(DB_URL).await.unwrap();
        let mut tx = pool.begin().await.expect("begin tx");
        let userExists = sqlx::query(forumUserExistsQuery)
            .bind(&time)
            .bind(&auth_header.Username.to_lowercase())
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

