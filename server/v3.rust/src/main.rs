#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;
use rand::Rng;
use std::iter;
use rocket::{get, http::Status, serde::json::Json};
use serde::Serialize;


#[derive(Serialize)]
pub struct GenericResponse {
    pub success: bool,
    pub data: Option<String>,
    pub errorMessage: Option<String>,
}

const DNA_CHARSET: &[u8] = b"ATGC";
const RNA_CHARSET: &[u8] = b"AUGC";
fn generate(CHARSET: &[u8], len: i16) -> String {
    let mut rng = rand::thread_rng();
    let one_char = || CHARSET[rng.gen_range(0..CHARSET.len())] as char;
    iter::repeat_with(one_char).take(len as usize).collect()
}

#[get("/projects/randombio?<typeTemp>&<length>")]
pub async fn health_checker_handler(typeTemp: i8, length: i16) -> Result<Json<GenericResponse>, Status> {
    let data = match typeTemp {
        1 => Ok(generate(DNA_CHARSET, length)),
        2 => Ok(generate(RNA_CHARSET, length)),
        3 => Ok(generate(DNA_CHARSET, length)),
        _ => Err("Invalid type".to_string()),
    };

    match data {
        Ok(output) => Ok(Json(GenericResponse {
        success: true,
        data: Some(output),
            errorMessage: None,
    })),
        Err(err) => Ok(Json(GenericResponse {
            success: false,
            data: None,
            errorMessage: Some(err)
        }))
    }
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![health_checker_handler,])
}
