from flask import Blueprint, render_template, jsonify, request
import scripts.utils.decorators
import scripts.utils.responses
import datetime
import scripts.utils.structs


fuelprices = Blueprint('fuelprices', __name__)

@fuelprices.route(f'/{scripts.utils.structs.projectsPath}/fuelprices', methods=['GET', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
def fuelpricesHome():
  if request.method == 'GET':
    rows = list(conn.fetch('SELECT * FROM fuelpricesDB where ? = "None" ORDER BY id DESC LIMIT ?', ('None', 200)))[::-1]

    dic = {'wholesale': [], 'min': [], 'max': [], 'average': [], }
    for key in rows:
      date = datetime.datetime.strptime(key[1], '%Y-%m-%d %H:%M:%S.%f')#.timestamp()
      dic['wholesale'].append({'x': date, 'y': key[5]})
      dic['min'].append({'x': date, 'y': key[2]})
      dic['max'].append({'x': date, 'y': key[3]})
      dic['average'].append({'x': date, 'y': key[4]})
    kwargs = {
      'success': True,
      'data': {
        'fuelprices': dic,
        'stats': scripts.fuelscrape.newdrawfuel.table()
      }
    }
    res = jsonify(kwargs)
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
      return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')