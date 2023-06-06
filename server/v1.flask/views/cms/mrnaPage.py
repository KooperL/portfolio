from flask import Blueprint, render_template, jsonify, request, json
import scripts.utils.decorators
import scripts.utils.responses
import scripts.utils.structs

mrnaCms = Blueprint('mrnaCms', __name__)

@mrnaCms.route(f'/{scripts.utils.structs.cmsPath}/mrna', methods=['GET', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.rateLimit
def mrnaCmsHome():
  if request.method == 'GET':
    with open('../data/responses/mrnaPage.json') as test_file:
        data = json.load(test_file)
    return scripts.utils.responses.buildSuccessResp(data)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')
