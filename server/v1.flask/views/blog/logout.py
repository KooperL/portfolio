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


logout = Blueprint('logout', __name__)

@logout.route(f'/{scripts.utils.structs.blogPath}/logout', methods=['POST', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.token_required
def blogLogoutHome(authPayload):
  if request.method == 'POST':
    refresh_token = request.cookies.get('refresh_token')
    if not refresh_token:
      return scripts.utils.responses.build_unauthenticated()
    refreshTokenSearchQuery = 'SELECT count(*) FROM blog_refresh_tokensDB where ? = "None" and blog_refresh_token = ?'    # expanding string when only one item in tuple ??? have to add second arg
    tokenRows = controllers.database.conn.fetch(refreshTokenSearchQuery, ('None', refresh_token))

    if len(tokenRows) != 1:
      return scripts.utils.responses.build_unauthorized()

    outcome = scripts.utils.decorators.blogAuthorize(refresh_token, config['blog-jwt-refresh-token'])

    if not outcome.get('success'):
      return scripts.utils.responses.build_unauthorized()

    user_id = authPayload.get('payload').get('userId')
    userRefreshTokenDelete = 'DELETE from blog_refresh_tokensDB where ? = "None" and blog_user_id = ?;'
    controllers.database.conn.fetch(userRefreshTokenDelete, ('None', user_id))

    kwargs = {
      'success': True
    }

    res = jsonify(kwargs)
    res.set_cookie('refresh_token', value='', expires=0, httponly=True)
    res.headers.add('Access-Control-Allow-Credentials', 'true') 
    return scripts.utils.responses.build_actual_response(res), 201
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')
