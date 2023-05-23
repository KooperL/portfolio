use serde::{Serialize, Deserialize};
use std::fmt::Display;
use chrono::{Local, Duration};
use rocket::{get, post, http::Status, serde::json::Json, request, futures::TryStreamExt};
use std::{fs, io::Read};
use sqlx::{migrate::MigrateDatabase, Row, Sqlite, SqlitePool};
use rand::Rng;
use base64::{Engine as _, engine::general_purpose};
use ring::{digest, pbkdf2, hmac};
// use std::sync::{Arc, Mutex};
use std::sync::{Mutex};
// use tokio::sync::{Mutex};


// let token_header = r#""{"alg":"HS256","typ":"JWT"}"#;
#[derive(Deserialize, Serialize, Debug)]
pub struct jwt_header {
    pub alg: String,
    pub typ: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct jwt_access_token_body {
    #[serde(rename = "userId")]
	pub user_id: i64,
	pub iat: i64,
	pub role: i64,
	pub username: String,
    #[serde(rename = "exp")]
	pub expires: i64,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct jwt_refresh_token_body {
    #[serde(rename = "userId")]
	pub user_id: i64,
    #[serde(rename = "exp")]
	pub expires: i64,
}
