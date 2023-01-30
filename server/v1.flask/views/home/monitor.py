from flask import Blueprint, render_template, jsonify, request
import scripts.utils.decorators
import scripts.utils.responses
import datetime
import controllers.database


monitor = Blueprint('monitor', __name__)

@monitor.route('/monitor', methods=['POST', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
def monitorHome():
  if request.method == 'POST':

    uuid = request.args.get('uuid')
    session_id = request.args.get('session_id')
    page = request.args.get('page')
    prevPage = request.args.get('prevPage')
    if not all([uuid, page, session_id]):
      raise RuntimeError('Mandatory value(s) not provided')

    insertMonitorQuery = 'INSERT INTO monitor VALUES (?, ?, ?, ?, ?);'
    # controllers.database.conn.execute(insertMonitorQuery, (None, datetime.datetime.now(), uuid, session_id, page))
    # controllers.database.conn.commit()
    controllers.database.conn.insert(insertMonitorQuery, (None, datetime.datetime.now(), uuid, session_id, page))


    if prevPage != "NULL":
      insertQuery = 'INSERT INTO route_track VALUES (?, ?, ?, ?, ?);'
      # controllers.database.conn.execute(insertQuery, (None, datetime.datetime.now(), session_id, prevPage, page))
      controllers.database.conn.insert(insertQuery, (None, datetime.datetime.now(), session_id, prevPage, page))

    # controllers.database.conn.commit()

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
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')