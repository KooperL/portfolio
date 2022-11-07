from flask import make_response, jsonify
from dotenv import dotenv_values
config = dotenv_values('.env')


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
  response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')  
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