import base64
import binascii
import datetime
from functools import wraps
import hashlib
import hmac
from lib2to3.pytree import Base
from nis import cat
from tokenize import Number
from threading import Lock
from typing import final
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
app = Flask(__name__)

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

blogPath = 'blog'
projectsPath = 'projects'
lock = Lock()

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
    # lock.acquire(True)
    self.cur.execute(query, vals)
    self.conn.commit()
    # lock.release()
    return self.cur
  
  def insert(self, query, val):
    lock.acquire(True)
    self.query(query, val)
    lock.release()

  def fetch(self, query, val):
    lock.acquire(True)
    res = self.query(query, val).fetchall()
    lock.release()
    return res

  # def execute(self, query, vals):
  #   for i in self.queue:
  #     execute
  #   return 

  def __del__(self):
    self.conn.close()

conn = DatabaseManager(f'{appDir}/data/database.db')


# Use cache decorator to prevent db fetches
# cache = Cache(app)
# @cache.cached(timeout=60)

@app.route('/')
def build_preflight_response():
  response = make_response()
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  response.headers.add('Access-Control-Allow-Origin', config['ORIGIN'])
  response.headers.add('Access-Control-Allow-Headers', ','.join([str(x) for x in [
    'Access-Control-Allow-Credentials',
    'Access-Control-Allow-Method',
    'Access-Control-Allow-Headers',
    'authorization',
    'Origin',
    'Accept',
    'X-Requested-With',
    'Content-Type',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
    'access-control-request-credentials',
    'cachecontrol'
  ]]))
  # response.setHeader("Access-Control-Allow-Headers", "cacheControl, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  # response.headers.add('Access-Control-Allow-Headers', '*')
  response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')  
  # response.headers.add('withCredentials', 'true')
  return response

def build_actual_response(response):
     # setperate response for refresh/login??
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
      return build_actual_response(res), 500
    except:
      print('cause')
      kwargs = {
        'success': False,
        'error': 'Unknown error'
      }
      res = jsonify(kwargs)
      return build_actual_response(res), 500
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

def trackBlogFunctionsCalled(blogUsername, session_id, funct):
  insertQuery = """INSERT INTO blog_user_trackingDB VALUES (
    ?, ?, ?, ?, ?
  );"""
  conn.insert(insertQuery, (None, datetime.datetime.now(), blogUsername, session_id, funct))

def base64ToString(string):
  decodedBytes = base64.b64decode(string)
  decodedStr = str(decodedBytes, "utf-8")
  print(decodedStr)
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


# TODO: See pbkdf2_sha256 or Argon2
# def generateSecureHash(string, key):
#   timeout = 500_000
#   signature = hashlib.pbkdf2_hmac(
#     'sha256',
#     string.encode,
#     b'bad salt'*2, # No way to set key?
#     timeout)
#   return signature

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
    print(jwtDecoded)
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
        },
        {
          'type': 'button',
          'text': '/about',
          'data': [
            '/about',
          ]
        },
        {
          'type': 'button',
          'text': '/blog',
          'data': [
            '/blog',
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
        },
        {
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
    conn.insert(insertQuery, (None, datetime.datetime.now(), session_id, message))
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
    dataNew = [
      {
        "data": [
          "React apps"
        ],
        "type": "subheader"
      },
      {
        "data": [
          f"/{projectsPath}/tictactoe"
        ],
        "text": "Tictactoe",
        "type": "button"
      },
      {
        "data": [
          f"/{projectsPath}/minesweeper"
        ],
        "text": "Minesweeper",
        "type": "button"
      },
      {
        "data": [
          f"/{projectsPath}/jssimulator"
        ],
        "text": "Front-end dev simulator",
        "type": "button"
      },
      {
        "data": [
          "Data Storage and Analysis"
        ],
        "type": "subheader"
      },
      {
        "data": [
          f"/{projectsPath}/fuelprices"
        ],
        "text": "UL91 Fuel Price trends",
        "type": "button"
      },
      {
        "data": [
          f"/{projectsPath}/property"
        ],
        "text": "Real estate data interface",
        "type": "button"
      },
      {
        "data": [
          "Bioinformatics"
        ],
        "type": "subheader"
      },
      {
        "data": [
          f"/{projectsPath}/mrna"
        ],
        "text": "DNA:mRNA decoder",
        "type": "button"
      },
      {
        "data": [
          f"/{projectsPath}/secondary"
        ],
        "text": "Protein 2° Structure",
        "type": "button"
      },
      {
        "data": [
          f"/{projectsPath}/seqalign"
        ],
        "text": "Pairwise sequence alignment",
        "type": "button"
      },
      {
        "data": [
          f"/{projectsPath}/randombio"
        ],
        "text": "DNA sequence generator",
        "type": "button"
      },
      {
        "data": [
          "Repos"
        ],
        "type": "subheader"
      },
      {
        "data": [
          "https://github.com/KooperL/portfolio"
        ],
        "text": "This Website",
        "type": "button"
      },
      {
        "data": [
          "https://github.com/KooperL/trafficCounter"
        ],
        "text": "AI Traffic Counter",
        "type": "button"
      },
      {
        "data": [
          "https://github.com/KooperL/tkinter3dengine"
        ],
        "text": "Python/Tkinter 3d Engine",
        "type": "button"
      },
      {
        "data": [
          "https://github.com/KooperL/tkinterAstar"
        ],
        "text": "A* Path finder py",
        "type": "button"
      }
    ]
    kwargs = {
      'success': True,
      'data': dataNew
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
    conn.insert(insertFingerprintQuery, args)

    # print(list(conn.execute(f'SELECT * FROM fingerprintDB ORDER BY id DESC LIMIT 200')))
    res = jsonify({'success': True})
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

@app.route(f'/{blogPath}/register', methods=['POST', 'OPTIONS'])
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
    blogUserExistsQuery = '''
      SELECT 
        count(*)
      from blog_usersDB
      where
        ? = "None" and
        lower(blog_username) = lower(?)
      limit 5;
    '''
    blogUserExists = conn.fetch(blogUserExistsQuery, ('None', data.get('blog_username')))
    if len(blogUserExists) or len(data.get('blog_username')) < 5 or len(data.get('blog_username')) > 15:
      return build_bad_req()

    salt = secrets.token_hex(int(config['blog-register-salt-length']))
    blog_password_hash = generateHash((data.get('blog_password') + salt), config['blog-register-hash-key'])

    insertBlogUserQuery = 'INSERT INTO blog_usersDB VALUES (?, ?, ?, ?, ?, ?, ?, ?);'
    conn.insert(insertBlogUserQuery, (None, datetime.datetime.now(), data.get('blog_username').lower(), blog_password_hash, salt, 1, 1, 1))
    
    kwargs = {
      'success': True,
    }
    res = jsonify(kwargs)
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

@app.route(f'/{blogPath}/login', methods=['POST', 'OPTIONS'])
@errorHandle
def blogLoginHome():
  if request.method == 'POST':
    accessTokenLife = int(config['blog-access-token-life']) # Minutes
    refreshTokenLife = int(config['blog-refresh-token-life']) # Days

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
    userRow = conn.fetch(userSearchQuery, ('None', decodedStr[0].lower()))
    print(userRow)

    if len(userRow) != 1:
      return build_unauthenticated()

    userInfo = {
      'id': userRow[0][0],
      'passwordHash': userRow[0][1],
      'passwordSalt': userRow[0][2],
      'role': userRow[0][3],
      'username': decodedStr[0]
    }

    blog_password_hash = generateHash((decodedStr[1] + userInfo.get('passwordSalt')), config['blog-register-hash-key'])
    if userInfo.get('passwordHash') != blog_password_hash:
      return build_unauthenticated()

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

    jwtAccess = generateJWT(generateJWTHeader(), jwtAccessPayload, config['blog-jwt-auth-token'])
    jwtRefresh = generateJWT(generateJWTHeader(), jwtRefreshPayload, config['blog-jwt-refresh-token'])

    userRefreshTokenDelete = 'DELETE from blog_refresh_tokensDB where ? = "None" and blog_user_id = ?;'
    conn.fetch(userRefreshTokenDelete, ('None', userInfo.get('id')))

    userRefreshTokenInsert = 'INSERT INTO blog_refresh_tokensDB VALUES (?, ?, ?, ?);'
    conn.fetch(userRefreshTokenInsert, (None, issuedAtRaw, userInfo.get('id'), jwtRefresh))

    res = jsonify(buildBearerResp(jwtAccess, expires))
    res.set_cookie('refresh_token', value=jwtRefresh, expires=refreshExpires, httponly=True) # domain=config['ORIGIN'], samesite='None', secure=True, 
    res.headers.add('Access-Control-Allow-Credentials', 'true') 
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

@app.route(f'/{blogPath}', methods=['GET', 'OPTIONS'])
@errorHandle
@token_required
def blogHome(authPayload):
  if request.method == 'GET':
    session_id = request.args.get('session_id')
    category = request.args.get('category')
    search = request.args.get('search')
    if not session_id:
      return build_bad_req()
      
    user_id = authPayload.get('payload').get('userId')
    role = authPayload.get('payload').get('role')
    trackBlogFunctionsCalled(user_id, session_id, inspect.stack()[0][3])

    if category:
      categoryQuery = 'SELECT id from blog_post_categoryDB where "None" = ? and name = ?;'
      categoryId = conn.fetch(categoryQuery, ("None", category))[0]

      if not len(categoryId):
        return build_not_found()
      
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
      categoryPosts = conn.fetch(categoryPostsQuery, ('None', categoryId[0]))
      OrganisedPosts = []
      if not len(categoryPosts):
        return build_not_found()

      for a in categoryPosts:
        pullBlogViewsQuery = 'SELECT count(*) from blog_post_viewsDB where ? = "None" and blog_post_id = ?;'
        postViewsRaw = conn.fetch(pullBlogViewsQuery, ('None', a[0]))[0][0]

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
      return build_actual_response(res)

    elif search:
      PostsQuery = '''
        SELECT 
          blog_postsDB.id,
          blog_postsDB.date,
          blog_usersDB.blog_username,
          blog_postsDB.title,
          blog_postsDB.body
        from blog_postsDB
        inner join blog_usersDB on
          blog_usersDB.id = blog_postsDB.blog_user_id
        INNER JOIN blog_post_categoryDB
          on blog_post_categoryDB.id = blog_postsDB.category_id
        where
          visible = 1 and
          ? = "None" and
          blog_post_categoryDB.name like "%?%" or 
          blog_usersDB.blog_username.username like "%?%" or 
          blog_postsDB.title like "%?%" or 
          blog_postsDB.body like "%?%" 
      '''
      categoryPosts = conn.fetch(PostsQuery, ('None', categoryId[0]))
      OrganisedPosts = []
      if not len(categoryPosts):
        return build_not_found()

      for a in categoryPosts:
        pullBlogViewsQuery = 'SELECT count(*) from blog_post_viewsDB where ? = "None" and blog_post_id = ?;'
        postViewsRaw = conn.fetch(pullBlogViewsQuery, ('None', a[0]))[0][0]

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
      return build_actual_response(res)
    else:
      categoriesQuery = 'SELECT id, name from blog_post_categoryDB limit 5;'
      categories = conn.fetch(categoriesQuery, ())

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
        categoryPosts = conn.fetch(categoryPostsQuery, ('None', i[0]))
        if len(categoryPosts):
          OrganisedPosts[i[1]] = []
        for a in categoryPosts:
          pullBlogViewsQuery = 'SELECT count(*) from blog_post_viewsDB where ? = "None" and blog_post_id = ?;'
          postViewsRaw = conn.fetch(pullBlogViewsQuery, ('None', a[0]))[0][0]

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
      return build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')


@app.route(f'/{blogPath}/post', methods=['POST', 'OPTIONS'])
@errorHandle
@token_required
def blogPostCreateHome(authPayload):
  if request.method == 'POST':
    data = request.get_json()
    if 'data' not in data and 'session_id' not in data:
      return build_bad_req()
    session_id = data.get('session_id')
    user_id = authPayload.get('payload').get('userId')
    role = authPayload.get('payload').get('role')
    trackBlogFunctionsCalled(user_id, session_id, inspect.stack()[0][3])

    data = data.get('data')
    if 'blog_title' not in data and 'blog_body' not in data:
      return build_bad_req()

    blog_title = data.get('blog_title')
    blog_body = data.get('blog_body')

    validatePermsQuery = 'SELECT canPost from blog_roleDB where ? = "None" and id = ?;'
    canPost = conn.fetch(validatePermsQuery, ('None', role))
    if canPost[0][0] != 1:
      return build_unauthorized()

    publishBlogQuery = 'INSERT INTO blog_postsDB VALUES (?, ?, ?, ?, ?, ?, ?, ?);'
    conn.fetch(publishBlogQuery, (None, datetime.datetime.now(), user_id, blog_title, 1, blog_body, 1, 0))
    
    publishedBlogIdQuery = 'SELECT id from blog_postsDB where blog_user_id = ? and title = ? and  body = ?;'
    publishedBlogId = conn.fetch(publishedBlogIdQuery, (user_id, blog_title, blog_body))
    kwargs = {
      'success': True,
      'data': {
        'blogPostId': publishedBlogId[0][0]
      }
    }
    res = jsonify(kwargs)
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

@app.route(f'/{blogPath}/post/<int:id>', methods=['POST', 'OPTIONS'])   # DEL, GET was,'t working because axios wouldn't set content length
@errorHandle
@token_required
def blogPostViewHome(authPayload, *args, **kwargs):
  if request.method == 'POST':
    id = int(kwargs.get('id'))
    print(id)
    data = request.get_json()
    print(request)
    user_id = authPayload.get('payload').get('userId')
    role = authPayload.get('payload').get('role')
    if 'session_id' not in data:
      return build_bad_req()
    session_id = data.get('session_id')
    trackBlogFunctionsCalled(user_id, session_id, inspect.stack()[0][3])
    
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
      return build_not_found()

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
    #   build_not_found()


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
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

@app.route(f'/{blogPath}/user/<string:username>', methods=['GET', 'OPTIONS'])   # DEL, GET was,'t working because axios wouldn't set content length
@errorHandle
@token_required
def blogUserViewHome(authPayload, *args, **kwargs):
  if request.method == 'GET':
    username = kwargs.get('username')

    session_id = request.args.get('session_id')
    user_id = authPayload.get('payload').get('userId')
    role = authPayload.get('payload').get('role')
    if not session_id:
      return build_bad_req()
    trackBlogFunctionsCalled(user_id, session_id, inspect.stack()[0][3])
    
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
        blog_usersDB.blog_username = ? and
        (blog_postsDB.visible = 1 or blog_postsDB.blog_user_id = ? or ? = "True");'''
    postRaw = conn.fetch(pullBlogQuery, (username, user_id, (role==999)))

    if len(postRaw) <= 0:
      return build_not_found()

    posts = []
    for i in postRaw:
      # Distinct views??
      pullBlogViewsQuery = 'SELECT count(*) from blog_post_viewsDB where ? = "None" and blog_post_id = ?;'
      postViewsRaw = conn.fetch(pullBlogViewsQuery, ('None', i[0]))[0][0]
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
    return build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

@app.route(f'/{blogPath}/refresh', methods=['POST', 'OPTIONS'])
@errorHandle
def blogRefreshHome():
  if request.method == 'POST':
    refresh_token = request.cookies.get('refresh_token')
    refreshTokenLife = int(config['blog-refresh-token-life']) # Days
    if not refresh_token:
      # kwargs = {
      #   'success': False
      # }
      # res = jsonify(kwargs)
      # return build_actual_response(res), 204
      return build_unauthenticated()
    refreshTokenSearchQuery = 'SELECT count(*) FROM blog_refresh_tokensDB where ? = "None" and blog_refresh_token = ?'    # expanding string when only one item in tuple ??? have to add second arg
    # tokenRows = conn.execute(refreshTokenSearchQuery, ('None', refresh_token))
    tokenRows = conn.fetch(refreshTokenSearchQuery, ('None', refresh_token))

    if len(tokenRows) != 1:
      return build_unauthorized()

    outcome = blogAuthorize(refresh_token, config['blog-jwt-refresh-token'])
    userId = outcome.get('payload').get('userId')

    if not outcome.get('success'):
      return build_unauthorized()

    userSearchQuery = 'SELECT blog_username, role_id FROM blog_usersDB where ? = "None" and id = ?'    # expanding string when only one item in tuple ??? have to add second arg
    userRow = conn.fetch(userSearchQuery, ('None', userId))

    expires = str(int((datetime.datetime.now() + datetime.timedelta(days = refreshTokenLife)).timestamp() * 1000 ))
    issuedAtRaw = datetime.datetime.now()
    issuedAt = str(int(issuedAtRaw.timestamp() * 1000 ))

    jwtAccessPayload = {
      'userId': userId,
      'iat': issuedAt,
      'exp': expires,
      'role': userRow[0][1],
      'username': userRow[0][0]
    }
    jwtAccess = generateJWT(generateJWTHeader(), jwtAccessPayload, config['blog-jwt-auth-token'])

    res = jsonify(buildBearerResp(jwtAccess, expires))
    res.headers.add('Access-Control-Allow-Credentials', 'true') 
    return build_actual_response(res), 201
  elif request.method == 'OPTIONS': 
    return build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')


@app.route(f'/{blogPath}/logout', methods=['POST', 'OPTIONS'])
@errorHandle
@token_required
def blogLogoutHome(authPayload):
  if request.method == 'POST':
    refresh_token = request.cookies.get('refresh_token')
    if not refresh_token:
      return build_unauthenticated()
    refreshTokenSearchQuery = 'SELECT count(*) FROM blog_refresh_tokensDB where ? = "None" and blog_refresh_token = ?'    # expanding string when only one item in tuple ??? have to add second arg
    tokenRows = conn.fetch(refreshTokenSearchQuery, ('None', refresh_token))

    if len(tokenRows) != 1:
      return build_unauthorized()

    outcome = blogAuthorize(refresh_token, config['blog-jwt-refresh-token'])

    if not outcome.get('success'):
      return build_unauthorized()

    user_id = authPayload.get('payload').get('userId')
    userRefreshTokenDelete = 'DELETE from blog_refresh_tokensDB where ? = "None" and blog_user_id = ?;'
    conn.fetch(userRefreshTokenDelete, ('None', user_id))

    kwargs = {
      'success': True
    }

    res = jsonify(kwargs)
    res.set_cookie('refresh_token', value='', expires=0, httponly=True)
    res.headers.add('Access-Control-Allow-Credentials', 'true') 
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
    conn.insert(insertMonitorQuery, (None, datetime.datetime.now(), uuid, session_id, page))


    if prevPage:
      insertQuery = 'INSERT INTO route_trackDB VALUES (?, ?, ?, ?, ?);'
      # conn.execute(insertQuery, (None, datetime.datetime.now(), session_id, prevPage, page))
      conn.insert(insertQuery, (None, datetime.datetime.now(), session_id, prevPage, page))

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

@app.route(f'/{projectsPath}/fuelprices', methods=['GET', 'OPTIONS'])
@errorHandle
def fuelpricesHome():
  if request.method == 'GET':
    rows = list(conn.fetch('SELECT * FROM fuelpricesDB where ? = "None" ORDER BY id DESC LIMIT ?', ('None', 200)))[::-1]

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

@app.route(f'/{projectsPath}/mrna', methods=['GET', 'OPTIONS'])
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


@app.route(f'/{projectsPath}/secondary', methods=['GET', 'OPTIONS'])
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

@app.route(f'/{projectsPath}/property', methods=['GET', 'OPTIONS'])
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

@app.route(f'/{projectsPath}/property/search', methods=['GET', 'OPTIONS'])
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

@app.route(f'/{projectsPath}/seqalign', methods=['GET', 'OPTIONS'])
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

@app.route(f'/{projectsPath}/randombio', methods=['GET', 'OPTIONS'])
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