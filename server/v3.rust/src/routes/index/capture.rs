use rocket::{get, post, http::Status, serde::json::Json, request};
use serde::Deserialize;
use std::{fs};
use sqlx::{migrate::MigrateDatabase, Row, Sqlite, SqlitePool};
#[path = "../../types/response.rs"] mod response;

#[derive(Deserialize)]
pub struct CapturePayload {
	pub uuid: String,
	pub canvas_hash: String,
	pub version: String,
	pub platform: String,
	pub browser: String,
	pub darkMode: String,
	pub cookieEnabled: String,
	pub actualHeight: String,
	pub actualWidth: String,
	pub pixelDepth: String,
	pub innerHeight: String,
	pub outerHeight: String,
	pub innerWidth: String,
	pub outerWidth: String,
}

// impl<'a, 'r> FromRequest<'a, 'r> for UserAgent {
//     type Error = std::convert::Infallible;
// 
//     fn from_request(request: &'a Request<'r>) -> request::Outcome<Self, Self::Error> {
//         let user_agent = request.headers().get_one("User-Agent");
//         match user_agent {
//           Some(user_agent) => {
//             Outcome::Success(UserAgent(user_agent.to_string()))
//           },
//           None => Outcome::Failure(Status::Unauthorized)
//         }
//     }
// }

#[derive(Debug)]
pub struct ClientIp(String);

#[rocket::async_trait]
impl<'r> request::FromRequest<'r> for ClientIp {
    type Error = ();

    async fn from_request(request: &'r request::Request<'_>) -> request::Outcome<Self, Self::Error> {
        request.headers().get_one("X-Forwarded-For")
            // .and_then(|x| x.split(',').next())
            // .or_else(|| request.remote().map(|r| r.ip().to_string().trim()))
            // .map(ClientIp)
            // .map(request::Outcome::Success)
            // .unwrap_or_else(|| request::Outcome::Failure((Status::BadRequest, ())))
            .map(|ip| ClientIp(ip.to_string()))
            .map(request::Outcome::Success)
            .unwrap_or_else(|| request::Outcome::Failure((Status::BadRequest, ())))
    }
}

#[derive(Debug)]
pub struct UserAgent(String);

#[rocket::async_trait]
impl<'r> request::FromRequest<'r> for UserAgent {
    type Error = ();

    async fn from_request(request: &'r request::Request<'_>) -> request::Outcome<Self, Self::Error> {
        request.headers().get_one("User-Agent")
            .map(|ua| UserAgent(ua.to_string()))
            .map(request::Outcome::Success)
            .unwrap_or_else(|| request::Outcome::Failure((Status::BadRequest, ())))
    }
}

#[post("/capture", data = "<input>")]                                                                            
pub async fn captureRoutePost(input: Json<CapturePayload>, user_agent: UserAgent, client_ip: ClientIp) -> Result<Json<response::GenericResponse<String>>, Status> {
    const DB_URL: &str = "sqlite://server/data/database.db";
    let db = SqlitePool::connect(DB_URL).await.unwrap();
    let time = format!("{}", chrono::Local::now().format("%Y-%m-%d %H:%M:%S"));
    let insertStatement = "INSERT INTO fingerprint VALUES (
		  NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
		);";
    let result_monitor = sqlx::query(insertStatement)
        .bind(&input.uuid)
        .bind(&input.canvas_hash)
        .bind(&input.platform)
        .bind(&input.browser)
        .bind(&input.version)
        .bind(user_agent.0)
        .bind(&input.darkMode)
        .bind(&input.cookieEnabled)
        .bind(&input.actualHeight)
        .bind(&input.actualWidth)
        .bind(&input.pixelDepth)
        .bind(&input.innerHeight)
        .bind(&input.innerWidth)
        .bind(&input.outerHeight)
        .bind(&input.outerWidth)
        .bind(client_ip.0)
    .execute(&db)
    .await
    .unwrap();

    Ok(Json(response::GenericResponse {
        success: true,
        data: None,
        errorMessage: None,
    }))
}
