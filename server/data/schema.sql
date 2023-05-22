-- TABLE
CREATE TABLE contact_messages (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  session_id text not null,
  message text not null
);
CREATE TABLE fingerprint (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  uuid text not null,
  canvas_hash text not null,
  platform text not null,
  browser text not null,
  version text not null,
  useragent text,
  darkmode INTEGER,
  cookieEnabled INTEGER,
  actualHeight INTEGER,
  actualWidth INTEGER,
  pixelDepth INTEGER,
  innerHeight INTEGER,
  innerWidth INTEGER,
  outerHeight INTEGER,
  outerWidth INTEGER,
  ip text not null
);
CREATE TABLE forum_posts (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  forum_user_id text,
  title text not null,
  category_id integer not null,
  body text not null,
  visible INTEGER not null,
  parent_forum_user_id INTEGER not null
);
CREATE TABLE forum_post_category (
  id integer PRIMARY KEY,
  name text not null
);
CREATE TABLE forum_post_reactions (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  forum_user_id text,
  forum_post_id INTEGER not null,
  reaction_id INTEGER not null
);
CREATE TABLE forum_post_views (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  forum_user_id text,
  forum_post_id INTEGER not null
);
CREATE TABLE forum_refresh_tokens (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  forum_user_id text unique not null,
  forum_refresh_token text unique not null
);
CREATE TABLE forum_role (
  id integer PRIMARY KEY,
  canPost INTEGER not null
);
CREATE TABLE forum_users (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  forum_username text unique not null,
  forum_password_hash BLOB not null,
  forum_password_salt text not null,
  role_id INTEGER not null,
  account_standing INTEGER not null,
  account_status INTEGER not null
);
CREATE TABLE forum_user_tracking (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  forum_user_id integer,
  session_id text not null,
  function_called text not null
);
CREATE TABLE fuelprices (
  id integer PRIMARY KEY,
  date TIMESTAMP not null unique,
  minprice text not null,
  maxprice text not null ,
  averageprice text not null,
  wholesale text not null
);
CREATE TABLE fuelpricesDB (
  id integer PRIMARY KEY,
  date TIMESTAMP not null unique,
  minprice text not null,
  maxprice text not null ,
  averageprice text not null,
  wholesale text not null
);
CREATE TABLE monitor (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  uuid text not null,
  session_id text not null,
  page text not null
);
CREATE TABLE requests (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  ip_address text not null
);
CREATE TABLE route_track (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  session_id text not null,
  source text not null,
  destination text not null
);
 
-- INDEX
 
-- TRIGGER
 
-- VIEW
 
