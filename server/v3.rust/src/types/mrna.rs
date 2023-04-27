use serde::{Serialize, Deserialize};
use std::ops::Index;

use std::{error::Error, fs::File, io::BufReader};

pub struct mrna_file_container {
    pub dna: Option<Vec<NucleotideList>>,
    pub rna: Option<Vec<RNA_mapping>>,
    pub amino_acids: Option<Vec<AminoAcid>>,
}

pub fn open_and_parse(i: i32) -> mrna_file_container {
    match i {
        1 => {
    let file = File::open("server/data/dna.json").ok().unwrap();
    let reader = BufReader::new(file);
    let nucleotides: Vec<NucleotideList> = serde_json::from_reader(reader).ok().unwrap();
            mrna_file_container {
                dna: Some(nucleotides),
                rna: None,
                amino_acids: None
            }
        },
        2 => {
            let file_contents = std::fs::read_to_string("server/data/rna.json").expect("File should have been opened");
            let rna_parsed_file: Vec<RNA_mapping> = serde_json::from_str(&file_contents).unwrap();
            mrna_file_container {
                rna: Some(rna_parsed_file),
                dna: None,
                amino_acids: None,
            }
        },
        3 => {
            let file_contents = std::fs::read_to_string("server/data/aminoAcids.json").expect("File should have been opened");
            let aa_parsed_file: Vec<AminoAcid> = serde_json::from_str(&file_contents).unwrap();
            mrna_file_container {
                amino_acids: Some(aa_parsed_file),
                dna: None,
                rna: None,
            }
        },
        _ => mrna_file_container {
                dna: None,
                rna: None,
                amino_acids: None,
        },
    }
}
#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NucleotideList {
    pub name: String,
    pub symbol: String,
    #[serde(rename = "molecular_mass")]
    pub molecular_mass: MolecularMass,
    pub density: Density,
    #[serde(rename = "melting_point")]
    pub melting_point: MeltingPoint,
    pub boiling_point: Option<BoilingPoint>,
    #[serde(rename = "complimentary_nucleotide")]
    pub complimentary_nucleotide: ComplimentaryNucleotide,
    pub solubility: Option<Solubility>,
    pub ph: f64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MolecularMass {
    pub value: f64,
    pub unit: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Density {
    pub value: f64,
    pub unit: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MeltingPoint {
    pub from: f64,
    pub to: Option<f64>,
    pub unit: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BoilingPoint {
    pub from: f64,
    pub unit: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ComplimentaryNucleotide {
    pub reference: String,
    pub value: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Solubility {
    pub value: f64,
    pub unit: String,
}



#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RNA_mapping {
    pub name: String,
    pub symbol: String,
    #[serde(rename = "complimentary_nucleotide")]
    pub complimentary_nucleotide: ComplimentaryNucleotide,
    #[serde(rename = "dna_map")]
    pub dna_map: DnaMap,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DnaMap {
    pub reference: String,
    pub value: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AminoAcid {
    pub name: String,
    #[serde(rename = "three_letter_symbol")]
    pub three_letter_symbol: String,
    pub symbol: String,
    #[serde(rename = "side_chain")]
    pub side_chain: Option<SideChain>,
    pub nucleotides: Vec<String>,
    #[serde(rename = "hydropathy_index")]
    pub hydropathy_index: Option<f64>,
    #[serde(rename = "molecular_weight")]
    pub molecular_weight: Option<f64>,
    pub propensities: Option<Propensities>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SideChain {
    pub class: String,
    pub polarity: String,
    #[serde(rename = "net_charge")]
    pub net_charge: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Propensities {
    #[serde(rename = "alpha_helix")]
    pub alpha_helix: f64,
    #[serde(rename = "beta_strand")]
    pub beta_strand: f64,
    pub turn: f64,
}

impl Index<&str> for Propensities {
    type Output = f64;
    fn index(&self, key: &str) -> &Self::Output {
        match key {
            "alpha_helix" => &self.alpha_helix,
            "beta_strand" => &self.beta_strand,
            "turn" => &self.turn,
            _ => panic!("Invalid key: {}", key),
        }
    }
}
