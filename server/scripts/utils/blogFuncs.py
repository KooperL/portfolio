import datetime
import controllers.database


def trackBlogFunctionsCalled(blogUsername, session_id, funct):
  insertQuery = """INSERT INTO blog_user_trackingDB VALUES (
    ?, ?, ?, ?, ?
  );"""
  controllers.database.conn.insert(insertQuery, (None, datetime.datetime.now(), blogUsername, session_id, funct))