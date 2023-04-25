use serde::{Serialize};

#[derive(Serialize)]
pub struct GenericResponse {
    pub success: bool,
    pub data: Option<String>,
    pub errorMessage: Option<String>,
}

