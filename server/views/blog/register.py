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


register = Blueprint('register', __name__)

@register.route(f'/{scripts.utils.structs.blogPath}/register', methods=['POST', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
def blogRegisterHome():
  if request.method == 'POST':
    data = request.get_json()
    if 'data' not in data and not 'session_id' in data:
      return scripts.utils.responses.build_bad_req()
    session_id = data.get('session_id')
    data = data.get('data')
    if 'blog_username' not in data and 'blog_password' not in data:
      return scripts.utils.responses.build_bad_req()

    trackBlogFunctionsCalled(data.get('blog_username'), session_id, inspect.stack()[0][3])

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
    blogUserExists = conn.fetch(blogUserExistsQuery, ('None', data.get('blog_username')))[0][0]
    print(blogUserExists)
    if blogUserExists != 0 or len(data.get('blog_username')) < 3 or len(data.get('blog_username')) > 15:
      return scripts.utils.responses.build_bad_req()

    salt = secrets.token_hex(int(config['blog-register-salt-length']))
    blog_password_hash = scripts.utils.hashFunctions.generateHash((data.get('blog_password') + salt), config['blog-register-hash-key'])

    insertBlogUserQuery = 'INSERT INTO blog_usersDB VALUES (?, ?, ?, ?, ?, ?, ?, ?);'
    conn.insert(insertBlogUserQuery, (None, datetime.datetime.now(), data.get('blog_username').lower(), blog_password_hash, salt, 1, 1, 1))
    
    kwargs = {
      'success': True,
    }
    res = jsonify(kwargs)
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')