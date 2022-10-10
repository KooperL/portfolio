import sqlite3
import os
import datetime


appDir = os.getcwd()
print(f'RUN THIS COMMAND TO CREATE THE FOLDER: $mkdir {appDir}/data/')
conn = sqlite3.connect(f'{appDir}/data/database.db')

create_fuelpricesDB= '''create table if not exists fuelpricesDB (
  id integer PRIMARY KEY,
  date TIMESTAMP not null unique,
  minprice text not null,
  maxprice text not null ,
  averageprice text not null,
  wholesale text not null
);'''

create_contact_messagesDB = '''create table if not exists contact_messagesDB (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  session_id text not null,
  message text not null
);'''

create_fingerprintDB = '''create table if not exists fingerprintDB (
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


create_monitorDB = '''create table if not exists monitorDB (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  uuid text not null,
  session_id text not null,
  page text not null
);'''

create_route_trackDB = '''create table if not exists route_trackDB (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  session_id text not null,
  source text not null,
  destination text not null
);'''

create_blog_usersDB = '''create table if not exists blog_usersDB (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  blog_username text unique not null,
  blog_password_hash text not null,
  blog_password_salt text not null,
  role_id INTEGER not null
);'''

create_blog_roleDB = '''create table if not exists blog_roleDB (
  id integer PRIMARY KEY,
  canPost INTEGER not null
);'''

create_role = 'INSERT into blog_roleDB values (1, 1)'

create_blog_refresh_tokensDB = '''create table if not exists blog_refresh_tokensDB (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  blog_user_id text unique not null,
  blog_refresh_token text unique not null
);'''

create_blog_user_trackingDB = '''create table if not exists blog_user_trackingDB (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  blog_user_id text,
  session_id text not null,
  function_called text not null
);'''

create_blog_postsDB = '''create table if not exists blog_postsDB (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  blog_user_id text,
  title text not null,
  body text not null
);'''

create_blog_post_viewsDB = '''create table if not exists blog_post_viewsDB (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  blog_user_id text,
  blog_post_id INTEGER not null
);'''

def createRoles():
  conn.execute(create_blog_roleDB)
  conn.execute(create_role)


def create():
  conn.execute(create_fuelpricesDB)
  conn.execute(create_contact_messagesDB)
  conn.execute(create_fingerprintDB)
  conn.execute(create_monitorDB)
  conn.execute(create_route_trackDB)
  conn.execute(create_blog_usersDB)
  conn.execute(create_blog_refresh_tokensDB)
  conn.execute(create_blog_user_trackingDB)
  conn.execute(create_blog_postsDB)
  conn.execute(create_blog_post_viewsDB)
  createRoles()
  print('success')

def insert():
  # query = '''INSERT INTO contactMessagesDB VALUES (?, ?, ?, ?);'''
  # conn.execute(query, (None, datetime.datetime.now(), 'U8YfzMdrd9AWQM9p8988', 'test'))
  print('success')

def delete(table):
  conn.execute(f'DROP TABLE if exists {table}')

def close():
  conn.commit()
  conn.close()


if __name__ == '__main__':
  # insert()
  # delete('routeTrackDB')
  # delete('monitorDB')
  # delete('fingerprintDB')
  # delete('contactMessagesDB')
  create()
  close()



