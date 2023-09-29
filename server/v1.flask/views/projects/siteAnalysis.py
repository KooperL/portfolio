from flask import Blueprint, render_template, jsonify, request
import scripts.utils.decorators
import scripts.utils.responses
import scripts.utils.structs
import controllers.database
from controllers.logger import logger, getRequestContext


siteAnalysis = Blueprint('siteAnalysis', __name__)

@siteAnalysis.route(f'/{scripts.utils.structs.projectsPath}/siteanalysis', methods=['GET', 'OPTIONS'])
@scripts.utils.decorators.WrapWithLogs
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.rateLimit
def siteAnalysisHome():
  if request.method == 'GET':
    logger.info(msg=f"({getRequestContext()}) Processing request GET/")
    pull = [
      request.args.get('uuid'),
    ]
    if not all(pull):
      raise RuntimeError('Mandatory value(s) not provided')

    siteTraffic = list(controllers.database.conn.fetch('SELECT source, destination, COUNT(*) as count FROM route_track where "None" = ? GROUP BY source, destination LIMIT ?;', ('None', 20)))
    siteTrafficKeys = ['source', 'destination', 'count']

    fingerprint = list(controllers.database.conn.fetch('SELECT uuid, canvas_hash, platform, browser, actualHeight, actualWidth, ip FROM fingerprint where "None" = ? and uuid = ? limit 1;', ('None', pull[0]))[0])
    fingerprintKeys = ['uuid', 'canvas_hash', 'platform', 'browser', 'actualHeight', 'actualWidth', 'ip']

    uniqueVisits = controllers.database.conn.fetch('SELECT COUNT(session_id) FROM monitor WHERE "None" = ? and uuid = ? GROUP BY session_id;', ('None', pull[0]))[0]
    
    pages = list(controllers.database.conn.fetch('SELECT page, COUNT(*) as count FROM monitor WHERE "None" = ? and uuid = ? GROUP BY page;', ('None', pull[0])))
    pagesKeys = ['page', 'count']

    kwargs = {
      'success': True,
      'data': {
        'siteTraffic':[dict(zip(siteTrafficKeys,x)) for x in siteTraffic],
        'fingerprint':dict(zip(fingerprintKeys,fingerprint)),
        'uniqueVisits': uniqueVisits[0],
        'pages': [dict(zip(pagesKeys,x)) for x in pages],
      }
    }
    res = jsonify(kwargs)
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
      return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')
