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


forumIndex = Blueprint('forumIndex', __name__)

@forumIndex.route(f'/{scripts.utils.structs.forumPath}', methods=['GET', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.rateLimit
@scripts.utils.decorators.token_required
def forumHome(authPayload):
  if request.method == 'GET':
    session_id = request.args.get('session_id')
    category = request.args.get('category')
    search = request.args.get('search')
    if not session_id:
      return scripts.utils.responses.build_bad_req()
      
    user_id = authPayload.get('payload').get('userId')
    username = authPayload.get('payload').get('username')
    role = authPayload.get('payload').get('role')
    scripts.utils.forumFuncs.trackForumFunctionsCalled(username, session_id, inspect.stack()[0][3])

    if category:
      categoryQuery = 'SELECT id from forum_post_category where "None" = ? and name = ?;'
      categoryId = controllers.database.conn.fetch(categoryQuery, ("None", category))[0]

      if not len(categoryId):
        return scripts.utils.responses.build_not_found()
      
      categoryPostsQuery = '''
        SELECT 
          forum_posts.id,
          forum_posts.date,
          forum_users.forum_username,
          forum_posts.title,
          forum_posts.body
        from forum_posts
        inner join forum_users on
          forum_users.id = forum_posts.forum_user_id
        where
          visible = 1 and
          forum_posts.parent_forum_user_id = 0 and
          ? = "None" and
          forum_posts.category_id = ?
      '''
      categoryPosts = controllers.database.conn.fetch(categoryPostsQuery, ('None', categoryId[0]))
      OrganisedPosts = []
      # if not len(categoryPosts):
      #   return scripts.utils.responses.build_not_found()

      for a in categoryPosts:
        pullForumViewsQuery = 'SELECT count(*) from forum_post_views where ? = "None" and forum_post_id = ?;'
        postViewsRaw = controllers.database.conn.fetch(pullForumViewsQuery, ('None', a[0]))[0][0]

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
        'data': OrganisedPosts
      }
      res = jsonify(kwargs)
      res.headers.add('Access-Control-Allow-Credentials', 'true') 
      return scripts.utils.responses.build_actual_response(res)

    elif search:

      generalQuery = '''
        SELECT 
          forum_posts.id,
          forum_posts.date,
          forum_users.forum_username,
          forum_posts.title,
          forum_posts.body,
          forum_post_category.name
        from forum_posts
        inner join forum_users on
          forum_users.id = forum_posts.forum_user_id
        INNER JOIN forum_post_category
          on forum_post_category.id = forum_posts.category_id
        where
          visible = 1 and
          forum_post_category.name like ? or 
          forum_users.forum_username like ? or 
          forum_posts.title like ? or 
          forum_posts.body like ? 
      '''
      generalResults = controllers.database.conn.fetch(generalQuery, (search, search, search, search))
      OrganisedPosts = {}

      # if not len(generalResults):
      #   return scripts.utils.responses.build_not_found()

      for a in generalResults:
        pullForumViewsQuery = 'SELECT count(*) from forum_post_views where ? = "None" and forum_post_id = ?;'
        postViewsRaw = controllers.database.conn.fetch(pullForumViewsQuery, ('None', a[0]))[0][0]

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
      categoriesQuery = 'SELECT id, name from forum_post_category limit 5;'
      categories = controllers.database.conn.fetch(categoriesQuery, ())

      OrganisedPosts = {}
      for i in categories:
        # categoryPostsQuery = '''
        # SELECT 
        #   forum_posts.id,
        #   forum_posts.date,
        #   forum_users.forum_username,
        #   forum_posts.title,
        #   forum_posts.body
        # from forum_posts
        # inner join forum_users on
        #   forum_users.id = forum_posts.forum_user_id
        # inner join forum_post_category on
        #   forum_posts.category_id = forum_post_category.id
        # where
        #   visible = 1 and
        #   forum_posts.parent_forum_user_id = 0 and
        #   ? = "None"
        # ORDER BY forum_posts.category_id
        # limit 5;
        # '''

        categoryPostsQuery = '''
          SELECT 
            forum_posts.id,
            forum_posts.date,
            forum_users.forum_username,
            forum_posts.title,
            forum_posts.body
          from forum_posts
          inner join forum_users on
            forum_users.id = forum_posts.forum_user_id
          where
            visible = 1 and
            forum_posts.parent_forum_user_id = 0 and
            ? = "None" and
            forum_posts.category_id = ?
          limit 5;
        '''
        categoryPosts = controllers.database.conn.fetch(categoryPostsQuery, ('None', i[0]))
        if len(categoryPosts):
          OrganisedPosts[i[1]] = []
        for a in categoryPosts:
          pullForumViewsQuery = 'SELECT count(*) from forum_post_views where ? = "None" and forum_post_id = ?;'
          postViewsRaw = controllers.database.conn.fetch(pullForumViewsQuery, ('None', a[0]))[0][0]

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
