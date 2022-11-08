from threading import Lock
import sqlite3
import os
from dotenv import dotenv_values

config = dotenv_values('.env')
appDir = os.getcwd()
lock = Lock()

class DatabaseManager(object):
  def __init__(self, db):
    self.conn = sqlite3.connect(db, check_same_thread=False)
    # refer to https://stackoverflow.com/questions/26629080/python-and-sqlite3-programmingerror-recursive-use-of-cursors-not-allowed
    # https://stackoverflow.com/questions/52212844/multithreading-with-flask
    self.conn.execute('pragma foreign_keys = on')
    self.conn.commit()
    self.cur = self.conn.cursor()
    # self.queue = []

  def query(self, query, vals):
    # lock.acquire(True)
    self.cur.execute(query, vals)
    self.conn.commit()
    # lock.release()
    return self.cur
  
  def insert(self, query, val):
    lock.acquire(True)
    self.query(query, val)
    lock.release()

  def fetch(self, query, val):
    lock.acquire(True)
    res = self.query(query, val).fetchall()
    lock.release()
    return res

  # def execute(self, query, vals):
  #   for i in self.queue:
  #     execute
  #   return 

  def __del__(self):
    self.conn.close()

conn = DatabaseManager(f'{appDir}/data/database.db')