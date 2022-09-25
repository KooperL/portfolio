import sqlite3
import os
import datetime


appDir = os.getcwd()
print(f'RUN THIS COMMAND TO CREATE THE FOLDER: $mkdir {appDir}/data/')
conn = sqlite3.connect(f'{appDir}/data/database.db')

create_fuelpricesDB= '''create table fuelpricesDB (
  id integer PRIMARY KEY,
  date TIMESTAMP not null unique,
  minprice text not null,
  maxprice text not null ,
  averageprice text not null,
  wholesale text not null);'''

create_contactMessagesDB = '''create table contactMessagesDB (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  uuid text not null,
  message text not null);'''

create_fingerprintDB__TODO = '''create table fingerprintDB (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  uuid text not null,
  useragent text,
  platform text,
  cookieEnabled text,
  java text,
  online text,
  actualHeight text,
  actualWidth text,
  pixelDepth text,
  innerHeight text,
  innerWidth text,
  outerHeight text,
  outerWidth text,
  ip text not null,
  canvas_hash text not null);'''

create_fingerprintDB = '''create table fingerprintDB (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  uuid text not null,
  ip text not null,
  canvas_hash text not null);'''

create_browserSnapshotDB = '''create table browserSnapshotDB (
  id integer PRIMARY KEY,
  date TIMESTAMP not null,
  uuid TIMESTAMP not null,
  path text not null);'''


def create():
  # conn.execute(create_fuelpricesDB)
  # conn.execute(create_contactMessagesDB)
  # conn.execute(create_fingerprintDB)
  # conn.execute(create_browserSnapshotDB)
  print('success')

def insert():
  # query = '''INSERT INTO contactMessagesDB VALUES (?, ?, ?, ?);'''
  # conn.execute(query, (None, datetime.datetime.now(), 'U8YfzMdrd9AWQM9p8988', 'test'))
  print('success')

def close():
  conn.commit()
  conn.close()


if __name__ == '__main__':
  # create()
  # insert()
  close()



