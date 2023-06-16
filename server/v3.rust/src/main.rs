#[macro_use]
extern crate rocket;
use sqlx::{migrate::MigrateDatabase, Row, Sqlite, SqlitePool};
#[path = "utils/dotenv.rs"] mod dotenv;

#[path = "routes/projects/secondary.rs"] mod secondary;
#[path = "routes/projects/seqalign.rs"] mod seqalign;
#[path = "routes/projects/randombio.rs"] mod randombio;
#[path = "routes/projects/mrna.rs"] mod mrna;
#[path = "routes/projects/fuelprices.rs"] mod fuelprices;

#[path = "routes/forum/index.rs"] mod forumIndex;
#[path = "routes/forum/register.rs"] mod forumRegister;
#[path = "routes/forum/login.rs"] mod forumLogin;
#[path = "routes/forum/logout.rs"] mod forumLogout;

#[path = "routes/index/contact.rs"] mod contact;
#[path = "routes/index/capture.rs"] mod capture;
#[path = "routes/index/monitor.rs"] mod monitor;

#[path = "routes/cms/aboutPage.rs"] mod aboutCms;
#[path = "routes/cms/contactPage.rs"] mod contactCms;
#[path = "routes/cms/homePage.rs"] mod indexCms;
#[path = "routes/cms/projectsPage.rs"] mod projectsCms;

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
        secondary::secondaryRouteGet, seqalign::seqAlignRouteGet, randombio::randomBioRouteGet, mrna::mrnaRouteGet, fuelprices::fuelpricesRouteGet,
        contact::contactRoutePost, monitor::monitorRoutePost, capture::captureRoutePost,
        forumIndex::forumIndexRouteGet, forumRegister::registerRoutePost, forumLogin::loginRoutePost, forumLogout::logoutRoutePost,
        aboutCms::aboutCmsRouteGet, contactCms::contactCmsRouteGet, projectsCms::projectsCmsRouteGet, indexCms::homeCmsRouteGet
    ])
}
