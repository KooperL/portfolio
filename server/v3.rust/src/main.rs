#[macro_use]
extern crate rocket;
use sqlx::{migrate::MigrateDatabase, Row, Sqlite, SqlitePool};
#[path = "routes/projects/secondary.rs"] mod secondary;
#[path = "routes/projects/seqalign.rs"] mod seqalign;
#[path = "routes/projects/randombio.rs"] mod randombio;
#[path = "routes/projects/mrna.rs"] mod mrna;
#[path = "routes/projects/index.rs"] mod projectsIndex;
#[path = "routes/projects/fuelprices.rs"] mod fuelprices;
#[path = "routes/forum/index.rs"] mod forumIndex;
#[path = "routes/index/index.rs"] mod index;
#[path = "routes/index/contact.rs"] mod contact;
#[path = "routes/index/about.rs"] mod about;
#[path = "utils/dotenv.rs"] mod dotenv;

#[launch]
async fn rocket() -> _ {
    match dotenv::load_env(".env") {
        Ok(_) => println!("Environment variables loaded successfully!"),
        Err(e) => eprintln!("Error: {}", e),
    };

    const DB_URL: &str = "sqlite://server/data/database.db";
    if !Sqlite::database_exists(DB_URL).await.unwrap_or(false) {
        println!("Creating database {}", DB_URL);
        match Sqlite::create_database(DB_URL).await {
            Ok(_) => println!("Create db success"),
            Err(error) => panic!("error: {}", error),
        }
    } else {
        println!("Database already exists");
    }

    rocket::build().mount("/", routes![
        secondary::secondaryRouteGet, seqalign::seqAlignRouteGet, randombio::randomBioRouteGet, mrna::mrnaRouteGet, projectsIndex::projectIndexRouteGet, fuelprices::fuelpricesRouteGet,
        index::indexRouteGet, contact::contactRouteGet, about::aboutRouteGet,
        forumIndex::forumIndexRouteGet
    ])
}
