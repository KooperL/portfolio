from flask import Blueprint, render_template, jsonify, request
import scripts.utils.decorators
import scripts.utils.responses
import scripts.utils.structs
import scripts.mrna_files.secondary
from controllers.logger import logger, getRequestContext

secondary = Blueprint('secondary', __name__)

@secondary.route(f'/{scripts.utils.structs.projectsPath}/secondary', methods=['GET', 'OPTIONS'])
@scripts.utils.decorators.WrapWithLogs
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.rateLimit
def secondaryHome():
  # log(request.remote_addr, inspect.stack()[0][3]).
  if request.method == 'GET':
    logger.info(msg=f"({getRequestContext()}) Processing request GET/")
    aas = request.args.get('aa_field_id')
    # aaformat = request.args.get('aaf_field_id')
    # #threshold = request.form['detectthreshold']
    # threshold = request.args.get('detectthreshold')
    # avg = request.args.get('leniency')
    # if not all([aas, aaformat, threshold, avg]):
    #   raise RuntimeError('Mandatory value(s) not provided')
    output = scripts.mrna_files.secondary.secondary_predict(aas)
    kwargs = {
    'success': True,
    'data': output
    # 'data': {
    #   'aa_field': aas,
    #   'ahp_field': output[0],
    #   'ahm_field': output[1],
    #   'bsp_field': output[2],
    #   'bsm_field': output[3],
    #   'pred_str': output[4],
    #   'ahl_field': output[5],
    #   'bsl_field': output[6],
    #   }
    }
    res = jsonify(kwargs)
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
      return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')
