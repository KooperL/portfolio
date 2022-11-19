from flask import Blueprint, render_template, jsonify, request
import scripts.utils.decorators
import scripts.utils.responses
import scripts.utils.structs


property_search = Blueprint('property_search', __name__)

@property_search.route(f'/{scripts.utils.structs.projectsPath}/property/search', methods=['GET', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
def propertySearchHome():
  if request.method == 'GET':
    if not request.args.get('prop_suburb'):
      raise RuntimeError('Mandatory value not provided')
    suburb = request.args.get('prop_suburb').lower().replace('%20','_')
    stats = scripts.property.draw.query_sub(suburb)
    data = scripts.utils.databaseUtils.call({'suburb': suburb}, 'price')[0]
    del data['_id']
    kwargs = {
      'success': True,
      'data': {
        'suburb': suburb,
        'stats': stats,
        'details': data
      }
    }
    res = jsonify(kwargs)
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
      return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

# @app.route('/property/files', methods=['GET', 'OPTIONS'])
# def propfilesHome():
# #   return render_template('prop_files.html',files = list_files(appDir + '/property/prop_data/'))

