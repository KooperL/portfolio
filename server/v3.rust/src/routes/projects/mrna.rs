use rocket::{get, http::Status, serde::json::Json};
use serde::{Serialize, Deserialize};
use std::fs;
//use std::{str,fs};
#[path = "../../types/mrna.rs"] mod mrna;
#[path = "../../types/response.rs"] mod response;
use std::collections::HashMap;

#[derive(Serialize, Deserialize)]
struct Count {
    g: i32,
    c: i32,
    a: i32,
    t: i32,
}

#[derive(Serialize, Deserialize)]
pub struct Response {
        aa: Vec<String>,
        aa_s: Vec<String>, 
        dna_field: String,
        gccontent: f64,
        molweight: f64,
        mrna_field: String,
        rdna_field: String,
        simplecount: Count, 
        tm: f64,  
}

struct Amino_acid_symbol_map {
    tla: String,
    symbol: String,
}


#[get("/projects/mrna?<dna_field_id>")]                                                                            
pub async fn mrnaRouteGet(dna_field_id: String) -> Result<Json<response::GenericResponse<Response>>, Status> {
    let dna = str::replace(&dna_field_id, "\r", "");
    let mut reversed: Vec<String> = vec!["_".to_string(); dna.len()];
    let mut rna: Vec<String> = vec![String::from("_"); dna.len()];

    let dna_parsed_file = mrna::open_and_parse(1).dna.unwrap();
    let mut dna_molweight_map: HashMap<String, f64> = HashMap::new(); 
    for item in dna_parsed_file {
        // dna_map.insert(item.symbol, item.complimentary_nucleotide.value);
        dna_molweight_map.insert(item.symbol, item.molecular_mass.value);
    }

    let amino_acid_parsed_file = mrna::open_and_parse(3).amino_acids.unwrap();
    let mut amino_acid_map: HashMap<String, Amino_acid_symbol_map> = HashMap::new(); 
    for item in amino_acid_parsed_file {
        for nucleotide in item.nucleotides {
        amino_acid_map.insert(nucleotide, Amino_acid_symbol_map {
            symbol: item.symbol.clone(),
            tla: item.three_letter_symbol.clone(),
        });
        }
    }

    let mut molweight = 0.0;
    let dna_arr = dna.chars();
    let mut count = Count {
        g: 0,
        c: 0,
        a: 0,
        t: 0,
    };
    let mut amino_acid_symbols: Vec<String> = Vec::new();
    let mut amino_acid_symbols_long: Vec<String> = Vec::new();
    
    let mut tripletBuilder: Vec<String> = Vec::new();
    for (i, char) in dna_arr.enumerate() {
        reversed[i] = dna.chars().nth(dna.len()-1-i).unwrap().to_string();
        match char {
            'a' => {
                // c_dna[i] = dna_map.get(&char.to_string()).unwrap().clone();
                //rna[i] = rna_map.get(&char.to_string()).unwrap().clone();
                rna[i] = "u".to_owned();
                molweight += dna_molweight_map.get(&char.to_string()).unwrap();
                count.a += 1;
            },

            't' => {
               rna[i] = "a".to_owned();
               molweight += dna_molweight_map.get(&char.to_string()).unwrap();
               count.t += 1;
            },

            'g' => {
               rna[i] = "c".to_owned();
               molweight += dna_molweight_map.get(&char.to_string()).unwrap();
               count.g += 1;
            },

            'c' => {
               rna[i] = "g".to_owned();
               molweight += dna_molweight_map.get(&char.to_string()).unwrap();
               count.c += 1;
            },
                _ => panic!("Unacceped character found"),
        };
        if i % 3 == 0 && i > 0 {
            let triplet: String = tripletBuilder.join("");
            let symbol = amino_acid_map.get(&triplet.clone()).unwrap();
            amino_acid_symbols.push(symbol.symbol.clone());
            amino_acid_symbols_long.push(symbol.tla.clone());
            tripletBuilder = vec![rna[i].to_string()];
        } else {
            tripletBuilder.push(rna[i].to_string());
        }
    }

    let mut tm = 0.0;
    if dna.len() == 0 {
        panic!("Too short");
    } else if dna.len() < 13 {
        tm = 4.0 * (count.g as f64 + count.c as f64) + 4.0 * (count.a as f64 + count.t as f64);
    } else {
        tm = 64.9 + (41.0 * (count.g as f64 + count.c as f64 - 16.4)) / dna.len() as f64;
    }
    let gccontent = (count.g + count.c) as f64 / dna.len() as f64;

    Ok(Json(response::GenericResponse {
        success: true,
        data: Some(Response {
            molweight,
            dna_field: format!("5' - %s - 3'", dna),
            rdna_field: format!("5' - %s - 3'", reversed.join("")),
            mrna_field: format!("3' - %s - 5'", rna.join("")),
            aa: amino_acid_symbols,
            aa_s: amino_acid_symbols_long,
            tm,
            gccontent,
            simplecount: count

        }),
        errorMessage: None,
    }))
}
