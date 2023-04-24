use rand::Rng;
use std::{iter};
use rocket::{get, http::Status, serde::json::Json};
//use serde_json::{Value};
#[path = "../../types/response.rs"] mod response;
#[path = "../../types/mrna.rs"] mod mrna;

fn generate(CHARSET: &[u8], len: i16) -> String {
    let mut rng = rand::thread_rng();
    let one_char = || CHARSET[rng.gen_range(0..CHARSET.len())] as char;
    iter::repeat_with(one_char).take(len as usize).collect()
}

#[get("/projects/randombio?<typeTemp>&<length>")]
pub async fn randomBioRouteGet(typeTemp: i8, length: i16) -> Result<Json<response::GenericResponse>, Status> {

    let data = match typeTemp {
        1 => {
            let file_contents = std::fs::read_to_string("../data/dna.json").expect("File should have been opened");                                                                                                                           
            let parsed_file: Vec<mrna::NucleotideList> = serde_json::from_str(&file_contents).unwrap();
            let charset: Vec<_> = parsed_file.iter().map(|item| item.symbol.clone()).collect();
            Ok(generate(charset.join("").as_bytes(), length))
        },
        2 => {
            let file_contents = std::fs::read_to_string("../data/rna.json").expect("File should have been opened");                                                                                                                           
            let parsed_file: Vec<mrna::NucleotideList> = serde_json::from_str(&file_contents).unwrap();
            let charset: Vec<_> = parsed_file.iter().map(|item| item.symbol.clone()).collect();
            Ok(generate(charset.join("").as_bytes(), length))
        },
        3 => {
            let file_contents = std::fs::read_to_string("../data/aminoAcids.json").expect("File should have been opened");                                                                                                                           
            let parsed_file: Vec<mrna::AminoAcid> = serde_json::from_str(&file_contents).unwrap();
            let charset: Vec<_> = parsed_file.iter().map(|item| item.symbol.clone()).collect();
            Ok(generate(charset.join("").as_bytes(), length))
        },
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

