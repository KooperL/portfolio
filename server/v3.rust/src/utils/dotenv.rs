use std::env;
use std::path::PathBuf;
extern crate dotenvy;

pub fn load_env(path: &str) -> Result<(), String> {
    let env_path = PathBuf::from(path);

    match dotenvy::from_path(&env_path) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Error loading environment variables: {}", e)),
    }
}

