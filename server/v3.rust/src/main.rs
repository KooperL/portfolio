#[macro_use]
extern crate rocket;
#[path = "routes/projects/secondary.rs"] mod secondary;
#[path = "routes/projects/seqalign.rs"] mod seqalign;
#[path = "routes/projects/randombio.rs"] mod randombio;
#[path = "routes/projects/mrna.rs"] mod mrna;
#[path = "routes/projects/index.rs"] mod projectsIndex;
#[path = "routes/forum/index.rs"] mod forumIndex;
#[path = "routes/index/index.rs"] mod index;
#[path = "routes/index/contact.rs"] mod contact;
#[path = "routes/index/about.rs"] mod about;
#[path = "utils/dotenv.rs"] mod dotenv;

use std::fs::File;

#[launch]
fn rocket() -> _ {
    match dotenv::load_env(".env") {
        Ok(_) => println!("Environment variables loaded successfully!"),
        Err(e) => eprintln!("Error: {}", e),
    };
    rocket::build().mount("/", routes![
        secondary::secondaryRouteGet, seqalign::seqAlignRouteGet, randombio::randomBioRouteGet, mrna::mrnaRouteGet, projectsIndex::projectIndexRouteGet,
        index::indexRouteGet, contact::contactRouteGet, about::aboutRouteGet,
        forumIndex::forumIndexRouteGet
    ])
}
