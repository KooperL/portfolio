from flask import make_response, jsonify
from dotenv import dotenv_values
config =  dotenv_values('../.env')
from controllers.logger import logger, getRequestContext


def build_preflight_response():
  response = make_response()
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  response.headers.add('Access-Control-Allow-Origin', config['ORIGIN'])
  response.headers.add('Access-Control-Allow-Headers', ','.join([str(x) for x in [
    'Access-Control-Allow-Credentials',
    'Access-Control-Allow-Method',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin',
    'authorization',
    'Origin',
    'Accept',
    'X-Requested-With',
    'X-Request-ID',
    'Content-Type',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
    'access-control-request-credentials',
    'cachecontrol'
  ]]))
  response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')  
  logger.debug(msg=f"({getRequestContext()}) Closing request")
  return response

def build_actual_response(response):
  response.headers.add('Access-Control-Allow-Origin', config['ORIGIN'])
  logger.info(msg=f"({getRequestContext()}) Closing request")
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
  logger.info(msg=f"({getRequestContext()}) Closing request")
  return kwargs

def buildSuccessResp(data):
  kwargs = {
    'success': True,
    'data': data
  }
  res = jsonify(kwargs)
  return build_actual_response(res)


def build_unauthenticated():
  kwargs = {
    'success': False,
    'error': 'Incorrect username/password'
  }
  res = jsonify(kwargs)
  return build_actual_response(res), 403
