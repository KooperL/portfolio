from flask import Blueprint, render_template, jsonify, request
import scripts.utils.decorators
import scripts.utils.responses
import scripts.utils.structs
import scripts.utils.hashFunctions
import secrets
import datetime
import inspect
from dotenv import dotenv_values
config = dotenv_values('.env')


post_search = Blueprint('post_search', __name__)

@post_search.route(f'/{scripts.utils.structs.blogPath}/post/<int:id>', methods=['POST', 'OPTIONS'])   # DEL, GET was,'t working because axios wouldn't set content length
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.token_required
def blogPostViewHome(authPayload, *args, **kwargs):
  if request.method == 'POST':
    id = int(kwargs.get('id'))
    print(id)
    data = request.get_json()
    print(request)
    user_id = authPayload.get('payload').get('userId')
    username = authPayload.get('payload').get('username')
    role = authPayload.get('payload').get('role')
    if 'session_id' not in data:
      return scripts.utils.responses.build_bad_req()
    session_id = data.get('session_id')
    trackBlogFunctionsCalled(username, session_id, inspect.stack()[0][3])
    
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
        blog_postsDB.id = ? and
        (blog_postsDB.visible = 1 or blog_postsDB.blog_user_id = ? or ? = "True");'''
    postRaw = conn.fetch(pullBlogQuery, (id, user_id, (role==999)))

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


    addBlogViewQuery = 'INSERT INTO blog_post_viewsDB VALUES (?, ?, ?, ?);'
    conn.fetch(addBlogViewQuery, (None, datetime.datetime.now(), user_id, id))

    # Distinct views??
    pullBlogViewsQuery = 'SELECT count(*) from blog_post_viewsDB where ? = "None" and blog_post_id = ?;'
    postViewsRaw = conn.fetch(pullBlogViewsQuery, ('None', id))[0][0]

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
