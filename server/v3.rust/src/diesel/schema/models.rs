use chrono::NaiveDateTime;
use diesel::{Insertable, Queryable};
use serde::{Deserialize, Serialize};

#[derive(Debug, Queryable, Insertable, Serialize, Deserialize)]
#[table_name = "contact_messages"]
pub struct ContactMessage {
    pub id: i32,
    pub date: NaiveDateTime,
    pub session_id: String,
    pub message: String,
}

#[derive(Debug, Queryable, Insertable, Serialize, Deserialize)]
#[table_name = "fingerprint"]
pub struct Fingerprint {
    pub id: i32,
    pub date: NaiveDateTime,
    pub uuid: String,
    pub canvas_hash: String,
    pub platform: String,
    pub browser: String,
    pub version: String,
    pub useragent: Option<String>,
    pub darkmode: i32,
    pub cookie_enabled: i32,
    pub actual_height: i32,
    pub actual_width: i32,
    pub pixel_depth: i32,
    pub inner_height: i32,
    pub inner_width: i32,
    pub outer_height: i32,
    pub outer_width: i32,
    pub ip: String,
}

#[derive(Debug, Queryable, Insertable, Serialize, Deserialize)]
#[table_name = "forum_posts"]
pub struct ForumPost {
    pub id: i32,
    pub date: NaiveDateTime,
    pub forum_user_id: Option<String>,
    pub title: String,
    pub category_id: i32,
    pub body: String,
    pub visible: i32,
    pub parent_forum_user_id: i32,
}

#[derive(Debug, Queryable, Insertable, Serialize, Deserialize)]
#[table_name = "forum_post_category"]
pub struct ForumPostCategory {
    pub id: i32,
    pub name: String,
}

#[derive(Debug, Queryable, Insertable, Serialize, Deserialize)]
#[table_name = "forum_post_reactions"]
pub struct ForumPostReaction {
    pub id: i32,
    pub date: NaiveDateTime,
    pub forum_user_id: Option<String>,
    pub forum_post_id: i32,
    pub reaction_id: i32,
}

#[derive(Debug, Queryable, Insertable, Serialize, Deserialize)]
#[table_name = "forum_post_views"]
pub struct ForumPostView {
    pub id: i32,
    pub date: NaiveDateTime,
    pub forum_user_id: Option<String>,
    pub forum_post_id: i32,
}

#[derive(Debug, Queryable, Insertable, Serialize, Deserialize)]
#[table_name = "forum_refresh_tokens"]
pub struct ForumRefreshToken {
    pub id: i32,
    pub date: NaiveDateTime,
    pub forum_user_id: String,
    pub forum_refresh_token: String,
}


#[derive(Debug, Serialize, Deserialize, Queryable)]
struct ForumRole {
    id: i32,
    can_post: i32,
}

#[derive(Debug, Serialize, Deserialize, Queryable)]
struct ForumUserTracking {
    id: i32,
    date: NaiveDateTime,
    forum_user_id: i32,
    session_id: String,
    function_called: String,
}

#[derive(Debug, Serialize, Deserialize, Queryable)]
struct FuelPrices {
    id: i32,
    date: NaiveDateTime,
    minprice: String,
    maxprice: String,
    averageprice: String,
    wholesale: String,
}

#[derive(Debug, Serialize, Deserialize, Queryable)]
struct FuelPricesDB {
    id: i32,
    date: NaiveDateTime,
    minprice: String,
    maxprice: String,
    averageprice: String,
    wholesale: String,
}

#[derive(Debug, Serialize, Deserialize, Queryable)]
struct Monitor {
    id: i32,
    date: NaiveDateTime,
    uuid: String,
    session_id: String,
    page: String,
}

#[derive(Debug, Serialize, Deserialize, Queryable)]
struct Requests {
    id: i32,
    date: NaiveDateTime,
    ip_address: String,
}

#[derive(Debug, Serialize, Deserialize, Queryable)]
struct RouteTrack {
    id: i32,
    date: NaiveDateTime,
    session_id: String,
    source: String,
    destination: String,
}
