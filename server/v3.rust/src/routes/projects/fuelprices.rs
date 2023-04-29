use chrono::NaiveDateTime;
use rocket::{get, post, http::Status, serde::json::Json, request};
use serde::{Deserialize, Serialize};
use std::{fs};
use sqlx::{migrate::MigrateDatabase, Row, Sqlite, SqlitePool};
#[path = "../../types/response.rs"] mod response;
#[path = "../../types/jsonContent.rs"] mod json_content;
#[path = "../../utils/discordLogging.rs"] mod discordLogging;
use std::collections::HashMap;


#[derive(Debug, Serialize, Deserialize, PartialEq, Eq, sqlx::FromRow)]
struct FuelPrices {
    id: i32,
    date: String,
    minprice: String,
    maxprice: String,
    averageprice: String,
    wholesale: String,
}

#[get("/fuelprices")]                                                                            
pub async fn fuelpricesRouteGet() -> Result<Json<response::GenericResponse<String>>, Status> {
    const DB_URL: &str = "sqlite://server/data/database.db";
    let db = SqlitePool::connect(DB_URL).await.unwrap();
    let time = format!("{}", chrono::Local::now().format("%Y-%m-%d %H:%M:%S"));
    let result = sqlx::query_as::<_, FuelPrices>("SELECT * FROM fuelprices ORDER BY id DESC LIMIT ?;").bind(200)
    .fetch_all(&db)
    .await
    .unwrap();
    Ok(Json(response::GenericResponse {
        success: true,
        data: Some(String::from("asdf")),
        errorMessage: None,
        }))
    }
