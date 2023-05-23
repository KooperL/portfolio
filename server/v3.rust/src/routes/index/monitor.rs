use rocket::{get, post, http::Status, serde::json::Json, request};
use serde::Deserialize;
use std::{fs};
use sqlx::{migrate::MigrateDatabase, Row, Sqlite, SqlitePool};
#[path = "../../types/response.rs"] mod response;

#[derive(Deserialize)]
pub struct MonitorPayload {
	session_id: String, 
	uuid: String,
	page: String,
	prevPage: Option<String>,
}

#[post("/monitor", data="<input>")]                                                                            
pub async fn monitorRoutePost(input: Json<MonitorPayload>) -> Result<Json<response::GenericResponse<String>>, Status> {
    const DB_URL: &str = "sqlite://server/data/database.db";
    let db = SqlitePool::connect(DB_URL).await.unwrap();
    let time = format!("{}", chrono::Local::now().format("%Y-%m-%d %H:%M:%S"));
	let insertStatementMonitor = "INSERT INTO monitor VALUES (NULL, ?, ?, ?, ?);";
    let result_monitor = sqlx::query(insertStatementMonitor)
        .bind(&time)
        .bind(&input.uuid)
        .bind(&input.session_id)
        .bind(&input.page)
    .execute(&db)
    .await
    .unwrap();

	if let Some(e) = &input.prevPage {
		let insertStatementTrack = "INSERT INTO route_track VALUES (NULL, ?, ?, ?, ?);";
        let result_track = sqlx::query(insertStatementTrack).bind(&time).bind(&input.session_id).bind(&input.prevPage).bind(&input.page)
        .execute(&db)
        .await
        .unwrap();
	}
    Ok(Json(response::GenericResponse {
        success: true,
        data: None,
        errorMessage: None,
    }))
}
