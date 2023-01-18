import sqlite3
import os
import datetime


appDir = os.getcwd()
print(f'RUN THIS COMMAND TO CREATE THE FOLDER: $mkdir {appDir}/../data/')
conn = sqlite3.connect(f'{appDir}/../data/database.db')

create_requests= '''create table if not exists requests (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  ip_address text not null
);'''

create_fuelprices= '''create table if not exists fuelprices (
  id integer PRIMARY KEY,
  date TIMESTAMP not null unique,
  minprice text not null,
  maxprice text not null ,
  averageprice text not null,
  wholesale text not null
);'''

create_contact_messages = '''create table if not exists contact_messages (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  session_id text not null,
  message text not null
);'''

create_fingerprint = '''create table if not exists fingerprint (
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
);'''


create_monitor = '''create table if not exists monitor (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  uuid text not null,
  session_id text not null,
  page text not null
);'''

create_route_track = '''create table if not exists route_track (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  session_id text not null,
  source text not null,
  destination text not null
);'''

create_forum_users = '''create table if not exists forum_users (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  forum_username text unique not null,
  forum_password_hash BLOB not null,
  forum_password_salt text not null,
  role_id INTEGER not null,
  account_standing INTEGER not null,
  account_status INTEGER not null
);'''

create_forum_role = '''create table if not exists forum_role (
  id integer PRIMARY KEY,
  canPost INTEGER not null
);'''


create_forum_post_category = '''create table if not exists forum_post_category (
  id integer PRIMARY KEY,
  name text not null
);'''


create_forum_refresh_tokens = '''create table if not exists forum_refresh_tokens (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  forum_user_id text unique not null,
  forum_refresh_token text unique not null
);'''

create_forum_user_tracking = '''create table if not exists forum_user_tracking (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  forum_user_id integer,
  session_id text not null,
  function_called text not null
);'''

create_forum_posts = '''create table if not exists forum_posts (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  forum_user_id text,
  title text not null,
  category_id integer not null,
  body text not null,
  visible INTEGER not null,
  parent_forum_user_id INTEGER not null
);'''

create_forum_post_views = '''create table if not exists forum_post_views (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  forum_user_id text,
  forum_post_id INTEGER not null
);'''

create_forum_post_reactions = '''create table if not exists forum_post_reactions (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  forum_user_id text,
  forum_post_id INTEGER not null,
  reaction_id INTEGER not null
);'''

def createDefValues():
  create_role = 'INSERT into forum_role values (1, 1)'
  conn.execute(create_role)
  create_category = 'INSERT into forum_post_category values (1, "general")'
  conn.execute(create_category)

def create():
  conn.execute(create_requests)
  conn.execute(create_fuelprices)
  conn.execute(create_contact_messages)
  conn.execute(create_fingerprint)
  conn.execute(create_monitor)
  conn.execute(create_route_track)
  conn.execute(create_forum_users)
  conn.execute(create_forum_refresh_tokens)
  conn.execute(create_forum_user_tracking)
  conn.execute(create_forum_posts)
  conn.execute(create_forum_post_views)
  conn.execute(create_forum_post_reactions)
  conn.execute(create_forum_post_category)
  conn.execute(create_forum_role)
  createDefValues()

  print('success')

def insert():
  # query = '''INSERT INTO contactMessages VALUES (?, ?, ?, ?);'''
  # conn.execute(query, (None, datetime.datetime.now(), 'U8YfzMdrd9AWQM9p8988', 'test'))
  print('success')

def delete(table):
  conn.execute(f'DROP TABLE if exists {table}')

def close():
  conn.commit()
  conn.close()


if __name__ == '__main__':
  # insert()
  # delete('routeTrack')
  # delete('monitor')
  # delete('fingerprint')
  # delete('contactMessages')
  create()
  close()



