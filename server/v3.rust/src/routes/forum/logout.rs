use rocket::{get, post, http::Status, serde::json::Json, request, futures::StreamExt, http::CookieJar, http::Cookie};
use serde::Deserialize;
use std::{fs, io::Read};
use sqlx::{migrate::MigrateDatabase, Row, Sqlite, SqlitePool};
use rand::Rng;
use base64::{Engine as _, engine::general_purpose};
#[path = "../../types/response.rs"] mod response;
#[path = "../../types/auth.rs"] mod auth;
// use std::sync::{Arc, Mutex};
use tokio::sync::{Mutex};

use ring::{digest, pbkdf2, hmac};
use chrono::{Local, Duration};

#[derive(Debug, sqlx::FromRow)]
struct refresh_token_row {
    id: i64,
    date: String,
    forum_referesh_token: String,
    count: i64
}

pub struct bearer_token {
    header: auth::jwt_header,
    body: auth::jwt_access_token_body,
    // signature: String
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

#[tokio::main]
#[post("/forum/logout")]                                                                            
pub async fn logoutRoutePost(header_text: ApiKey<'_>, mut cookies: &CookieJar<'_>) -> Result<Json<response::GenericResponse<String>>, Status> {

    let encoded = general_purpose::STANDARD_NO_PAD.decode(header_text.0).unwrap();
    let decoded = String::from_utf8(encoded).unwrap();
    let split_header: Vec<&str> = decoded.split(" ").collect();
    let auth_type: String = String::from(split_header[0]);

    if auth_type != "Bearer" {
        // return request::Outcome::Failure((Status::Unauthorized, ()));
    }

    let auth_token: String = String::from(split_header[1]);
    let split_token: Vec<&str> = decoded.split(".").collect();
    let parsed_body: auth::jwt_access_token_body = serde_json::from_str(split_token[0]).unwrap();
    let parsed_header: auth::jwt_header = serde_json::from_str(split_token[1]).unwrap();
    let signature_external = split_token[2].as_bytes();

    let access_token_signing_string = dotenvy::var("forum-jwt-auth-token").expect("forum-jwt-auth-token must be set");
    let access_token_hmac_key = hmac::Key::new(hmac::HMAC_SHA256, access_token_signing_string.as_bytes());
    let string_of_token =  format!("{head}.{body}",
        head = serde_json::to_string(&parsed_header).unwrap(), 
        body = serde_json::to_string(&parsed_body).unwrap()
    );
    let string_of_token_as_bytes = string_of_token.as_bytes();
    let signature_internal = hmac::sign(&access_token_hmac_key, string_of_token_as_bytes);

    // TODO: if jwt_header.typ is tampered? Should be tracked in db
    let tokens_match = hmac::verify(&access_token_hmac_key, string_of_token_as_bytes, signature_external);
    if tokens_match.is_err() {
        // return request::Outcome::Failure((Status::Unauthorized, ()));
    };
    if parsed_body.expires > Local::now().timestamp() {
        // return request::Outcome::Failure((Status::Unauthorized, ()));
    }
    
    let token = bearer_token {
        header: parsed_header, 
        body: parsed_body
        // signature: String::from_utf8(signature_internal.).unwrap()
    };


    const DB_URL: &str = "sqlite://server/data/database.db";
    let pool = sqlx::sqlite::SqlitePoolOptions::new()
        .max_connections(5)
        .connect("sqlite://server/data/database.db?mode=rwc").await.unwrap();
    let time = format!("{}", chrono::Local::now().format("%Y-%m-%d %H:%M:%S"));
    let forumUserIsLoggedInQuery = "
      SELECT 
        id,
        date,
        forum_referesh_token,
        count(forum_user_id) as count
      from forum_refresh_tokens 
      where
        forum_user_id = ?;
    ";
    let mut user_is_logged_in = sqlx::query_as::<_, refresh_token_row>(forumUserIsLoggedInQuery)
        .bind(&token.body.user_id)
        .fetch_one(&pool).await.unwrap();

        if user_is_logged_in.count == 1 {
            let mut tx = pool.begin().await.expect("begin tx");
            let delete_specific_token_query = "DELETE FROM forum_refresh_tokens WHERE id = ?;";
            let userExists = sqlx::query(delete_specific_token_query)
                .bind(&user_is_logged_in.id)
                .execute(&mut tx)
                .await
                .unwrap();
            tx.commit().await.expect("tx commit");
            // Set cookie to nothing
            // Return success
            return Ok(Json(response::GenericResponse {
                success: true,
                data: None,
                errorMessage: None,
            }));
        } else {
        // Remove cookie
        cookies.remove(Cookie::named("refresh-token"));

        // Delete old refresh token
        let delete_old_refresh_query = "DELETE from forum_refresh_tokens where forum_user_id = ?;";
        Ok(Json(response::GenericResponse {
            success: false,
            data: None,
            errorMessage: Some(String::from("User is not logged in")),
        }))
    }
}


