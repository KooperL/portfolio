import base64
import binascii
import datetime
from functools import wraps
import hashlib
import hmac
from lib2to3.pytree import Base
from tokenize import Number
import urllib.parse
import inspect
import random
import secrets
import json
import sys
import os
from dotenv import dotenv_values
config = dotenv_values('.env')
appDir = os.getcwd()

from flask import Flask, render_template, request, redirect, url_for, flash, make_response, session, jsonify
from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS, cross_origin
import sqlite3
from werkzeug.middleware.proxy_fix import ProxyFix
#export FLASK_ENV=development (or production I guess)
from jinja2 import Environment
environment = Environment()

# TODO: base64 helper and other code coverage for blog calls

import pymongo
from pymongo import MongoClient
from bson.json_util import dumps

import scripts.mrna_files.decode
import scripts.mrna_files.secondary
import scripts.mrna_files.seqalign
import scripts.mrna_files.randomGenerator
import scripts.property.draw
import scripts.utils.databaseUtils
import scripts.fuelscrape.newdrawfuel
import scripts.utils.rgb

#sys.path.insert(1, appDir + '/stocks/')
#import pattern_detect


class DatabaseManager(object):
  def __init__(self, db):
    self.conn = sqlite3.connect(db, check_same_thread=False)
    # refer to https://stackoverflow.com/questions/26629080/python-and-sqlite3-programmingerror-recursive-use-of-cursors-not-allowed
    # https://stackoverflow.com/questions/52212844/multithreading-with-flask
    self.conn.execute('pragma foreign_keys = on')
    self.conn.commit()
    self.cur = self.conn.cursor()
    # self.queue = []

  def query(self, query, vals):
    self.cur.execute(query, vals)
    self.conn.commit()
    return self.cur
  
  # def execute(self, query, vals):
  #   for i in self.queue:
  #     execute
  #   return 

  def __del__(self):
    self.conn.close()

conn = DatabaseManager(f'{appDir}/data/database.db')


def build_preflight_response():
  response = make_response()
  response.headers.add('Access-Control-Allow-Origin', config['ORIGIN'])
  response.headers.add('Access-Control-Allow-Headers', '*')
  response.headers.add('Access-Control-Allow-Methods', '*')
  return response

def build_actual_response(response):
  response.headers.add('Access-Control-Allow-Origin', config['ORIGIN'])
  return response

def build_unauthorized():
  kwargs = {
    'success': False,
    'error': 'Unauthorized'
  }
  res = jsonify(kwargs)
  return build_actual_response(res), 401

def build_not_found():
  kwargs = {
    'success': False,
    'error': 'Not found'
  }
  res = jsonify(kwargs)
  return build_actual_response(res), 404

def build_bad_req():
  kwargs = {
    'success': False,
    'error': 'Invalid syntax.'
  }
  res = jsonify(kwargs)
  return build_actual_response(res), 400

def buildBearerResp(jwt, expires=None):
  kwargs = {
    'success': True,
    'type': 'Bearer',
    'accessToken': jwt,
    'expires': expires
  }
  return kwargs

def build_unauthenticated():
  kwargs = {
    'success': False,
    'error': 'Incorrect username/password'
  }
  res = jsonify(kwargs)
  return build_actual_response(res), 403

def errorHandle(func):
  def wrapper(*args, **kwargs):
    try:
      return func(*args, **kwargs)
    except Exception as e:
      print(e)
      kwargs = {
        'success': False,
        'error': 'Deliberate error'
      }
      res = jsonify(kwargs)
      return build_actual_response(res)
    except:
      print('cause')
      kwargs = {
        'success': False,
        'error': 'Unknown error'
      }
      res = jsonify(kwargs)
      return build_actual_response(res)
  wrapper.__name__ = func.__name__
  return wrapper

def generateJWTHeader():
  kwargs = {
    'header': {
      'alg': 'SHA256',
      'typ': 'JWT'
    }
  }
  return kwargs

def trackBlogFunctionsCalled(blogUsername, session_id, fun):
  insertQuery = """INSERT INTO blog_user_trackingDB VALUES (
    ?, ?, ?, ?, ?
  );"""
  conn.query(insertQuery, (None, datetime.datetime.now(), blogUsername, session_id, fun))

def base64ToString(string):
  decodedBytes = base64.b64decode(string)
  decodedStr = str(decodedBytes, "utf-8")
  return decodedStr

def stringToBase64(string):
  return base64.b64encode(str(string).encode("utf-8", "strict")).decode("utf-8")

def generateHash(string, key):
  signature = hmac.new(
      binascii.unhexlify(key),
      string.encode(),
      hashlib.sha256,
    ).hexdigest()
  return signature

def generateJWT(header, payload, key, expires=None):
  jwtEncoded = f'{stringToBase64(json.dumps(header))}.{stringToBase64(json.dumps(payload))}'
  signature = generateHash(jwtEncoded, key)
  # if expires != None:
  #   expires = str(int((datetime.datetime.now() + datetime.timedelta(minutes = 1)).timestamp() * 1000 ))
  # issuedAtRaw = datetime.datetime.now()
  # issuedAt = str(int(issuedAtRaw.timestamp() * 1000 ))
  jwt = f'{jwtEncoded}.{stringToBase64(signature)}'
  return jwt

def blogAuthorize(jwt, key):
  jwt = jwt.split('.')
  jwtSignature = hmac.new(
    binascii.unhexlify(key),
    '.'.join(jwt[0:2]).encode(),
    hashlib.sha256,
  ).hexdigest()
  if stringToBase64(jwtSignature) == jwt[2]:
    jwtDecoded = [eval(base64ToString(jwt[0])), eval(base64ToString(jwt[1]))]
    # if jwtDecoded[1].has_key('exp'):
    if 'exp' in jwtDecoded[1]:
      # tokenExpires = datetime.fromtimestamp(int(jwtDecoded[1].get('exp'))/1000, tz=None)
      timestampNow = int(datetime.datetime.now().timestamp() * 1000)
      timestampToken = int(jwtDecoded[1].get('exp'))
      if timestampToken > timestampNow:
        return {
          'success': True,
          'payload': jwtDecoded[1]
        }
    else:
      return {
        'success': True,
        'payload': jwtDecoded[1]
      }
  return {'success': False}

def token_required(f):
  @wraps(f)
  def decorated(*args, **kwargs):
    # print(kwargs.get('id'))
    if request.method == 'OPTIONS':
      return build_preflight_response()
    print(request.get_json())
    auth_header = request.headers.get('Authorization')
    if auth_header is None or not auth_header.startswith('Bearer '):
      return build_unauthorized()
    bearerToken = auth_header.split(' ')[1]
    outcome = blogAuthorize(bearerToken, config['blog-jwt-auth-token'])
    if outcome.get('success') == False:
      return build_unauthorized()
    return f(outcome, *args, **kwargs)
  return decorated


app = Flask(__name__)
app.wsgi_app = ProxyFix(
  app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
# app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

username = urllib.parse.quote_plus(config['MONGO_USERNAME'])
password = urllib.parse.quote_plus(config['MONGO_PASSWORD'])
client = MongoClient('mongodb://%s:%s@localhost:%s/' % (username, password, config['MONGO_PORT']))
db = client['traffic_log']
traffic_data = db['data']


@app.route('/home', methods=['GET', 'OPTIONS'])
@errorHandle
def homeHome():
  if request.method == 'GET':
    kwargs = {
      'success': True,
      'data': [
        {
          'type': 'header',
          'data': [
            'Hi 👋 I\'m Kooper, welcome to my website.',
          ]
        },
        {
          'type': 'button',
          'text': '/projects',
          'data': [
            '/projects',
          ]
        },
        {
          'type': 'button',
          'text': '/contact',
          'data': [
            '/contact',
          ]
        },        {
          'type': 'button',
          'text': '/about',
          'data': [
            '/about',
          ]
        }
      ]
    }
    res = jsonify(kwargs)
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

@app.route('/contact', methods=['GET', 'POST', 'OPTIONS'])
@errorHandle
def contactHome():
  if request.method == 'GET':
    kwargs = {
      'success': True,
      'data': [
        {
          'type': 'emoji',
          'data': [
            '😵‍💫',
          ]
        },
        {
          'type': 'subheader',
          'data': [
            'Aw, snap! Something went wrong...',
          ]
        },
        {
          'type': 'body',
          'data': [
            'You should probably contact me to let me know you found this error. My preferred method of contact is LinkedIn:',
          ]
        },        {
          'type': 'button',
          'text': 'LinkedIn',
          'data': [
            'https://www.linkedin.com/in/kooper/',
          ]
        },
        {
          'type': 'body',
          'data': [
            'Alternatively, leave an anonymous message. If you\'re expecting a reply though, be sure to include your email too.',
          ]
        }
      ]
    }
    res = jsonify(kwargs)
    return build_actual_response(res)
  elif request.method == 'POST':
    data = request.get_json()
    # session_id = request.args.get('session_id')
    # message = request.args.get('message')
    # if not all([session_id, message]):
    if 'session_id' not in data and 'message' not in data:
      raise RuntimeError('Mandatory value(s) not provided')
    session_id = data.get('session_id')
    message = data.get('message')
    insertQuery = 'INSERT INTO contact_messagesDB VALUES (?, ?, ?, ?);'
    # conn.execute(insertQuery, (None, datetime.datetime.now(), session_id, message))
    # conn.commit()
    conn.query(insertQuery, (None, datetime.datetime.now(), session_id, message))
    # print(list(conn.execute(f'SELECT * FROM contactMessagesDB ORDER BY id DESC LIMIT 200')))
    kwargs = {
      'success': True,
    }
    res = jsonify(kwargs)
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

@app.route('/about', methods=['GET', 'OPTIONS'])
@errorHandle
def aboutHome():
  if request.method == 'GET':
    kwargs = {
      'success': True,
      'data': [
        {
          'type': 'header',
          'data': [
            'Hi 👋 I\'m Kooper, welcome to my website.',
          ]
        },
        {
          'type': 'subheader',
          'data': [
            'I update it constantly to demonstrate my comprehension of programming and computer science.',
            'If you\'re just here for a quick visit, you might be more interested in browsing some of my favourite projects.',
          ]
        },
        {
          'type': 'button',
          'text': '/projects',
          'data': [
            '/projects',
          ]
        },
        {
          'type': 'body',
          'data': [
            'Initially created in July 2020 during my Honours year, this started from scratch as a hobby, secondary only to my studies. As I learned more, it ate more of my free time and continued to evolve. ',
            'It is designed with functionality and design over speed and SEO. This was a deliberate trade off to demonstrate experience with many technologies. ',
            'This is the perfect place for me to apply the skills and techniques I learn both recreationally and professionally. ',
            'Above all, creating this website, and making projects for it has taught me two things: 1) Each component of a website stack/CS domain is deep enough to spend an entire career to perfect, and 2) I want to spend my career in the frontend. ',
            'This is my roadmap\'s destination and ultimately this webiste will reflect where I place on that roadmap. ',
          ]
        },
        {
          'type': 'body',
          'data': [
            'Here\'s some information on what is being used to serve this website to you:',
          ]
        },
        {
          'type': 'unorderedList',
          'data': [
            'Domain registration and namespace mapping through GoDaddy 📝',
            'Servers are deployed and hosted on a VPS 🖥️',
            'Version control and storage managed with Git/Github 📆',
            'SSL certification and other security through Cloudflare 🕵️',
            'Sqlite (SQL) and MongoDB (noSQL) as databases/backends 💽',
            'Flask HTTP → WSGI server as a middleware API 🤖',
            'Front end is written with React in Typescript 💄',
            'Stack served to you and all with NGINX Unit 🧠',
          ]
        }
      ]
    }
    res = jsonify(kwargs)
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

@app.route('/projects', methods=['GET', 'OPTIONS'])
@errorHandle
def projectsHome():
  if request.method == 'GET':
    kwargs = {
      'success': True,
      'data': [
        {
          'title': 'Games',
          'points': [
            {
              'address': '/tictactoe',
              'name': 'Tictactoe',
            },
            {
              'address': '/minesweeper',
              'name': 'Minesweeper',
            },
            {
              'address': '/jssimulator',
              'name': 'Javascript Programmer Simulator',
            }
          ]
        }, {
          'title': 'Data Storage and Analysis',
          'points': [
            {
              'address': '/fuelprices',
              'name': 'UL91 Fuel Price trends',
            },
            {
              'address': '/property',
              'name': 'Real estate data interface',
            }
        ],
        }, {
          'title': 'Bioinformatics',
          'points': [
            {
              'address': '/mrna',
              'name': 'DNA:mRNA decoder',
            },
            {
              'address': '/secondary',
              'name': 'Predict secondary protein structure',
            },
            {
              'address': '/seqalign',
              'name': 'Pairwise sequence alignment',
            },
            {
              'address': '/randombio',
              'name': 'Random sequence generator',
            }
          ],
        }, {
          'title': 'Repos',
          'points': [
            {
              'address': 'https://github.com/KooperL/portfolio',
              'name': 'This Website',
            },
            {
              'address': 'https://github.com/KooperL/trafficCounter',
              'name': 'AI Traffic Counter',
            },
            # {
            #   'address': 'https://github.com/KooperL/AI-player',
            #   'name': 'AI FPS Player',
            # },
            {
              'address': 'https://github.com/KooperL/tkinter3dengine',
              'name': 'Python/Tkinter 3d Engine',
            },
            # {
            #   'address': 'https://github.com/KooperL/CV-ping-pong-ball-tracker',
            #   'name': 'Computer Vision - Ping Pong ',
            # },
            {
              'address': 'https://github.com/KooperL/tkinterAstar',
              'name': 'A* Path finder py',
            }
          ]
        }
      ]
    }
    res = jsonify(kwargs)
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

@app.route('/capture', methods=['POST', 'OPTIONS'])
@errorHandle
def captureHome():
  if request.method == 'POST':
    # kwargs = {
    #   'request': {
    #     'remote_addr': request.remote_addr,
    #     'headers': dict(request.headers),
    #     'origin': request.origin,
    #     'host': request.host,
    #   },
    # }

    args = [
      None,
      datetime.datetime.now(),
      request.args.get('uuid'),
      request.args.get('canvas_hash'),
      request.args.get('platform'),
      request.args.get('browser'),
      request.args.get('version'),
      request.headers.get('User-Agent'),
      int(request.args.get('darkMode')),
      int(request.args.get('cookieEnabled')),
      # request.args.get('java'),
      # request.args.get('online'),
      int(request.args.get('actualHeight')),
      int(request.args.get('actualWidth')),
      int(request.args.get('pixelDepth')),
      int(request.args.get('innerHeight')),
      int(request.args.get('innerWidth')),
      int(request.args.get('outerHeight')),
      int(request.args.get('outerWidth')),
      request.remote_addr
    ]

    if not all(args[1:]):
      print(args[1:])
      raise RuntimeError('Mandatory value(s) not provided')

    insertFingerprintQuery = """INSERT INTO fingerprintDB VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    );"""
    # conn.execute(insertFingerprintQuery, args)
    # conn.commit()
    conn.query(insertFingerprintQuery, args)

    # print(list(conn.execute(f'SELECT * FROM fingerprintDB ORDER BY id DESC LIMIT 200')))
    res = jsonify({'success': True})
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

@app.route('/blog/register', methods=['POST', 'OPTIONS'])
@errorHandle
def blogRegisterHome():
  if request.method == 'POST':
    data = request.get_json()
    if 'data' not in data and not 'session_id' in data:
      return build_bad_req()
    session_id = data.get('session_id')
    data = data.get('data')
    if 'blog_username' not in data and 'blog_password' not in data:
      return build_bad_req()

    trackBlogFunctionsCalled(data.get('blog_username'), session_id, inspect.stack()[0][3])

    # check if valid username
    # check if lower() exists


    salt = secrets.token_hex(int(config['blog-register-salt-length']))
    blog_password_hash = generateHash((data.get('blog_password') + salt), config['blog-register-hash-key'])

    insertBlogUserQuery = 'INSERT INTO blog_usersDB VALUES (?, ?, ?, ?, ?, ?);'
    conn.query(insertBlogUserQuery, (None, datetime.datetime.now(), data.get('blog_username'), blog_password_hash, salt, 1))
    
    kwargs = {
      'success': True,
    }
    res = jsonify(kwargs)
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

@app.route('/blog/login', methods=['POST', 'OPTIONS'])
@errorHandle
def blogLoginHome():
  if request.method == 'POST':
    accessTokenLife = 999 # Minutes
    refreshTokenLife = 999 # Days

    auth_header = request.headers.get('Authorization')
    if auth_header is None or not auth_header.startswith('Basic '):
      return build_unauthorized()
    decodedStr = base64ToString(auth_header.split(' ')[1]).split(':')

    data = request.get_json()
    if 'session_id' not in data:
      return build_bad_req()
    session_id = data.get('session_id')

    trackBlogFunctionsCalled(decodedStr[0], session_id, inspect.stack()[0][3])

    userSearchQuery = 'SELECT id, blog_password_hash, blog_password_salt, role_id FROM blog_usersDB where ? = "None" and blog_username = ?'    # expanding string when only one item in tuple ??? have to add second arg
    userRow = conn.query(userSearchQuery, ('None', decodedStr[0])).fetchall()

    if len(userRow) != 1:
      return build_unauthenticated()

    userInfo = {
      'id': userRow[0][0],
      'passwordHash': userRow[0][1],
      'passwordSalt': userRow[0][2],
      'role': userRow[0][3]
    }

    blog_password_hash = generateHash((decodedStr[1] + userInfo.get('passwordSalt')), config['blog-register-hash-key'])

    if userInfo.get('passwordHash') != blog_password_hash:
      return build_unauthenticated()

    issuedAtRaw = datetime.datetime.now()
    expires = str(int((issuedAtRaw + datetime.timedelta(minutes = accessTokenLife)).timestamp() * 1000 ))
    refreshExpires = issuedAtRaw + datetime.timedelta(days = refreshTokenLife)
    issuedAt = str(int(issuedAtRaw.timestamp() * 1000 ))

    jwtAccessPayload = {
      'username': userInfo.get('id'),
      'iat': issuedAt,
      'role': userInfo.get('role'),
      'exp': expires
    }
    jwtRefreshPayload = {
      'username': userInfo.get('id'),
      'iat': issuedAt
    }

    jwtAccess = generateJWT(generateJWTHeader(), jwtAccessPayload, config['blog-jwt-auth-token'])
    jwtRefresh = generateJWT(generateJWTHeader(), jwtRefreshPayload, config['blog-jwt-refresh-token'])

    userRefreshTokenDelete = 'DELETE from blog_refresh_tokensDB where ? = "None" and blog_user_id = ?;'
    conn.query(userRefreshTokenDelete, ('None', userInfo.get('id')))

    userRefreshTokenInsert = 'INSERT INTO blog_refresh_tokensDB VALUES (?, ?, ?, ?);'
    conn.query(userRefreshTokenInsert, (None, issuedAtRaw, userInfo.get('id'), jwtRefresh))

    res = jsonify(buildBearerResp(jwtAccess, expires))
    res.headers.add('withCredentials', 'true')

    res.set_cookie('refresh_token', value=jwtRefresh, expires=refreshExpires, samesite='none') # domain=config['ORIGIN'], secure, httponly=True, 
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

@app.route('/blog/post', methods=['POST', 'OPTIONS'])
@errorHandle
@token_required
def blogPostCreateHome(authPayload):
  if request.method == 'POST':
    data = request.get_json()
    if 'data' not in data and not 'session_id' in data:
      return build_bad_req()
    session_id = data.get('session_id')
    user_id = authPayload.get('payload').get('username')
    role = authPayload.get('payload').get('role')
    trackBlogFunctionsCalled(user_id, session_id, inspect.stack()[0][3])

    data = data.get('data')
    if 'blog_title' not in data and 'blog_body' not in data:
      return build_bad_req()

    blog_title = data.get('blog_title')
    blog_body = data.get('blog_body')

    validatePermsQuery = 'SELECT canPost from blog_roleDB where ? = "None" and id = ?;'
    canPost = conn.query(validatePermsQuery, ('None', role)).fetchall()
    print(authPayload)
    if canPost[0][0] != 1:
      return build_unauthorized()

    publishBlogQuery = 'INSERT INTO blog_postsDB VALUES (?, ?, ?, ?, ?, ?, ?, ?);'
    conn.query(publishBlogQuery, (None, datetime.datetime.now(), user_id, blog_title, 1, blog_body, 1, 0))
    
    publishedBlogIdQuery = 'SELECT id from blog_postsDB where blog_user_id = ? and title = ? and  body = ?;'
    publishedBlogId = conn.query(publishedBlogIdQuery, (user_id, blog_title, blog_body)).fetchall()
    kwargs = {
      'success': True,
      'data': {
        'blogPostId': publishedBlogId[0]
      }
    }
    res = jsonify(kwargs)
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

@app.route('/blog/post/<int:id>', methods=['POST', 'OPTIONS'])   # DEL, GET was,'t working because axios wouldn't set content length
@errorHandle
@token_required
def blogPostViewHome(authPayload, *args, **kwargs):
  if request.method == 'POST':
    id = int(kwargs.get('id'))
    data = request.get_json()
    print(request)
    user_id = authPayload.get('payload').get('username')
    role = authPayload.get('payload').get('role')
    if 'session_id' not in data:
      return build_bad_req()
    session_id = data.get('session_id')
    trackBlogFunctionsCalled(user_id, session_id, inspect.stack()[0][3])
    
    pullBlogQuery = 'SELECT * from blog_postsDB where id = ? and (visible = 1 or blog_user_id = ? or ? = "True");'
    postRaw = conn.query(pullBlogQuery, (id, user_id, (role==999))).fetchall()

    if len(postRaw) != 1:
      return build_not_found()

    post = {
      'id' : postRaw[0][0],
      'date' : postRaw[0][1],
      'author_id': postRaw[0][2],
      'title': postRaw[0][3],
      'category_id': postRaw[0][4],
      'body': postRaw[0][5],
      'visible': postRaw[0][6],
    }

    # if visible != 1 or role == 999:
    #   build_not_found()


    addBlogViewQuery = 'INSERT INTO blog_post_viewsDB VALUES (?, ?, ?, ?);'
    conn.query(addBlogViewQuery, (None, datetime.datetime.now(), user_id, id))

    # Distinct??    
    pullBlogViewsQuery = 'SELECT count(*) from blog_post_viewsDB where ? = "None" and blog_post_id = ?;'
    postViewsRaw = conn.query(pullBlogViewsQuery, ('None', id)).fetchall()[0][0]

    post = {
      **post,
      'views': postViewsRaw,
    }

    kwargs = {
      'success': True,
      'data': post,
    }
    res = jsonify(kwargs)
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')



@app.route('/blog/refresh', methods=['POST', 'OPTIONS'])
@errorHandle
def blogRefreshHome():
  if request.method == 'POST':
    refresh_token = request.cookies.get('refresh_token')
    print('----------------')
    print(request.cookies)
    print('----------------')
    if not refresh_token:
      kwargs = {
        'success': False
      }
      res = jsonify(kwargs)
      return build_actual_response(res), 204
    refreshTokenSearchQuery = 'SELECT count(*) FROM blog_refresh_tokensDB where ? = "None" and blog_refresh_token = ?'    # expanding string when only one item in tuple ??? have to add second arg
    # tokenRows = conn.execute(refreshTokenSearchQuery, ('None', refresh_token)).fetchall()
    tokenRows = conn.query(refreshTokenSearchQuery, ('None', refresh_token)).fetchall()

    if len(tokenRows) != 1:
      return build_unauthorized()

    outcome = blogAuthorize(refresh_token, config['blog-jwt-refresh-token'])

    if not outcome.get('success'):
      return build_unauthorized()

    expires = str(int((datetime.datetime.now() + datetime.timedelta(minutes = 1)).timestamp() * 1000 ))
    issuedAtRaw = datetime.datetime.now()
    issuedAt = str(int(issuedAtRaw.timestamp() * 1000 ))

    jwtAccessPayload = {
      'username': outcome.get('payload').get('username'),
      'iat': issuedAt,
      'exp': expires
    }
    jwtAccess = generateJWT(generateJWTHeader(), jwtAccessPayload, config['blog-jwt-auth-token'])

    res = jsonify(buildBearerResp(jwtAccess, expires))
    return build_actual_response(res), 201
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')




@app.route('/monitor', methods=['POST', 'OPTIONS'])
@errorHandle
def monitorHome():
  if request.method == 'POST':

    uuid = request.args.get('uuid')
    session_id = request.args.get('session_id')
    page = request.args.get('page')
    prevPage = request.args.get('prevPage')
    if not all([uuid, page, session_id]):
      raise RuntimeError('Mandatory value(s) not provided')

    insertMonitorQuery = 'INSERT INTO monitorDB VALUES (?, ?, ?, ?, ?);'
    # conn.execute(insertMonitorQuery, (None, datetime.datetime.now(), uuid, session_id, page))
    # conn.commit()
    conn.query(insertMonitorQuery, (None, datetime.datetime.now(), uuid, session_id, page))


    if prevPage:
      insertQuery = 'INSERT INTO route_trackDB VALUES (?, ?, ?, ?, ?);'
      # conn.execute(insertQuery, (None, datetime.datetime.now(), session_id, prevPage, page))
      conn.query(insertQuery, (None, datetime.datetime.now(), session_id, prevPage, page))

    # conn.commit()

    kwargs = {
      # 'request': {
      #   'path': request.path,
      #   'method': request.method,
      #   'root_url': request.root_url,
      #   'data': {
      #     'args': request.args,
      #     'form': (request.form),
      #     'json': (dict(request.get_json()) if request.is_json else {}),
      #     'data': (request.data if request.data else '')
      #   },
      # },
      # 'inspect':  inspect.stack()[0][3],
      # 'href': request.args.get('href')
      'success': True,
    }
    res = jsonify(kwargs)
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

@app.route('/analytics', methods=['GET', 'OPTIONS'])
@errorHandle
def analyticsHome():
  if request.method == 'GET':
    kwargs = {
      'success': True,
      'data': {
        'platformVisits': {
          'Linux': 3,
          'Windows': 5,
          'OSX': 1
        },
        'browserVisits': {
          'Firefox': 10,
          'Chrome': 7,
          'Edge': 3
        },
        'uniqueVisits': 7,
        'allVisits': 20,

      }
    }
    res = jsonify(kwargs)
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

@app.route('/heatmap', methods=['GET', 'OPTIONS'])
@errorHandle
def heatmapHome():
  if request.method == 'GET':
    arr = []
    allSubs = scripts.utils.databaseUtils.call()
    priceMin = 200000
    priceMax = 2000000

    for sub in allSubs:
      try:
        price = scripts.utils.databaseUtils.call({'suburb': sub['suburb']}, 'price')
        price = price[0]['pricedata']['mean_means']
      except:
        continue
      mean = priceMin*(price<priceMin) + priceMax*(price>priceMax) + (price>priceMin)*(price<priceMax)*price
      #col = ((mean-priceMin)/(priceMax-priceMin))*255
      col = scripts.utils.rgb.rgb(priceMin, priceMax, mean)
      bounds = sub['bounds']
      boundsCorrected = map(lambda x: {'lat': x[1], 'lng': x[0]}, bounds)
      arr.append({'suburb': sub['suburb'], 'price': price, 'colour': ''.join([hex(c)[-2:].replace('x','0') for c in col]), 'bounds': list(boundsCorrected)})
      kwargs={'data':arr}
      res = jsonify(kwargs)
      return build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')
    
# @app.route('/stocks/', methods=['GET', 'POST'])
# def stocksHome():
#   kwargs = {
#       'title':'Stock page',
#       'heading':'Stock page',
#       'candlestick_patterns': 'pattern_detect.patterns_list()',
#       'df':'pattern_detect.data()',
#       }
#   return render_template('stocks.html', **kwargs)
#   '''
#   if request.method == 'POST':
#     pattern = request.form['pattern']
#     pattern_function = getattr(talib, pattern)
#     results = pattern_function(df['Open'], df['High'], df['Low'], df['Close'])
#   else:
#     pattern = None
# '''

@app.route('/fuelprices', methods=['GET', 'OPTIONS'])
@errorHandle
def fuelpricesHome():
  if request.method == 'GET':
    rows = list(conn.query('SELECT * FROM fuelpricesDB where ? = "None" ORDER BY id DESC LIMIT ?', ('None', 200)))[::-1]

    dic = {'wholesale': [], 'min': [], 'max': [], 'average': [], }
    for key in rows:
      date = datetime.datetime.strptime(key[1], '%Y-%m-%d %H:%M:%S.%f')#.timestamp()
      dic['wholesale'].append({'x': date, 'y': key[5]})
      dic['min'].append({'x': date, 'y': key[2]})
      dic['max'].append({'x': date, 'y': key[3]})
      dic['average'].append({'x': date, 'y': key[4]})
    kwargs = {
      'success': True,
      'data': {
        'fuelprices': dic,
        'stats': scripts.fuelscrape.newdrawfuel.table()
      }
    }
    res = jsonify(kwargs)
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
      return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

@app.route('/mrna', methods=['GET', 'OPTIONS'])
@errorHandle
def mrnaHome():
  if request.method == 'GET':
    if not request.args.get('dna_field_id'):
      raise RuntimeError('Mandatory value not provided')
    dna_field = request.args.get('dna_field_id')
    dna = dna_field.replace('%20','').replace('\n', '').replace('\r', '').lower()
    count = scripts.mrna_files.decode.simple_count(dna)
    mrna = scripts.mrna_files.decode.mrna_complement(dna)
    aa_p = scripts.mrna_files.decode.amino_acids(mrna)
    if sum(count)<13:
      tm = 4*(count[0]+count[1])+4*(count[2]+count[3])
    else:
      tm = 64.9+41*(count[0]+count[1]-16.4)/sum(count)
    kwargs = {
      'success': True,
      'data': {
        'dna_field': dna,
        'mrna_field': mrna,
        'rdna_field': scripts.mrna_files.decode.reverse_complement(dna),
        'simplecount': count,
        'gccontent': scripts.mrna_files.decode.gc_content(dna),
        'aa': aa_p,
        'aa_s': scripts.mrna_files.decode.aa_single_from_partial(aa_p),
        'molweight': scripts.mrna_files.decode.mol_weight(aa_p),
        'tm': tm
      }
    }
      # return render_template('mrna.html', **kwargs)
    res = jsonify(kwargs)
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
      return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')


@app.route('/secondary', methods=['GET', 'OPTIONS'])
@errorHandle
def secondaryHome():
  # log(request.remote_addr, inspect.stack()[0][3]).
  if request.method == 'GET':
    aas = request.args.get('aa_field_id')
    aaformat = request.args.get('aaf_field_id')
    #threshold = request.form['detectthreshold']
    threshold = request.args.get('detectthreshold')
    avg = request.args.get('leniency')
    if not all([aas, aaformat, threshold, avg]):
      raise RuntimeError('Mandatory value(s) not provided')
    output = scripts.mrna_files.secondary.secondary_predict(aas.lower(), aaformat, threshold, avg)
    kwargs = {
    'success': True,
    'data': {
      'aa_field': aas,
      'ahp_field': output[0],
      'ahm_field': output[1],
      'bsp_field': output[2],
      'bsm_field': output[3],
      'pred_str': output[4],
      'ahl_field': output[5],
      'bsl_field': output[6],
      }
    }
    res = jsonify(kwargs)
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
      return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

# environment.tests['isvalidsuburb'] = isvalidsuburb

@app.route('/property', methods=['GET', 'OPTIONS'])
@errorHandle
def propertyHome():
  if request.method == 'GET':
    stats = scripts.property.draw.state_stats()
    ranked = scripts.property.draw.highest_des()
    kwargs = {
      'success': True,
      'data': {
        'stats': stats,
        'highest': ranked
      }
    }
    res = jsonify(kwargs)
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
      return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

@app.route('/property/search', methods=['GET', 'OPTIONS'])
@errorHandle
def propertySearchHome():
  if request.method == 'GET':
    if not request.args.get('prop_suburb'):
      raise RuntimeError('Mandatory value not provided')
    suburb = request.args.get('prop_suburb').lower().replace('%20','_')
    stats = scripts.property.draw.query_sub(suburb)
    data = scripts.utils.databaseUtils.call({'suburb': suburb}, 'price')[0]
    del data['_id']
    kwargs = {
      'success': True,
      'data': {
        'suburb': suburb,
        'stats': stats,
        'details': data
      }
    }
    res = jsonify(kwargs)
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
      return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

# @app.route('/property/files', methods=['GET', 'OPTIONS'])
# def propfilesHome():
# #   return render_template('prop_files.html',files = list_files(appDir + '/property/prop_data/'))

@app.route('/seqalign', methods=['GET', 'OPTIONS'])
@errorHandle
def seqalignHome():
  if request.method == 'GET':
    pull = [
      request.args.get('sampletxt'),
      request.args.get('referencetxt'),
      request.args.get('identical'),
      request.args.get('mismatch'),
      request.args.get('gaps'),
      request.args.get('extgaps'),
    ]
    if not all(pull):
      raise RuntimeError('Mandatory value(s) not provided')
    results = scripts.mrna_files.seqalign.pairwise_align(*pull)
    draw_res = scripts.mrna_files.seqalign.drawseqalign(results)
    kwargs = {
      'success': True,
      'data': {
        'results':results,
        'draw_res':draw_res,
      }
    }
    res = jsonify(kwargs)
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
      return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

@app.route('/randombio', methods=['GET', 'OPTIONS'])
@errorHandle
def randomBioHome():
  def validate(e):
    if not all(pull):
      raise RuntimeError('Mandatory value(s) not provided')

  if request.method == 'GET':
    pull = [
      int(request.args.get('type')),
      int(request.args.get('length'))
    ]

    results = None
    if pull[0] == 1:
      results = scripts.mrna_files.randomGenerator.randomDNA(pull[1])
    elif pull[0] == 2:
      results = scripts.mrna_files.randomGenerator.randomRNA(pull[1])
    elif pull[0] == 3:
      single = int(request.args.get('single'))
      validate(single)
      results = scripts.mrna_files.randomGenerator.randomProteins(pull[1], single)
    else:
      raise RuntimeError('Invalid value(s) provided')
    kwargs = {
      'success': True,
      'data': {
        'results':results,
      }
    }
    res = jsonify(kwargs)
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
      return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

if __name__ == '__main__':
  if config['ENV'] == 'development':
    app.run(host='0.0.0.0', port=config['DEV_PORT'], debug=True)
  elif config['ENV'] == 'production':
    app.run(host='0.0.0.0', port=config['PROD_PORT'], debug=False)