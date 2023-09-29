from flask import Blueprint, render_template, jsonify, request, json
import scripts.utils.decorators
import scripts.utils.responses
import scripts.utils.structs
from controllers.logger import logger, getRequestContext

jssimulatorCms = Blueprint('jssimulatorCms', __name__)

@jssimulatorCms.route(f'/{scripts.utils.structs.cmsPath}/jssimulator', methods=['GET', 'OPTIONS'])
@scripts.utils.decorators.WrapWithLogs
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.rateLimit
def jssimulatorCmsHome():
  if request.method == 'GET':
    logger.info(msg=f"({getRequestContext()}) Processing request GET/")
    with open('../data/responses/jssimulatorPage.json') as test_file:
        data = json.load(test_file)
    return scripts.utils.responses.buildSuccessResp(data)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')
