use std::{vec};
use rocket::{get, http::Status, serde::json::Json};
use std::fs;
use std::collections::HashMap;
//use serde_json::{Value};
#[path = "../../types/response.rs"] mod response;
#[path = "../../types/mrna.rs"] mod mrna;

fn find_nucleation_region(arr: Vec<f32>, threshold: f32, sliding_window: usize, contiguous_window: usize, sError: usize) -> Vec<bool> {
    let mut returnArrLen = arr.len() - sliding_window - 1;
    let mut nucleation_regions = vec![false; returnArrLen];

    let mut validNucleationLength = 0;
    let mut start = 0;
    let mut end = sliding_window;

    while end <= arr.len() {
        let slice = &arr[start..sliding_window];
        let slice_sum: f32 = slice.iter().sum();
        let isValid: bool = slice_sum > (contiguous_window as f32 * threshold);

        if isValid {
            validNucleationLength+=1;
        } else {
            validNucleationLength-=1;
        };

		if validNucleationLength > contiguous_window {
			validNucleationLength -= 1;
			for i in start..end {
				nucleation_regions[i] = true;
			}
		} else {
			if validNucleationLength > sError {
				nucleation_regions[start] = true;
			} else {
				nucleation_regions[start] = false;
			}
		}
        start += 1;
        end += 1;
    }
    return nucleation_regions;
}

fn populate_propensities_from_symbol(
    symbol: &str,
    key: &str,
    memo: &mut HashMap<String, f32>,
    file: &Vec<mrna::AminoAcid>,
) -> Option<f32> {
    if let Some(value) = memo.get(symbol) {
        return Some(value.clone());
    }
    for amino_acid in file {
        if amino_acid.symbol == symbol {
            memo
                .insert(symbol.to_string(), amino_acid.propensities[key]);
            return Some(amino_acid.propensities[key]);
        }
    }
    None
}

#[get("/projects/secondary?<aas>&<aaformat>&<threshold>&<avg>")]
pub async fn secondaryRouteGet(aas: String, aaformat: String, threshold: i32, avg: i32) -> Result<Json<response::GenericResponse<String>>, Status> {
    let file_contents = std::fs::read_to_string("../data/aminoAcids.json").expect("File should have been opened");
    //let parsed_file = serde::Deserializer(file_contents);
    let parsed_file: Vec<mrna::AminoAcid> = serde_json::from_str(&file_contents).unwrap();

    let alpha_helix_threshold = 1.03;
    let alpha_helix_sliding_window = 6;
	let alpha_helix_contiguous_window = 4;
    let alpha_helix_error = 6;
    let	beta_sheet_threshold = 1.0;
	let beta_sheet_sliding_window = 5;
    let beta_sheet_contiguous_window = 3;
	let beta_sheet_error = 4;

    let mut alpha_helix_memo = HashMap::new();
    let mut beta_strand_memo = HashMap::new();

    let mut hPropensities: Vec<f32> = Vec::new();
    let mut ePropensities: Vec<f32> = Vec::new();
    for amino_acid in aas.chars() {
        let proph = populate_propensities_from_symbol(&amino_acid.to_string(), "alpha_helix", &mut alpha_helix_memo, &parsed_file).unwrap();
        hPropensities.push(proph);
        let prope = populate_propensities_from_symbol(&amino_acid.to_string(), "beta_strand", &mut beta_strand_memo, &parsed_file).unwrap();
        ePropensities.push(prope);
    };
    
    let hNucleationRegions = find_nucleation_region(hPropensities, alpha_helix_threshold, alpha_helix_sliding_window, alpha_helix_contiguous_window, alpha_helix_error);
    let eNucleationRegions = find_nucleation_region(ePropensities, beta_sheet_threshold, beta_sheet_sliding_window, beta_sheet_contiguous_window, beta_sheet_error);

    let mut result = Vec::new();
    let mut stalemate_slice = Vec::new();
    for ind in 0..aas.len() {
        if hNucleationRegions[ind] && !eNucleationRegions[ind] {
            result[ind] = "h";
            if stalemate_slice.len() > 0 {
                for i in stalemate_slice {
                    result[i] = "h";
                };
            };
            stalemate_slice = Vec::new();
        } else if !hNucleationRegions[ind] && eNucleationRegions[ind] {
            result[ind] = "e";
            if stalemate_slice.len() > 0 {
                for i in stalemate_slice {
                    result[i] = "e";
                };
            };
            stalemate_slice = Vec::new();
        } else if !hNucleationRegions[ind] && !eNucleationRegions[ind] {
            result[ind] = "c";
        } else {
            result[ind] = "_";
            stalemate_slice.push(ind);
        };
    };
        Ok(Json(response::GenericResponse {
        success: true,
        data: Some(result.join("")),
            errorMessage: None,
    }))
    
}
