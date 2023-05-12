use serde::{Serialize};

#[derive(Serialize)]
pub struct jwt_access_token_body {
    #[serde(rename = "userId")]
	user_id: String,
	iat: String,
	role: u8,
	username: String,
	exp: String,
}

#[derive(Serialize)]
pub struct jwt_refresh_token_body {
    #[serde(rename = "userId")]
	user_id: String,
	exp: String,
}
