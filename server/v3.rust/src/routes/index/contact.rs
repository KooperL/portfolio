use rocket::{get, post, http::Status, serde::json::Json, request};
use serde::Deserialize;
use std::{fs};
use sqlx::{migrate::MigrateDatabase, Row, Sqlite, SqlitePool};
#[path = "../../types/response.rs"] mod response;
#[path = "../../utils/discordLogging.rs"] mod discordLogging;
use std::collections::HashMap;


#[derive(Deserialize)]
pub struct contact_message {
    session_id: String,
    message: String,
}

#[post("/contact", data = "<input>")]                                                                            
pub async fn contactRoutePost(input: Json<contact_message>) -> Result<Json<response::GenericResponse<String>>, Status> {
	discordLogging::discord_post(format!("{}\n{}", input.session_id, input.message));
	let insertStatement = "INSERT INTO contact_messages VALUES (NULL, ?, ?, ?);";
    const DB_URL: &str = "sqlite://server/data/database.db";
    let db = SqlitePool::connect(DB_URL).await.unwrap();
    let time = format!("{}", chrono::Local::now().format("%Y-%m-%d %H:%M:%S"));
    let result = sqlx::query(insertStatement).bind(time).bind(&input.session_id).bind(&input.message)
    .execute(&db)
    .await
    .unwrap();
    Ok(Json(response::GenericResponse {
        success: true,
        data: None,
        errorMessage: None,
    }))
}
