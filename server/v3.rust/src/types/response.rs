use serde::{Serialize};

#[derive(Serialize)]
pub struct GenericResponse<T> {
    pub success: bool,
    pub data: Option<T>,
    pub errorMessage: Option<String>,
}
