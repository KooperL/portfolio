import datetime
import controllers.database


def trackForumFunctionsCalled(forumUsername, session_id, funct):
  insertQuery = """INSERT INTO forum_user_tracking VALUES (
    ?, ?, ?, ?, ?
  );"""
  controllers.database.conn.insert(insertQuery, (None, datetime.datetime.now(), forumUsername, session_id, funct))