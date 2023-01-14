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


refresh = Blueprint('refresh', __name__)

@refresh.route(f'/{scripts.utils.structs.forumPath}/refresh', methods=['POST', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
def forumRefreshHome():
  if request.method == 'POST':
    refresh_token = request.cookies.get('refresh_token')
    accessTokenLife = int(config['forum-access-token-life']) # Days
    if not refresh_token:
      # kwargs = {
      #   'success': False
      # }
      # res = jsonify(kwargs)
      # return scripts.utils.responses.build_actual_response(res), 204
      return scripts.utils.responses.build_unauthenticated()
    refreshTokenSearchQuery = 'SELECT count(*) FROM forum_refresh_tokens where ? = "None" and forum_refresh_token = ?'    # expanding string when only one item in tuple ??? have to add second arg
    # tokenRows = controllers.database.conn.execute(refreshTokenSearchQuery, ('None', refresh_token))
    tokenRows = controllers.database.conn.fetch(refreshTokenSearchQuery, ('None', refresh_token))

    if len(tokenRows) != 1:
      return scripts.utils.responses.build_unauthorized()

    outcome = scripts.utils.decorators.forumAuthorize(refresh_token, config['forum-jwt-refresh-token'])
    userId = outcome.get('payload').get('userId')

    if not outcome.get('success'):
      return scripts.utils.responses.build_unauthorized()

    userSearchQuery = 'SELECT forum_username, role_id FROM forum_users where ? = "None" and id = ?'    # expanding string when only one item in tuple ??? have to add second arg
    userRow = controllers.database.conn.fetch(userSearchQuery, ('None', userId))

    expires = str(int((datetime.datetime.now() + datetime.timedelta(days = accessTokenLife)).timestamp() * 1000 ))
    issuedAtRaw = datetime.datetime.now()
    issuedAt = str(int(issuedAtRaw.timestamp() * 1000 ))

    jwtAccessPayload = {
      'userId': userId,
      'iat': issuedAt,
      'exp': expires,
      'role': userRow[0][1],
      'username': userRow[0][0]
    }
    jwtAccess = scripts.utils.hashFunctions.generateJWT(scripts.utils.hashFunctions.generateJWTHeader(), jwtAccessPayload, config['forum-jwt-auth-token'])

    res = jsonify(scripts.utils.responses.buildBearerResp(jwtAccess, expires))
    res.headers.add('Access-Control-Allow-Credentials', 'true') 
    return scripts.utils.responses.build_actual_response(res), 201
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')