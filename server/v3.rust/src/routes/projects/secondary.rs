use std::{vec};
use rocket::{get, http::Status, serde::json::Json};
use std::fs;
use std::collections::HashMap;
#[path = "../../types/response.rs"] mod response;
#[path = "../../types/mrna.rs"] mod mrna;

fn find_nucleation_region(arr: Vec<f64>, threshold: f64, sliding_window: usize, contiguous_window: usize, sError: i32) -> Vec<bool> {
    let mut returnArrLen = arr.len() - 1;
    let mut nucleation_regions = vec![false; returnArrLen];

    let mut validNucleationLength: i32 = 0;
    let mut start = 0;
    let mut end = sliding_window;

    while end < arr.len() - 1 {
        println!("{}", arr.len());
        println!("{}, {}", start, end);
        let slice = &arr[start..end];
        let slice_sum: f64 = slice.iter().sum();
        let isValid: bool = slice_sum > (contiguous_window as f64 * threshold);

        if isValid {
            validNucleationLength+=1;
        } else {
            validNucleationLength-=1;
        };

		if validNucleationLength > contiguous_window as i32 {
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
    memo: &mut HashMap<String, f64>,
    file: &Vec<mrna::AminoAcid>,
) -> Option<f64> {
    if let Some(value) = memo.get(symbol) {
        return Some(value.clone());
    }
    for amino_acid in file {
        println!("{}, {}", amino_acid.symbol, symbol);
        if amino_acid.symbol == symbol {
            memo
                .insert(symbol.to_string(), amino_acid.propensities.clone().unwrap()[key]);
            return Some(amino_acid.propensities.clone().unwrap().clone()[key]);
        }
    }
    None
}

#[get("/projects/secondary?<aas>&<aaformat>&<threshold>&<avg>")]
pub async fn secondaryRouteGet(aas: String, aaformat: String, threshold: i32, avg: i32) -> Result<Json<response::GenericResponse<String>>, Status> {
    let parsed_file = mrna::open_and_parse(3).amino_acids.unwrap();
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

    let mut hPropensities: Vec<f64> = Vec::new();
    let mut ePropensities: Vec<f64> = Vec::new();
    for amino_acid in aas.chars() {
        let proph = populate_propensities_from_symbol(&amino_acid.to_lowercase().to_string(), "alpha_helix", &mut alpha_helix_memo, &parsed_file);
        match proph {
            Some(e) => hPropensities.push(e),
            None => break,
        };
        
        let prope = populate_propensities_from_symbol(&amino_acid.to_lowercase().to_string(), "beta_strand", &mut beta_strand_memo, &parsed_file);
        match prope {
            Some(e) => ePropensities.push(e),
            None => break,
        };
    };
    
    let hNucleationRegions = find_nucleation_region(hPropensities, alpha_helix_threshold, alpha_helix_sliding_window, alpha_helix_contiguous_window, alpha_helix_error);
    let eNucleationRegions = find_nucleation_region(ePropensities, beta_sheet_threshold, beta_sheet_sliding_window, beta_sheet_contiguous_window, beta_sheet_error);

    let mut result = vec!["_"; aas.len()-1];
    let mut stalemate_slice = Vec::new();
    for ind in 0..aas.len()-1 {
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
