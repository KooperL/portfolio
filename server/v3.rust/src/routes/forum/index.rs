use rocket::{get, http::Status, serde::json::Json};
use std::fs;
//use std::{str,fs};
#[path = "../../types/response.rs"] mod response;
#[path = "../../types/jsonContent.rs"] mod json_content;
use std::collections::HashMap;


#[get("/forum")]                                                                            
pub async fn forumIndexRouteGet() -> Result<Json<response::GenericResponse<String>>, Status> {
    Ok(Json(response::GenericResponse {
        success: true,
        data: Some(String::from("test")),
        errorMessage: None,
    }))
}
