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
config =  dotenv_values('../.env')


user_search = Blueprint('user_search', __name__)

@user_search.route(f'/{scripts.utils.structs.blogPath}/user/<string:username>', methods=['GET', 'OPTIONS'])   # DEL, GET was,'t working because axios wouldn't set content length
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.token_required
@scripts.utils.decorators.rateLimit
def blogUserViewHome(authPayload, *args, **kwargs):
  if request.method == 'GET':
    username = kwargs.get('username')

    session_id = request.args.get('session_id')
    user_id = authPayload.get('payload').get('userId')
    username = authPayload.get('payload').get('username')
    role = authPayload.get('payload').get('role')
    if not session_id:
      return scripts.utils.responses.build_bad_req()
    scripts.utils.blogFuncs.trackBlogFunctionsCalled(username, session_id, inspect.stack()[0][3])
    
    pullBlogQuery = '''
      SELECT 
        blog_postsDB.id,
        blog_postsDB.date,
        blog_usersDB.blog_username,
        blog_postsDB.title,
        blog_postsDB.body,
        blog_user_id,
        blog_post_categoryDB.name
      from blog_postsDB
      INNER JOIN blog_post_categoryDB
        on blog_post_categoryDB.id = blog_postsDB.category_id
      INNER JOIN blog_usersDB
        on blog_usersDB.id = blog_postsDB.blog_user_id
      where
        lower(blog_usersDB.blog_username) = ? and
        (blog_postsDB.visible = 1 or blog_postsDB.blog_user_id = ? or ? = "True");'''
    postRaw = controllers.database.conn.fetch(pullBlogQuery, (username.lower(), user_id, (role==999)))
    print(postRaw, username, user_id)
    if len(postRaw) <= 0:
      return scripts.utils.responses.build_not_found()

    posts = []
    for i in postRaw:
      # Distinct views??
      pullBlogViewsQuery = 'SELECT count(*) from blog_post_viewsDB where ? = "None" and blog_post_id = ?;'
      postViewsRaw = controllers.database.conn.fetch(pullBlogViewsQuery, ('None', i[0]))[0][0]
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
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')