#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;
mod createRandomBioStr;
use rocket::response::status;
use rand::Rng;
use std::iter;
use serde::Deserialize;
use rocket_contrib::json::Json;


#[derive(Deserialize)]
struct RandomBio {
  data: String,
}

// https://stackoverflow.com/questions/60860046/rockets-responder-trait-is-not-implemented-for-result

const DNA_CHARSET: &[u8] = b"ATGC";
const RNA_CHARSET: &[u8] = b"AUGC";
fn generate(CHARSET: &[u8], len: i16) -> RandomBio {
    let mut rng = rand::thread_rng();
    let one_char = || CHARSET[rng.gen_range(0..CHARSET.len())] as char;
    RandomBio {
    data: iter::repeat_with(one_char).take(len as usize).collect(),
    }
}

#[get("/projects/randombio?<typeTemp>&<length>")]
fn index(typeTemp: i8, length: i16) -> Result<Json<RandomBio>, status::BadRequest<String>> {
    let response = match typeTemp {
        1 => Ok(generate(DNA_CHARSET, length)),
        2 => Ok(generate(RNA_CHARSET, length)),
        3 => Ok(generate(DNA_CHARSET, length)),
        _ => Err(status::BadRequest(Some(String::from("Invalid type.")))),
    };
    match response {
        Ok(output) => Ok(Json(output)),
        Err(err) => Err(err),
    }
}

fn main() {
    rocket::ignite().mount("/", routes![index]).launch();
}

