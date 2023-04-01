#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;


// todo: Refactor entire app to not use this reserved keyword
#[get("/projects/randombio?<`type`>")]
fn example_handler(`type`: &RawStr) -> String {
    format!("Received query parameter 'type': {}", `type`.as_str())
}

fn main() {
    rocket::ignite().mount("/", routes![index]).launch();
}
