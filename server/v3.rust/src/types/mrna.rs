use serde::{Serialize, Deserialize};
use std::ops::Index;

#[derive(Serialize, Deserialize)]
pub struct ToFromValue {
    from: f32,
    to: f32,
    unit: String,
}

#[derive(Serialize, Deserialize)]
pub struct ValueUnit {
    value: f32,
    unit: String,
}

#[derive(Serialize, Deserialize)]
pub struct RefValue {
    reference: String,
    value: String,
}

#[derive(Serialize, Deserialize)]
pub struct NucleotideList {
    pub name: String,
    pub symbol: String,
    pub molecular_mass: ValueUnit,
    pub density: ValueUnit,
    pub melting_point: ToFromValue, 
    pub complimentary_nucleotide: RefValue,
    pub solubility: ValueUnit,
    pub ph: f32,
}

#[derive(Serialize, Deserialize)]
pub struct Propensities {
    alpha_helix: f32,
    beta_strand: f32,
    turn: f32,
}

impl Index<&str> for Propensities {
    type Output = f32;

    fn index(&self, key: &str) -> &Self::Output {
        match key {
            "alpha_helix" => &self.alpha_helix,
            "beta_strand" => &self.beta_strand,
            "turn" => &self.turn,
            _ => panic!("Invalid key: {}", key),
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct SideChain {
    class: String,
    polarity: String,
    net_charge: String,
}

#[derive(Serialize, Deserialize)]
pub struct AminoAcid {
    pub name: String,
    pub three_letter_symbol: String,
    pub symbol: String,
    pub side_chain: SideChain,
    pub nucleotides: Vec<String>,
    pub hydropathy_index: f32,
    pub molecular_weight: f32,
    pub propensities: Propensities,
}

