from flask import Blueprint, render_template, jsonify, request, json
import scripts.utils.decorators
import scripts.utils.responses
import scripts.utils.structs

tictactoeCms = Blueprint('tictactoeCms', __name__)

@tictactoeCms.route(f'/{scripts.utils.structs.cmsPath}/tictactoe', methods=['GET', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.rateLimit
def tictactoeCmsHome():
  if request.method == 'GET':
    with open('../data/responses/tictactoePage.json') as test_file:
        data = json.load(test_file)
    return scripts.utils.responses.buildSuccessResp(data)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')
