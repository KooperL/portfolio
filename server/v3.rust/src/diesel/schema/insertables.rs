#[derive(Insertable)]
#[table_name = "posts"]
pub struct NewPost<'a> {
    pub date: &'a str,
    pub session_id: &'a str,
    pub message: &'a str,
}
