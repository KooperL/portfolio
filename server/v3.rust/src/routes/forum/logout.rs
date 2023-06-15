use rocket::{get, post, http::Status, serde::json::Json, request, futures::StreamExt, http::Cookie, http::Cookies};
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

#[rocket::async_trait]
impl<'r> request::FromRequest<'r> for bearer_token {
    type Error = ();
    async fn from_request(request: &'r request::Request<'_>) -> request::Outcome<Self, Self::Error> {
        let verified_token = request.headers().get_one("Authorization")
            .map(|header_text| {
                let encoded = general_purpose::STANDARD_NO_PAD.decode(header_text).unwrap();
                let decoded = String::from_utf8(encoded).unwrap();
                let split_header: Vec<&str> = decoded.split(" ").collect();
                let auth_type: String = String::from(split_header[0]);

                if auth_type != "Bearer" {
                    return request::Outcome::Failure((Status::Unauthorized, ()));
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
                ).as_bytes();
                let signature_internal = hmac::sign(&access_token_hmac_key, string_of_token);

                // TODO: if jwt_header.typ is tampered? Should be tracked in db
                let tokens_match = hmac::verify(&access_token_hmac_key, string_of_token, signature_external);
                if tokens_match.is_err() {

                    return request::Outcome::Failure((Status::Unauthorized, ()));
                };
                if parsed_body.expires > Local::now().timestamp() {
                    return request::Outcome::Failure((Status::Unauthorized, ()));
                }
                
                bearer_token {
                    header: parsed_header, 
                    body: parsed_body
                    // signature: String::from_utf8(signature_internal.).unwrap()
                }
            })
            .map(request::Outcome::Success)
            .unwrap_or_else(|| request::Outcome::Failure((Status::BadRequest, ())));
    }
}


#[tokio::main]
#[post("/forum/logout")]                                                                            
pub async fn logoutRoutePost(auth_header: bearer_token,  cookies: Cookies) -> Result<Json<response::GenericResponse<String>>, Status> {
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
        .bind(&auth_header.body.user_id)
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
        cookies.remove_private(Cookie::named("refresh-token"));

        // Delete old refresh token
        let delete_old_refresh_query = "DELETE from forum_refresh_tokens where forum_user_id = ?;";
            Ok(Json(response::GenericResponse {
                success: false,
                data: None,
                errorMessage: Some(String::from("User is not logged in")),
            }))
        }
    }


