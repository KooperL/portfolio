use rocket::{get, post, http::Status, serde::json::Json, request};
use serde::Deserialize;
use std::{fs};
use sqlx::{migrate::MigrateDatabase, Row, Sqlite, SqlitePool};
#[path = "../../types/response.rs"] mod response;

#[derive(Deserialize)]
struct CapturePayload {
	uuid: String,
	canvas_hash: String,
	version: String,
	platform: String,
	browser: String,
	darkMode: String,
	cookieEnabled: String,
	actualHeight: String,
	actualWidth: String,
	pixelDepth: String,
	innerHeight: String,
	outerHeight: String,
	innerWidth: String,
	outerWidth: String,
}

#[post("/capture", data = "<CapturePayload>")]                                                                            
pub async fn captureRoutePost(input: CapturePayload) -> Result<Json<response::GenericResponse<String>>, Status> {
    let time = format!("{}", chrono::Local::now().format("%Y-%m-%d %H:%M:%S"));
    let insertStatement = "INSERT INTO fingerprint VALUES (
		  NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
		);";
    let result_monitor = sqlx::query(insertStatementMonitor)
        .bind(&input.uuid)
        .bind(&input.canvas_hash)
        .bind(&input.platform)
        .bind(&input.browser)
        .bind(&input.version)
        .bind(r.Header.Get("User-Agent"))
        .bind(&input.darkMode)
        .bind(&input.cookieEnabled)
        .bind(&input.actualHeight)
        .bind(&input.actualWidth)
        .bind(&input.pixelDepth)
        .bind(&input.innerHeight)
        .bind(&input.innerWidth)
        .bind(&input.outerHeight)
        .bind(&input.outerWidth)
        .bind(The IP address),
    .execute(&db)
    .await
    .unwrap();

    Ok(Json(response::GenericResponse {
        success: true,
        data: None,
        errorMessage: None,
    }))
}
