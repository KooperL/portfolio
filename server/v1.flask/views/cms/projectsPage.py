from flask import Blueprint, render_template, jsonify, request, json
import scripts.utils.decorators
import scripts.utils.responses
import scripts.utils.structs
from controllers.logger import logger, getRequestContext

projectsCms = Blueprint('projectsCms', __name__)

@projectsCms.route(f'/{scripts.utils.structs.cmsPath}/projects', methods=['GET', 'OPTIONS'])
@scripts.utils.decorators.WrapWithLogs
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.rateLimit
def projectsCmsHome():
  if request.method == 'GET':
    logger.info(msg=f"({getRequestContext()}) Processing request GET/")
    with open('../data/responses/projectsPage.json') as test_file:
        data = json.load(test_file)
    return scripts.utils.responses.buildSuccessResp(data)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')
