import scripts.utils.responses
import scripts.utils.hashFunctions
import datetime
from functools import wraps
from flask import request, jsonify
import binascii
import hashlib
import hmac
import controllers.database
from dotenv import dotenv_values
config =  dotenv_values('../.env')


def rateLimit(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        ip = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)

        pullRequest = 'SELECT date FROM requests VALUES where "None" = ? and ip_address = ?);'
        pullRequestTraffic = controllers.database.conn.fetch(pullRequest, ('None', ip))

        now = datetime.datetime.now
        event_count = 0

        # Iterate through the tuple of dates
        for hist_date in pullRequestTraffic:
          # Calculate the time difference between the current time and the date in the tuple
          time_diff = now - hist_date[0]

          # Check if the time difference is less than y minutes
          if time_diff < datetime.timedelta(minutes=config['RATE_LIMIT_WINDOW']):
              # Increment the event count
              event_count += 1

        # Check if the event count is greater than x
        if event_count > config['RATE_LIMIT_REQUESTS_GENERAL']:
          kwargs = {
            'success': False,
            'error': 'Too many requests'
            }
          res = jsonify(kwargs)
          return scripts.utils.responses.build_actual_response(res), 503
        else:
          requestInsert = 'INSERT INTO requests VALUES (?, ?, ?);'
          controllers.database.conn.fetch(requestInsert, (None, now, ip))
          return func(*args, **kwargs)
    return wrapper

def errorHandle(func):
  def wrapper(*args, **kwargs):
    try:
      return func(*args, **kwargs)
    except Exception as e:
      # print(e)
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