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


blogIndex = Blueprint('blogIndex', __name__)

@blogIndex.route(f'/{scripts.utils.structs.blogPath}', methods=['GET', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.token_required
def blogHome(authPayload):
  if request.method == 'GET':
    session_id = request.args.get('session_id')
    category = request.args.get('category')
    search = request.args.get('search')
    if not session_id:
      return scripts.utils.responses.build_bad_req()
      
    user_id = authPayload.get('payload').get('userId')
    username = authPayload.get('payload').get('username')
    role = authPayload.get('payload').get('role')
    scripts.utils.blogFuncs.trackBlogFunctionsCalled(username, session_id, inspect.stack()[0][3])

    if category:
      categoryQuery = 'SELECT id from blog_post_categoryDB where "None" = ? and name = ?;'
      categoryId = controllers.database.conn.fetch(categoryQuery, ("None", category))[0]

      if not len(categoryId):
        return scripts.utils.responses.build_not_found()
      
      categoryPostsQuery = '''
        SELECT 
          blog_postsDB.id,
          blog_postsDB.date,
          blog_usersDB.blog_username,
          blog_postsDB.title,
          blog_postsDB.body
        from blog_postsDB
        inner join blog_usersDB on
          blog_usersDB.id = blog_postsDB.blog_user_id
        where
          visible = 1 and
          blog_postsDB.parent_blog_user_id = 0 and
          ? = "None" and
          blog_postsDB.category_id = ?
      '''
      categoryPosts = controllers.database.conn.fetch(categoryPostsQuery, ('None', categoryId[0]))
      OrganisedPosts = []
      if not len(categoryPosts):
        return scripts.utils.responses.build_not_found()

      for a in categoryPosts:
        pullBlogViewsQuery = 'SELECT count(*) from blog_post_viewsDB where ? = "None" and blog_post_id = ?;'
        postViewsRaw = controllers.database.conn.fetch(pullBlogViewsQuery, ('None', a[0]))[0][0]

        OrganisedPosts.append({
          'id': a[0],
          'date': a[1],
          'author': a[2],
          'title': a[3],
          'body': a[4][:30],
          'views': postViewsRaw
        })
      kwargs = {
        'success': True,
        'data': {
          category: OrganisedPosts
        }
      }
      res = jsonify(kwargs)
      res.headers.add('Access-Control-Allow-Credentials', 'true') 
      return scripts.utils.responses.build_actual_response(res)

    elif search:

      generalQuery = '''
        SELECT 
          blog_postsDB.id,
          blog_postsDB.date,
          blog_usersDB.blog_username,
          blog_postsDB.title,
          blog_postsDB.body,
          blog_post_categoryDB.name
        from blog_postsDB
        inner join blog_usersDB on
          blog_usersDB.id = blog_postsDB.blog_user_id
        INNER JOIN blog_post_categoryDB
          on blog_post_categoryDB.id = blog_postsDB.category_id
        where
          visible = 1 and
          blog_post_categoryDB.name like ? or 
          blog_usersDB.blog_username like ? or 
          blog_postsDB.title like ? or 
          blog_postsDB.body like ? 
      '''
      generalResults = controllers.database.conn.fetch(generalQuery, (search, search, search, search))
      OrganisedPosts = {}

      print(generalResults)

      if not len(generalResults):
        return scripts.utils.responses.build_not_found()

      for a in generalResults:
        pullBlogViewsQuery = 'SELECT count(*) from blog_post_viewsDB where ? = "None" and blog_post_id = ?;'
        postViewsRaw = controllers.database.conn.fetch(pullBlogViewsQuery, ('None', a[0]))[0][0]

        if a[5] not in OrganisedPosts:
          OrganisedPosts[a[5]] = [{
            'id': a[0],
            'date': a[1],
            'author': a[2],
            'title': a[3],
            'body': a[4][:30],
            'views': postViewsRaw
          }]
        else:
          OrganisedPosts[a[5]].append({
            'id': a[0],
            'date': a[1],
            'author': a[2],
            'title': a[3],
            'body': a[4][:30],
            'views': postViewsRaw
          })
      kwargs = {
        'success': True,
        'data': OrganisedPosts
      }
      res = jsonify(kwargs)
      res.headers.add('Access-Control-Allow-Credentials', 'true') 
      return scripts.utils.responses.build_actual_response(res)
    else:
      categoriesQuery = 'SELECT id, name from blog_post_categoryDB limit 5;'
      categories = controllers.database.conn.fetch(categoriesQuery, ())

      OrganisedPosts = {}
      for i in categories:
        # categoryPostsQuery = '''
        # SELECT 
        #   blog_postsDB.id,
        #   blog_postsDB.date,
        #   blog_usersDB.blog_username,
        #   blog_postsDB.title,
        #   blog_postsDB.body
        # from blog_postsDB
        # inner join blog_usersDB on
        #   blog_usersDB.id = blog_postsDB.blog_user_id
        # inner join blog_post_categoryDB on
        #   blog_postsDB.category_id = blog_post_categoryDB.id
        # where
        #   visible = 1 and
        #   blog_postsDB.parent_blog_user_id = 0 and
        #   ? = "None"
        # ORDER BY blog_postsDB.category_id
        # limit 5;
        # '''

        categoryPostsQuery = '''
          SELECT 
            blog_postsDB.id,
            blog_postsDB.date,
            blog_usersDB.blog_username,
            blog_postsDB.title,
            blog_postsDB.body
          from blog_postsDB
          inner join blog_usersDB on
            blog_usersDB.id = blog_postsDB.blog_user_id
          where
            visible = 1 and
            blog_postsDB.parent_blog_user_id = 0 and
            ? = "None" and
            blog_postsDB.category_id = ?
          limit 5;
        '''
        categoryPosts = controllers.database.conn.fetch(categoryPostsQuery, ('None', i[0]))
        if len(categoryPosts):
          OrganisedPosts[i[1]] = []
        for a in categoryPosts:
          pullBlogViewsQuery = 'SELECT count(*) from blog_post_viewsDB where ? = "None" and blog_post_id = ?;'
          postViewsRaw = controllers.database.conn.fetch(pullBlogViewsQuery, ('None', a[0]))[0][0]

          OrganisedPosts[i[1]].append({
            'id': a[0],
            'date': a[1],
            'author': a[2],
            'title': a[3],
            'body': a[4][:30],
            'views': postViewsRaw
          })
      kwargs = {
        'success': True,
        'data': OrganisedPosts
      }
      res = jsonify(kwargs)
      res.headers.add('Access-Control-Allow-Credentials', 'true') 
      return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')