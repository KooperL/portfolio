#[macro_use]
extern crate rocket;
#[path = "routes/projects/secondary.rs"] mod secondary;
#[path = "routes/projects/seqalign.rs"] mod seqalign;
#[path = "routes/projects/randombio.rs"] mod randombio;
#[path = "routes/projects/mrna.rs"] mod mrna;

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![secondary::secondaryRouteGet, seqalign::seqAlignRouteGet, randombio::randomBioRouteGet, mrna::mrnaRouteGet])
}
