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

login = Blueprint('login', __name__)

@login.route(f'/{scripts.utils.structs.blogPath}/login', methods=['POST', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
def blogLoginHome():
  if request.method == 'POST':
    accessTokenLife = int(config['blog-access-token-life']) # Minutes
    refreshTokenLife = int(config['blog-refresh-token-life']) # Days

    auth_header = request.headers.get('Authorization')
    if auth_header is None or not auth_header.startswith('Basic '):
      return scripts.utils.responses.build_unauthorized()
    decodedStr = scripts.utils.hashFunctions.base64ToString(auth_header.split(' ')[1]).split(':')

    data = request.get_json()
    if 'session_id' not in data:
      return scripts.utils.responses.build_bad_req()
    session_id = data.get('session_id')

    trackBlogFunctionsCalled(decodedStr[0], session_id, inspect.stack()[0][3])

    userSearchQuery = 'SELECT id, blog_password_hash, blog_password_salt, role_id FROM blog_usersDB where ? = "None" and blog_username = ?'    # expanding string when only one item in tuple ??? have to add second arg
    userRow = conn.fetch(userSearchQuery, ('None', decodedStr[0].lower()))
    print(userRow)

    if len(userRow) != 1:
      return scripts.utils.responses.build_unauthenticated()

    userInfo = {
      'id': userRow[0][0],
      'passwordHash': userRow[0][1],
      'passwordSalt': userRow[0][2],
      'role': userRow[0][3],
      'username': decodedStr[0]
    }

    blog_password_hash = scripts.utils.hashFunctions.generateHash((decodedStr[1] + userInfo.get('passwordSalt')), config['blog-register-hash-key'])
    if userInfo.get('passwordHash') != blog_password_hash:
      return scripts.utils.responses.build_unauthenticated()

    issuedAtRaw = datetime.datetime.now()
    expires = str(int((issuedAtRaw + datetime.timedelta(minutes = accessTokenLife)).timestamp() * 1000 ))
    refreshExpires = issuedAtRaw + datetime.timedelta(days = refreshTokenLife)
    issuedAt = str(int(issuedAtRaw.timestamp() * 1000 ))

    jwtAccessPayload = {
      'userId': userInfo.get('id'),
      'iat': issuedAt,
      'role': userInfo.get('role'),
      'username': userInfo.get('username'),
      'exp': expires
    }
    jwtRefreshPayload = {
      'userId': userInfo.get('id'),
      'iat': issuedAt
    }

    jwtAccess = scripts.utils.hashFunctions.generateJWT(scripts.utils.hashFunctions.generateJWTHeader(), jwtAccessPayload, config['blog-jwt-auth-token'])
    jwtRefresh = scripts.utils.hashFunctions.generateJWT(scripts.utils.hashFunctions.generateJWTHeader(), jwtRefreshPayload, config['blog-jwt-refresh-token'])

    userRefreshTokenDelete = 'DELETE from blog_refresh_tokensDB where ? = "None" and blog_user_id = ?;'
    conn.fetch(userRefreshTokenDelete, ('None', userInfo.get('id')))

    userRefreshTokenInsert = 'INSERT INTO blog_refresh_tokensDB VALUES (?, ?, ?, ?);'
    conn.fetch(userRefreshTokenInsert, (None, issuedAtRaw, userInfo.get('id'), jwtRefresh))

    res = jsonify(scripts.utils.responses.buildBearerResp(jwtAccess, expires))
    res.set_cookie('refresh_token', value=jwtRefresh, expires=refreshExpires, httponly=True) # domain=config['ORIGIN'], samesite='None', secure=True, 
    res.headers.add('Access-Control-Allow-Credentials', 'true') 
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')