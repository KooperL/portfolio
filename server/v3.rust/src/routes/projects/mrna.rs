use rocket::{get, http::Status, serde::json::Json};
use std::fs;
//use std::{str,fs};
#[path = "../../types/mrna.rs"] mod mrna;
#[path = "../../types/response.rs"] mod response;

struct Count {
    g: i32,
    c: i32,
    a: i32,
    t: i32,
}

fn simple_count(dna: String) -> Count {
    let mut count = Count {
        g: 0,
        c: 0,
        a: 0,
        t: 0,
    };
    for i in dna.chars() {
        match i {
            'g' => count.g += 1,
            'c' => count.c += 1,
            'a' => count.a += 1,
            't' => count.t += 1,
            _ => panic!("Unaccepted character found."),
        };
    }
    return count;
}

struct mrna_lookups {
    dna_compliment: String,
    rna_compliment: String,
}

fn reverse_compliment(dna: String) -> String {
    let mut reversed: Vec<String> = vec![String::from("_"); dna.len()];

    let dna_file_contents = std::fs::read_to_string("../data/dna.json").expect("File should have been opened");
    let dna_parsed_file: Vec<mrna::NucleotideList> = serde_json::from_str(&dna_file_contents).unwrap();
    String::from("asf")
}

#[get("/projects/mrna?<dna_field_id>")]                                                                            
pub async fn mrnaRouteGet(dna_field_id: String) -> Result<Json<response::GenericResponse>, Status> {
    // let dna = str.replace(dna_field_id, "\r", "");

    Ok(Json(response::GenericResponse {
        success: true,
        data: Some(String::from("test")),
        errorMessage: None,
    }))
}
