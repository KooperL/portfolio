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

create_contact_messagesDB = '''create table if not exists contactMessagesDB (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  uuid text not null,
  message text not null
);'''

create_fingerprintDB = '''create table if not exists fingerprintDB (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  uuid text not null,
  canvas_hash text not null,
  platform text not null,
  useragent text,
  darkmode boolean,
  cookieEnabled boolean,
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
  path text not null
);'''

create_route_trackDB = '''create table if not exists routeTrackDB (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  uuid TIMESTAMP not null,
  source text not null,
  destination text not null
);'''

def create():
  conn.execute(create_fuelpricesDB)
  conn.execute(create_contact_messagesDB)
  conn.execute(create_fingerprintDB)
  conn.execute(create_monitorDB)
  conn.execute(create_route_trackDB)
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
  # create()
  # insert()
  delete('routeTrackDB')
  delete('monitorDB')
  delete('fingerprintDB')
  delete('contactMessagesDB')
  close()



