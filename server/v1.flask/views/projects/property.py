from flask import Blueprint, render_template, jsonify, request
import scripts.utils.decorators
import scripts.utils.responses
import scripts.utils.structs
from controllers.logger import logger, getRequestContext


property = Blueprint('property', __name__)

@property.route(f'/{scripts.utils.structs.projectsPath}/property', methods=['GET', 'OPTIONS'])
@scripts.utils.decorators.WrapWithLogs
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.rateLimit
def propertyHome():
  if request.method == 'GET':
    logger.info(msg=f"({getRequestContext()}) Processing request GET/")
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
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
      return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')
