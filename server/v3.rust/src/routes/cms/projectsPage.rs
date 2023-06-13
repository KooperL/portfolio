use rocket::{get, http::Status, serde::json::Json};
use std::fs;
#[path = "../../types/response.rs"] mod response;
#[path = "../../types/cms.rs"] mod cms_content;
use std::collections::HashMap;


#[get("/cms/projects")]                                                                            
pub async fn projectCmssRouteGet() -> Result<Json<response::GenericResponse<cms_content::CMSPage>>, Status> {
    let file_contents = std::fs::read_to_string("../data/responses/projectsPage.json").expect("File should have been opened");
    let parsed_file: cms_content::CMSPage = serde_json::from_str(&file_contents).unwrap();
    Ok(Json(response::GenericResponse {
        success: true,
        data: Some(parsed_file),
        errorMessage: None,
    }))
}
