use rocket::{get, post, http::Status, serde::json::Json, request};
use serde::Deserialize;
use std::{fs, io::Read};
use sqlx::{migrate::MigrateDatabase, Row, Sqlite, SqlitePool};
use rand::Rng;
use base64::{Engine as _, engine::general_purpose};
#[path = "../../types/response.rs"] mod response;
use ring::{digest, pbkdf2};
use std::sync::{Arc, Mutex};

static PBKDF2_ALG: pbkdf2::Algorithm = pbkdf2::PBKDF2_HMAC_SHA256;

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
#[post("/forum/register")]                                                                            
pub async fn registerRoutePost(auth_header: BasicAuthHeader) -> Result<Json<response::GenericResponse<String>>, Status> {
    const DB_URL: &str = "sqlite://server/data/database.db";
    let db = SqlitePool::connect(DB_URL).await.unwrap();
    let db = Arc::new(Mutex::new(db));
    let time = format!("{}", chrono::Local::now().format("%Y-%m-%d %H:%M:%S"));
	let forumUserExistsQuery = "
      SELECT 
        count(*)
      from forum_users
      where
        lower(forum_username) = lower(?)
      limit 5;
    ";
    let userExists = sqlx::query(forumUserExistsQuery)
        .bind(&auth_header.Username)
        .execute(&*db.lock().unwrap())
        .await
        .unwrap();
    
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
        let userExists = sqlx::query(forumUserExistsQuery)
            .bind(&time)
            .bind(&auth_header.Username.to_lowercase())
            .bind(&cred.to_ascii_lowercase())
            .bind(&salt)
        .execute(&*db.lock().unwrap())
            .await
            .unwrap();
    }

    Ok(Json(response::GenericResponse {
        success: true,
        data: None,
        errorMessage: None,
    }))
}
