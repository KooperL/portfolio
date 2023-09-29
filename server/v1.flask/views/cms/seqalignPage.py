from flask import Blueprint, render_template, jsonify, request, json
import scripts.utils.decorators
import scripts.utils.responses
import scripts.utils.structs
from controllers.logger import logger, getRequestContext

seqalignCms = Blueprint('seqalignCms', __name__)

@seqalignCms.route(f'/{scripts.utils.structs.cmsPath}/seqalign', methods=['GET', 'OPTIONS'])
@scripts.utils.decorators.WrapWithLogs
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.rateLimit
def seqalignCmsHome():
  if request.method == 'GET':
    logger.info(msg=f"({getRequestContext()}) Processing request GET/")
    with open('../data/responses/seqalignPage.json') as test_file:
        data = json.load(test_file)
    return scripts.utils.responses.buildSuccessResp(data)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')
