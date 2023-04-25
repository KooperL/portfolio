use rand::Rng;
use std::{vec};
use rocket::{get, http::Status, serde::json::Json};
//use serde_json::{Value};
#[path = "../../types/response.rs"] mod response;


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
pub async fn seqAlignRouteGet(sampletxt: String, referencetxt: String, identical: f32, mismatch: f32, extgaps: f32, gaps: f32) -> Result<Json<response::GenericResponse<String>>, Status> {
    let s1Arr: Vec<&str> = sampletxt.split(char::is_alphabetic).collect();
    let s2Arr: Vec<&str> = referencetxt.split(char::is_alphabetic).collect();
    if s1Arr.len() == s2Arr.len() {
        let matches = match_score_simple(s1Arr.clone(), s2Arr.clone(), identical, mismatch, extgaps, gaps); 
        let draw = draw_comparison(s1Arr.clone(), s2Arr.clone());
Ok(Json(response::GenericResponse {
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
        Ok(Json(response::GenericResponse {
        success: true,
        data: Some(draw.join("")),
            errorMessage: None,
    }))
    }
}
