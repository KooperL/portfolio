from flask import Blueprint, render_template, jsonify, request
import scripts.utils.decorators
import scripts.utils.responses
import scripts.utils.structs
import scripts.utils.hashFunctions
import secrets
import datetime
import inspect
import scripts.utils.blogFuncs
import controllers.database
from dotenv import dotenv_values
config = dotenv_values('.env')

post = Blueprint('post', __name__)

@post.route(f'/{scripts.utils.structs.blogPath}/post', methods=['POST', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.token_required
def blogPostCreateHome(authPayload):
  if request.method == 'POST':
    data = request.get_json()
    if 'data' not in data and 'session_id' not in data:
      return scripts.utils.responses.build_bad_req()
    session_id = data.get('session_id')
    user_id = authPayload.get('payload').get('userId')
    username = authPayload.get('payload').get('username')
    role = authPayload.get('payload').get('role')
    scripts.utils.blogFuncs.trackBlogFunctionsCalled(username, session_id, inspect.stack()[0][3])

    data = data.get('data')
    if 'blog_title' not in data and 'blog_body' not in data:
      return scripts.utils.responses.build_bad_req()

    blog_title = data.get('blog_title')
    blog_body = data.get('blog_body')

    validatePermsQuery = 'SELECT canPost from blog_roleDB where ? = "None" and id = ?;'
    canPost = controllers.database.conn.fetch(validatePermsQuery, ('None', role))
    if canPost[0][0] != 1:
      return scripts.utils.responses.build_unauthorized()

    publishBlogQuery = 'INSERT INTO blog_postsDB VALUES (?, ?, ?, ?, ?, ?, ?, ?);'
    controllers.database.conn.fetch(publishBlogQuery, (None, datetime.datetime.now(), user_id, blog_title, 1, blog_body, 1, 0))
    
    publishedBlogIdQuery = 'SELECT id from blog_postsDB where blog_user_id = ? and title = ? and  body = ?;'
    publishedBlogId = controllers.database.conn.fetch(publishedBlogIdQuery, (user_id, blog_title, blog_body))
    kwargs = {
      'success': True,
      'data': {
        'blogPostId': publishedBlogId[0][0]
      }
    }
    res = jsonify(kwargs)
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')