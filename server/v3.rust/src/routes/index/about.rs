use rocket::{get, http::Status, serde::json::Json};
use std::fs;
//use std::{str,fs};
#[path = "../../types/response.rs"] mod response;
#[path = "../../types/jsonContent.rs"] mod json_content;
use std::collections::HashMap;


#[get("/about")]                                                                            
pub async fn aboutRouteGet() -> Result<Json<response::GenericResponse<Vec<json_content::json_response>>>, Status> {
    let file_contents = std::fs::read_to_string("../data/responses/aboutPage.json").expect("File should have been opened");
    let parsed_file: Vec<json_content::json_response> = serde_json::from_str(&file_contents).unwrap();
    Ok(Json(response::GenericResponse {
        success: true,
        data: Some(parsed_file),
        errorMessage: None,
    }))
}
