import scripts.utils.responses
import scripts.utils.hashFunctions
import datetime
from functools import wraps
from flask import request, jsonify
import binascii
import hashlib
import hmac
from dotenv import dotenv_values
config =  dotenv_values('../.env')


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
      return scripts.utils.responses.build_actual_response(res), 500
    except:
      print('cause')
      kwargs = {
        'success': False,
        'error': 'Unknown error'
      }
      res = jsonify(kwargs)
      return scripts.utils.responses.build_actual_response(res), 500
  wrapper.__name__ = func.__name__
  return wrapper



def blogAuthorize(jwt, key):
  jwt = jwt.split('.')
  jwtSignature = hmac.new(
    binascii.unhexlify(key),
    '.'.join(jwt[0:2]).encode(),
    hashlib.sha256,
  ).hexdigest()
  if scripts.utils.hashFunctions.stringToBase64(jwtSignature) == jwt[2]:
    jwtDecoded = [eval(scripts.utils.hashFunctions.base64ToString(jwt[0])), eval(scripts.utils.hashFunctions.base64ToString(jwt[1]))]
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
      return scripts.utils.responses.build_preflight_response()
    auth_header = request.headers.get('Authorization')
    if auth_header is None or not auth_header.startswith('Bearer '):
      return scripts.utils.responses.build_unauthorized()
    bearerToken = auth_header.split(' ')[1]
    outcome = blogAuthorize(bearerToken, config['blog-jwt-auth-token'])
    if outcome.get('success') == False:
      return scripts.utils.responses.build_unauthorized()
    return f(outcome, *args, **kwargs)
  return decorated