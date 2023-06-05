from flask import Blueprint, render_template, jsonify, request, json
import scripts.utils.decorators
import scripts.utils.responses
import datetime
import controllers.database
import controllers.discordLogger
from dotenv import dotenv_values
import scripts.utils.structs
config = dotenv_values('../.env')

contactCms = Blueprint('contact', __name__)

@contactCms.route(f'/{scripts.utils.structs.cmsPath}/contact', methods=['GET', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.rateLimit
def contactCmsHome():
  if request.method == 'GET':
    with open('../data/responses/contactPage.json') as test_file:
        data = json.load(test_file)
    return scripts.utils.responses.buildSuccessResp(data)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')
