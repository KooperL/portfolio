use rocket::{get, post, http::Status, serde::json::Json};
use std::{fs};
use sqlx::{migrate::MigrateDatabase, Row, Sqlite, SqlitePool};
//use std::{str,fs};
#[path = "../../types/response.rs"] mod response;
#[path = "../../types/jsonContent.rs"] mod json_content;
#[path = "../../utils/discordLogging.rs"] mod discordLogging;
// #[path = "../../utils/diesel.rs"] mod database;
// #[path = "../../diesel/schema/insertables.rs"] mod insertables;
// #[path = "../../diesel/schema/models.rs"] mod models;
use std::collections::HashMap;


#[get("/contact")]                                                                            
pub async fn contactRouteGet() -> Result<Json<response::GenericResponse<Vec<json_content::json_response>>>, Status> {
    let file_contents = std::fs::read_to_string("../data/responses/contactPage.json").expect("File should have been opened");
    let parsed_file: Vec<json_content::json_response> = serde_json::from_str(&file_contents).unwrap();
    Ok(Json(response::GenericResponse {
        success: true,
        data: Some(parsed_file),
        errorMessage: None,
    }))
}


struct contact_message {
    session_id: String,
    message: String,
}

#[post("/contact", data = "<data>")]                                                                            
pub async fn contactRoutePost(data: String) -> Result<Json<response::GenericResponse<String>>, Status> {
		discordLogging::discord_post(format!("{data}"));
	//	discordLogging::discord_post(format!("{a},\n{b}", a=input.session_id, b=input.message));
	let insertStatement = "INSERT INTO contact_messages VALUES (?, ?, ?, ?);";

    // let connection = database::establish_connection();
    // diesel::insert_into(&models::ContactMessage).values(insertables::NewPost {
    //     date: "123",
    //     session_id: "123",
    //     message: "123",
    // }).execute(&connection).expect("Error inserting into database");
    
    const DB_URL: &str = "sqlite://server/data/database.db";
    let db = SqlitePool::connect(DB_URL).await.unwrap();
    let time = format!("{}", chrono::Local::now().format("%Y-%m-%d %H:%M:%S"));
    let result = sqlx::query("INSERT INTO contact_messages VALUES (NULL, ?, ?, ?);").bind(time).bind(&data).bind(&data)
    .execute(&db)
    .await
    .unwrap();
    Ok(Json(response::GenericResponse {
        success: true,
        data: Some(String::from("parsed_file")),
        errorMessage: None,
    }))
}
