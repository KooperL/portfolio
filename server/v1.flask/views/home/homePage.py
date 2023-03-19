from flask import Blueprint, render_template, jsonify, request, json
import scripts.utils.decorators
import scripts.utils.responses


homePage = Blueprint('homePage', __name__)

@homePage.route('/home', methods=['GET', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.rateLimit
def homeHome():
  if request.method == 'GET':
    with open('../data/responses/homePage.json') as test_file:
        data = json.load(test_file)
    return scripts.utils.responses.buildSuccessResp(data)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')