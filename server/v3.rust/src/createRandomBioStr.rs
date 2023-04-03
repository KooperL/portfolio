pub fn createRandomBioStr(responseType: i8, length: i16, format: String) -> String {
    format!("{responseType} {length} {format}")
}
