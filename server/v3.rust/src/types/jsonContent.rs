use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct json_response {
    #[serde(rename = "type")]
    pub data_type: String,
    pub text: Option<String>,
    pub data: Vec<String>,
}

