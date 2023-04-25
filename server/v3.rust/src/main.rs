#[macro_use]
extern crate rocket;
<<<<<<< HEAD
use rand::Rng;
use std::{iter, vec};
use rocket::{get, http::Status, serde::json::Json};
use serde::Serialize;


#[derive(Serialize)]
pub struct GenericResponse {
    pub success: bool,
    pub data: Option<String>,
    pub errorMessage: Option<String>,
}

struct SeqAlignRes {
    draw_res: String,
    result: i32,
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
        for _ in 0..3 {
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
}


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
=======
#[path = "routes/projects/secondary.rs"] mod secondary;
#[path = "routes/projects/seqalign.rs"] mod seqalign;
#[path = "routes/projects/randombio.rs"] mod randombio;
#[path = "routes/projects/mrna.rs"] mod mrna;
>>>>>>> 2dd06fd0928cd7f03585629fb02a3f5124e71658

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![secondary::secondaryRouteGet, seqalign::seqAlignRouteGet, randombio::randomBioRouteGet, mrna::mrnaRouteGet])
}
