use rocket::{get, http::Status, serde::json::Json};
use std::fs;
//use std::{str,fs};
#[path = "../../types/mrna.rs"] mod mrna;
#[path = "../../types/response.rs"] mod response;
use std::collections::HashMap;

struct Count {
    g: i32,
    c: i32,
    a: i32,
    t: i32,
}

struct Response {
        aa: Vec<String>,
        aa_s: Vec<String>, 
        dna_field: String,
        gccontent: f32,
        molweight: f32,
        mrna_field: String,
        rdna_field: String,
        simplecount: Count, 
        tm: f32,  
}

struct Amino_acid {
    tla: String,
    symbol: String,
}


#[get("/projects/mrna?<dna_field_id>")]                                                                            
pub async fn mrnaRouteGet(dna_field_id: String) -> Result<Json<response::GenericResponse<String>>, Status> {
    let dna = str::replace(&dna_field_id, "\r", "");
    let mut reversed: Vec<char> = vec!['_'; dna.len()];
    // let mut c_dna: Vec<String> = vec![String::from("_"); dna.len()];
    let mut rna: Vec<String> = vec![String::from("_"); dna.len()];

    let dna_file_contents = std::fs::read_to_string("../data/dna.json").expect("File should have been opened");
    let dna_parsed_file: Vec<mrna::NucleotideList> = serde_json::from_str(&dna_file_contents).unwrap();

    // let mut dna_map: HashMap<String, String> = HashMap::new(); 
    let mut dna_molweight_map: HashMap<String, f32> = HashMap::new(); 
    for item in dna_parsed_file {
        // dna_map.insert(item.symbol, item.complimentary_nucleotide.value);
        dna_molweight_map.insert(item.symbol, item.molecular_mass.value);
    }


    // let rna_file_contents = std::fs::read_to_string("../data/rna.json").expect("File should have been opened");
    // let rna_parsed_file: Vec<mrna::NucleotideList> = serde_json::from_str(&rna_file_contents).unwrap();

    // let mut rna_map: HashMap<String, String> = HashMap::new(); 
    // for item in rna_parsed_file {
    //     rna_map.insert(item.symbol as String, item.complimentary_nucleotide.value);
    // }


    let amino_acid_file_contents = std::fs::read_to_string("../data/aminoAcids.json").expect("File should have been opened");
    let amino_acid_parsed_file: Vec<mrna::AminoAcid> = serde_json::from_str(&amino_acid_file_contents).unwrap();

    let mut amino_acid_map: HashMap<String, Amino_acid> = HashMap::new(); 
    for item in amino_acid_parsed_file {
        for nucleotide in item.nucleotides {
        amino_acid_map.insert(nucleotide, Amino_acid {
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
        if i % 3 == 0 {
            let triplet: String = tripletBuilder.join("");
            let symbol = amino_acid_map.get(triplet).unwrap();
            amino_acid_symbols.push("asdf".to_string());
            tripletBuilder = Vec::new();
        } else {
            tripletBuilder.push(char.to_string());
        }
        reversed[i] = dna.chars().nth(dna.len()-1-i).unwrap();
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
    }

    let mut tm = 0.0;
    if dna.len() == 0 {
        panic!("Too short");
    } else if dna.len() < 13 {
        tm = 4.0 * (count.g as f32 + count.c as f32) + 4.0 * (count.a as f32 + count.t as f32);
    } else {
        tm = 64.9 + (41.0 * (count.g as f32 + count.c as f32 - 16.4)) / dna.len() as f32;
    }
    let gccontent = (count.g + count.c) as usize / dna.len();

    Ok(Json(response::GenericResponse {
        success: true,
        data: Some(String::from("test")),
        errorMessage: None,
    }))
}
