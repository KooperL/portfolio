from flask import Blueprint, render_template, jsonify, request
import scripts.utils.decorators
import scripts.utils.responses
import scripts.utils.structs
import scripts.utils.hashFunctions
import secrets
import datetime
import inspect
import scripts.utils.forumFuncs
import controllers.database
import controllers.discordLogger
from controllers.logger import logger, getRequestContext
from dotenv import dotenv_values

config = dotenv_values('../.env')

post = Blueprint('post', __name__)

@post.route(f'/{scripts.utils.structs.forumPath}/post', methods=['POST', 'OPTIONS'])
@scripts.utils.decorators.WrapWithLogs
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.token_required
@scripts.utils.decorators.rateLimit
def forumPostCreateHome(authPayload):
  if request.method == 'POST':
    logger.info(msg=f"({getRequestContext()}) Processing request POST/")
    data = request.get_json()
    if 'data' not in data and 'session_id' not in data:
      return scripts.utils.responses.build_bad_req()
    session_id = data.get('session_id')
    user_id = authPayload.get('payload').get('userId')
    username = authPayload.get('payload').get('username')
    role = authPayload.get('payload').get('role')
    scripts.utils.forumFuncs.trackForumFunctionsCalled(username, session_id, inspect.stack()[0][3])

    data = data.get('data')
    if 'forum_title' not in data and 'forum_body' not in data:
      return scripts.utils.responses.build_bad_req()

    forum_title = data.get('forum_title')
    forum_body = data.get('forum_body')

    validatePermsQuery = 'SELECT canPost from forum_role where ? = "None" and id = ?;'
    canPost = controllers.database.conn.fetch(validatePermsQuery, ('None', role))
    if canPost[0][0] != 1:
      return scripts.utils.responses.build_unauthorized()


    publishForumQuery = 'INSERT INTO forum_posts VALUES (?, ?, ?, ?, ?, ?, ?, ?);'
    controllers.database.conn.fetch(publishForumQuery, (None, datetime.datetime.now(), user_id, forum_title, 1, forum_body, 1, 0))

    controllers.discordLogger.send_discord_message(config['DISCORD_WEBHOOK_URL'], f'BLOG POST: {user_id}, {forum_title}, {forum_body}')    
    publishedForumIdQuery = 'SELECT id from forum_posts where forum_user_id = ? and title = ? and  body = ?;'
    publishedForumId = controllers.database.conn.fetch(publishedForumIdQuery, (user_id, forum_title, forum_body))
    kwargs = {
      'success': True,
      'data': {
        'forumPostId': publishedForumId[0][0]
      }
    }
    res = jsonify(kwargs)
    res.headers.add('Access-Control-Allow-Credentials', 'true') 
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')
