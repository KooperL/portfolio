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


register = Blueprint('register', __name__)

@register.route(f'/{scripts.utils.structs.blogPath}/register', methods=['POST', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.rateLimit
def blogRegisterHome():
  if request.method == 'POST':
    data = request.get_json()
    if 'data' not in data and not 'session_id' in data:
      return scripts.utils.responses.build_bad_req()
    session_id = data.get('session_id')
    
    # data = data.get('data')
    # if 'blog_username' not in data and 'blog_password' not in data:
    #   return scripts.utils.responses.build_bad_req()

    # username = data.get('blog_username')
    # password = data.get('blog_password')



    auth_header = request.headers.get('Authorization')
    if auth_header is None or not auth_header.startswith('Basic '):
      return scripts.utils.responses.build_unauthorized()
    decodedStr = scripts.utils.hashFunctions.base64ToString(auth_header.split(' ')[1]).split(':')
    username = decodedStr[0]
    password = decodedStr[1]


    scripts.utils.blogFuncs.trackBlogFunctionsCalled(username, session_id, inspect.stack()[0][3])

    # check if valid username
    # check if lower() exists
    blogUserExistsQuery = '''
      SELECT 
        count(*)
      from blog_usersDB
      where
        ? = "None" and
        lower(blog_username) = lower(?)
      limit 5;
    '''
    blogUserExists = controllers.database.conn.fetch(blogUserExistsQuery, ('None', username))[0][0]
    if blogUserExists != 0 or len(username) < 3 or len(username) > 15:
      return scripts.utils.responses.build_bad_req()

    salt = secrets.token_hex(int(config['blog-register-salt-length']))

    # blog_password_hash = scripts.utils.hashFunctions.generateHash((data.get('blog_password') + salt), config['blog-register-hash-key'])
    blog_password_hash = scripts.utils.hashFunctions.pbkdf2(bytes(password, 'UTF-8'), bytes(salt, 'UTF-8'))

    insertBlogUserQuery = 'INSERT INTO blog_usersDB VALUES (?, ?, ?, ?, ?, ?, ?, ?);'
    controllers.database.conn.insert(insertBlogUserQuery, (None, datetime.datetime.now(), username.lower(), blog_password_hash, salt, 1, 1, 1))
    
    kwargs = {
      'success': True,
    }
    res = jsonify(kwargs)
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')