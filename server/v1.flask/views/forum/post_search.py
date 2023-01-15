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
from dotenv import dotenv_values
config =  dotenv_values('../.env')


post_search = Blueprint('post_search', __name__)

@post_search.route(f'/{scripts.utils.structs.forumPath}/post/<int:id>', methods=['POST', 'OPTIONS'])   # DEL, GET was,'t working because axios wouldn't set content length
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.token_required
@scripts.utils.decorators.rateLimit
def forumPostViewHome(authPayload, *args, **kwargs):
  if request.method == 'POST':
    id = int(kwargs.get('id'))
    data = request.get_json()
    user_id = authPayload.get('payload').get('userId')
    username = authPayload.get('payload').get('username')
    role = authPayload.get('payload').get('role')
    if 'session_id' not in data:
      return scripts.utils.responses.build_bad_req()
    session_id = data.get('session_id')
    scripts.utils.forumFuncs.trackForumFunctionsCalled(username, session_id, inspect.stack()[0][3])
    
    pullForumQuery = '''
      SELECT 
        forum_posts.id,
        forum_posts.date,
        forum_users.forum_username,
        forum_posts.title,
        forum_posts.body,
        forum_user_id,
        forum_post_category.name
      from forum_posts
      INNER JOIN forum_post_category
        on forum_post_category.id = forum_posts.category_id
      INNER JOIN forum_users
        on forum_users.id = forum_posts.forum_user_id
      where
        forum_posts.id = ? and
        (forum_posts.visible = 1 or forum_posts.forum_user_id = ? or ? = "True");'''
    postRaw = controllers.database.conn.fetch(pullForumQuery, (id, user_id, (role==999)))

    if len(postRaw) != 1:
      return scripts.utils.responses.build_not_found()

    post = {
      'id' : postRaw[0][0],
      'date' : postRaw[0][1],
      'author': postRaw[0][2],
      'title': postRaw[0][3],
      'body': postRaw[0][4],
      'author_id': postRaw[0][5],
      'category': postRaw[0][6],
    }

    # if visible != 1 or role == 999:
    #   scripts.utils.responses.build_not_found()


    addForumViewQuery = 'INSERT INTO forum_post_views VALUES (?, ?, ?, ?);'
    controllers.database.conn.fetch(addForumViewQuery, (None, datetime.datetime.now(), user_id, id))

    # Distinct views??
    pullForumViewsQuery = 'SELECT count(*) from forum_post_views where ? = "None" and forum_post_id = ?;'
    postViewsRaw = controllers.database.conn.fetch(pullForumViewsQuery, ('None', id))[0][0]

    post = {
      **post,
      'views': postViewsRaw,
    }

    kwargs = {
      'success': True,
      'data': post,
    }
    res = jsonify(kwargs)
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')
