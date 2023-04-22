use rand::Rng;
use std::{iter};
use rocket::{get, http::Status, serde::json::Json};
//use serde_json::{Value};
#[path = "../../types/response.rs"] mod response;

// TODO: Move to ../data.json
const DNA_CHARSET: &[u8] = b"ATGC";
const RNA_CHARSET: &[u8] = b"AUGC";
fn generate(CHARSET: &[u8], len: i16) -> String {
    let mut rng = rand::thread_rng();
    let one_char = || CHARSET[rng.gen_range(0..CHARSET.len())] as char;
    iter::repeat_with(one_char).take(len as usize).collect()
}

#[get("/projects/randombio?<typeTemp>&<length>")]
pub async fn randomBioRouteGet(typeTemp: i8, length: i16) -> Result<Json<response::GenericResponse>, Status> {
    let data = match typeTemp {
        1 => Ok(generate(DNA_CHARSET, length)),
        2 => Ok(generate(RNA_CHARSET, length)),
        3 => Ok(generate(DNA_CHARSET, length)),
        _ => Err("Invalid type".to_string()),
    };

    match data {
        Ok(output) => Ok(Json(response::GenericResponse {
        success: true,
        data: Some(output),
            errorMessage: None,
    })),
        Err(err) => Ok(Json(response::GenericResponse {
            success: false,
            data: None,
            errorMessage: Some(err)
        }))
    }
}

