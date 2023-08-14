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


user_search = Blueprint('user_search', __name__)

@user_search.route(f'/{scripts.utils.structs.forumPath}/user/<string:username>', methods=['GET', 'OPTIONS'])   # DEL, GET was,'t working because axios wouldn't set content length
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.token_required
@scripts.utils.decorators.rateLimit
def forumUserViewHome(authPayload, *args, **kwargs):
  if request.method == 'GET':
    username = kwargs.get('username')

    session_id = request.args.get('session_id')
    user_id = authPayload.get('payload').get('userId')
    username = authPayload.get('payload').get('username')
    role = authPayload.get('payload').get('role')
    if not session_id:
      return scripts.utils.responses.build_bad_req()
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
        lower(forum_users.forum_username) = ? and
        (forum_posts.visible = 1 or forum_posts.forum_user_id = ? or ? = "True");'''
    postRaw = controllers.database.conn.fetch(pullForumQuery, (username.lower(), user_id, (role==999)))
    # if len(postRaw) <= 0:
    #   return scripts.utils.responses.build_not_found()

    posts = []
    for i in postRaw:
      # Distinct views??
      pullForumViewsQuery = 'SELECT count(*) from forum_post_views where ? = "None" and forum_post_id = ?;'
      postViewsRaw = controllers.database.conn.fetch(pullForumViewsQuery, ('None', i[0]))[0][0]
      posts.append({
      'id' : i[0],
      'date' : i[1],
      'author': i[2],
      'title': i[3],
      'body': i[4],
      'author_id': i[5],
      'category': i[6],
      'views': postViewsRaw,
    })

    kwargs = {
      'success': True,
      'data': posts,
    }
    res = jsonify(kwargs)
    res.headers.add('Access-Control-Allow-Credentials', 'true') 
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')
