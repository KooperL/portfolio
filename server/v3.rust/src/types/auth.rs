use serde::{Serialize, Deserialize};
use std::fmt::Display;

#[derive(Deserialize, Serialize, Debug)]
pub struct jwt_access_token_body {
    #[serde(rename = "userId")]
	user_id: i64,
	iat: i64,
	role: i64,
	username: String,
	exp: i64,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct jwt_refresh_token_body {
    #[serde(rename = "userId")]
	user_id: i64,
	exp: i64,
}
