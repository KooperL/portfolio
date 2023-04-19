#[macro_use]
extern crate rocket;
use rand::Rng;
use std::{iter, vec};
use rocket::{get, http::Status, serde::json::Json};
use serde::{Serialize, Deserialize};
use std::fs;
use std::collections::HashMap;
//use serde_json::{Value};


#[derive(Serialize, Deserialize)]
struct ToFromValue {
    from: f32,
    to: f32,
    unit: String,
}

#[derive(Serialize, Deserialize)]
struct ValueUnit {
    value: f32,
    unit: String,
}

#[derive(Serialize, Deserialize)]
struct RefValue {
    reference: String,
    value: String,
}

#[derive(Serialize, Deserialize)]
struct NucleotideList {
    name: String,
    symbol: String,
    molecular_mass: ValueUnit,
    density: ValueUnit,
    melting_point: ToFromValue, 
    complimentary_nucleotide: RefValue,
    solubility: ValueUnit,
    ph: f32,
}

#[derive(Serialize)]
pub struct GenericResponse {
    pub success: bool,
    pub data: Option<String>,
    pub errorMessage: Option<String>,
}

#[derive(Serialize, Deserialize)]
struct Propensities {
    alpha_helix: f32,
    beta_strand: f32,
    turn: f32,
}

#[derive(Serialize, Deserialize)]
struct SideChain {
    class: String,
    polarity: String,
    net_charge: String,
}

#[derive(Serialize, Deserialize)]
struct AminoAcid {
    name: String,
    three_letter_symbol: String,
    symbol: String,
    side_chain: side_chain,
    nucleotides: Vec<String>,
    hydropathy_index: f32,
    molecular_weight: f32,
    propensities: propensities,
}

fn find_nucleation_region(arr: Vec<f32>, threshold: f32, sliding_window: usize, contiguous_window: f32) -> Vec<f32> {
    let mut nucleation_regions:Vec<f32> = Vec::new();
    let mut start = 0;
    let mut end = sliding_window;
    while end <= arr.len() {
        let slice = &arr[start..sliding_window];
        let slice_sum = slice.iter().sum();
        nucleation_regions.push(slice_sum);
        start += 1;
        end += 1;
    }
    return nucleation_regions;
}

fn populate_propensities_from_symbol<'a>(
    symbol: &str,
    key: &str,
    memo: &'a HashMap<String, HashMap<String, f32>>,
    file: &[AminoAcid],
) -> Option<&'a f32> {
    let inner_map = memo.get(key)?;
    if let Some(value) = inner_map.get(symbol) {
        return Some(value);
    }
    for amino_acid in file {
        if amino_acid.symbol == symbol {
            memo
                .entry(key.to_string())
                .or_insert(HashMap::new())
                .insert(symbol.to_string(), amino_acid.propensities[key]);
            return Some(&amino_acid.propensities[key]);
        }
    }
    None
}

#[get("/projects/secondary?<aas>&<aaformat>&<threshold>&<avg>")]
pub async fn secondary(aas: String, aaformat: String, threshold: i8, avg: i8) -> Result<Json<GenericResponse>, Status> {
    let file_contents = fs::read_to_string("../data/aminoAcids.json").expect("File should have been opened");
    //let parsed_file = serde::Deserializer(file_contents);
    let parsed_file: Vec<AminoAcid> = serde_json::from_str(&file_contents).unwrap();

    let alpha_helix_threshold = 1.03;
    let alpha_helix_sliding_window = 6;
	let alpha_helix_contiguous_window = 4.0;
    let alpha_helix_error = 6.0;
    let	beta_sheet_threshold = 1.0;
	let beta_sheet_sliding_window = 5;
    let beta_sheet_contiguous_window = 3.0;
	let beta_sheet_error = 4.0;

    let mut memo = HashMap::new();
    let mut alpha_helix_map = HashMap::new();
    let mut beta_strand_map = HashMap::new();
    memo.insert("alpha_helix", alpha_helix_map); 
    memo.insert("beta_strand", beta_strand_map);

    let hPropensities: Vec<&f32> = Vec::new();
    for amino_acid in aas.chars() {
        let prop = populate_propensities_from_symbol(amino_acid, "alpha_helix", &memo, &parsed_file).unwrap();
        hPropensities.push(prop);
    };
    
}


fn match_score_simple(s1: Vec<&str>, s2: Vec<&str>, identical: f32, mismatch: f32, extgaps: f32, gaps: f32) -> f32 {
    let mut score: f32 = 0.0;
    let mut penalty_count = 0;
    for i in 0..s1.len() {
        if s1[i] == s2[i] {
        score += identical;
        penalty_count = 0;
        } else {
            score -= mismatch;
            if penalty_count == 0 {
                score -= gaps;
            } else {
                score -= extgaps;
            }
        }
    }
    score
}

fn draw_comparison<'a>(s1: Vec<&'a str>, s2: Vec<&'a str>) -> Vec<&'a str> {
    let match_char = "|";
    let mismatch_char = " ";
    let mut res_formatted:Vec<&str> = Vec::new();
    for i in &s1 {
        res_formatted.push(i);
    }
    res_formatted.push("\n");
    for (ind, elem) in s1.iter().enumerate() {
        if *elem == s2[ind] {
        res_formatted.push(match_char);
        } else {
        res_formatted.push(mismatch_char);
        }
    }
    res_formatted.push("\n");
    for i in s2 {
        res_formatted.push(i);
    }
   res_formatted 
}


#[get("/projects/seqalign?<sampletxt>&<referencetxt>&<identical>&<mismatch>&<extgaps>&<gaps>")]
pub async fn seqAlign(sampletxt: String, referencetxt: String, identical: f32, mismatch: f32, extgaps: f32, gaps: f32) -> Result<Json<GenericResponse>, Status> {
    let s1Arr: Vec<&str> = sampletxt.split(char::is_alphabetic).collect();
    let s2Arr: Vec<&str> = referencetxt.split(char::is_alphabetic).collect();
    if s1Arr.len() == s2Arr.len() {
        let matches = match_score_simple(s1Arr.clone(), s2Arr.clone(), identical, mismatch, extgaps, gaps); 
        let draw = draw_comparison(s1Arr.clone(), s2Arr.clone());
Ok(Json(GenericResponse {
        success: true,
        data: Some(draw.join("")),
            errorMessage: None,
    }))
    } else {
        let mut arrs: Vec<Vec<_>> = {
            if s1Arr.len() > s2Arr.len() {
                vec![s2Arr, s1Arr]
            } else {
                vec![s1Arr, s2Arr]
            }
        };
        while arrs[0].len() < arrs[1].len() {
            let mut rng = rand::thread_rng();
            let rand_ind = rng.gen_range(0..arrs[0].len());
            arrs[0] = [&arrs[0][0..rand_ind], &["-"], &arrs[0][rand_ind..]].concat();
        };
        let matches = match_score_simple(arrs[0].clone(), arrs[1].clone(), identical, mismatch, extgaps, gaps); 
        let draw = draw_comparison(arrs[0].clone(), arrs[1].clone());
        Ok(Json(GenericResponse {
        success: true,
        data: Some(draw.join("")),
            errorMessage: None,
    }))
    }
}

// TODO: Move to ../data.json
const DNA_CHARSET: &[u8] = b"ATGC";
const RNA_CHARSET: &[u8] = b"AUGC";
fn generate(CHARSET: &[u8], len: i16) -> String {
    let mut rng = rand::thread_rng();
    let one_char = || CHARSET[rng.gen_range(0..CHARSET.len())] as char;
    iter::repeat_with(one_char).take(len as usize).collect()
}

#[get("/projects/randombio?<typeTemp>&<length>")]
pub async fn randomBio(typeTemp: i8, length: i16) -> Result<Json<GenericResponse>, Status> {
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
    rocket::build().mount("/", routes![randomBio, seqAlign])
}
