use rocket::{get, http::Status, serde::json::Json};
use std::fs;
//use std::{str,fs};
#[path = "../../types/response.rs"] mod response;
#[path = "../../types/jsonContent.rs"] mod json_content;
use std::collections::HashMap;


#[get("/projects")]                                                                            
pub async fn projectIndexRouteGet() -> Result<Json<response::GenericResponse>, Status> {
    let file_contents = std::fs::read_to_string("../data/responses/projectIndexPage.json").expect("File should have been opened");
    let parsed_file: Vec<json_content::json_response> = serde_json::from_str(&file_contents).unwrap();
    Ok(Json(response::GenericResponse {
        success: true,
        data: Some(String::from("test")),
        errorMessage: None,
    }))
}
