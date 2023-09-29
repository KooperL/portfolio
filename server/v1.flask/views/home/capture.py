from flask import Blueprint, render_template, jsonify, request
import scripts.utils.decorators
import scripts.utils.responses
import datetime
import controllers.database
from controllers.logger import logger, getRequestContext


capture = Blueprint('capture', __name__)

@capture.route('/capture', methods=['POST', 'OPTIONS'])
@scripts.utils.decorators.WrapWithLogs
@scripts.utils.decorators.errorHandle
def captureHome():
  if request.method == 'POST':
    logger.info(msg=f"({getRequestContext()}) Processing request POST/")
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
      request.args.get('darkMode'),
      request.args.get('cookieEnabled'),
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
      raise RuntimeError('Mandatory value(s) not provided')

    insertFingerprintQuery = """INSERT INTO fingerprint VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    );"""
    # controllers.database.conn.execute(insertFingerprintQuery, args)
    # controllers.database.conn.commit()
    controllers.database.conn.insert(insertFingerprintQuery, args)

    # print(list(controllers.database.conn.execute(f'SELECT * FROM fingerprint ORDER BY id DESC LIMIT 200')))
    res = jsonify({'success': True})
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')
