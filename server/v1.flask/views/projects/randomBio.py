from flask import Blueprint, render_template, jsonify, request
import scripts.utils.decorators
import scripts.utils.responses
import scripts.utils.structs


randomBio = Blueprint('randomBio', __name__)

@randomBio.route(f'/{scripts.utils.structs.projectsPath}/randombio', methods=['GET', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.rateLimit
def randomBioHome():
  if request.method == 'GET':
    pull = [
      int(request.args.get('type')),
      int(request.args.get('length'))
    ]

    results = None
    if pull[0] == 1:
      results = scripts.mrna_files.randomGenerator.randomDNA(pull[1])
    elif pull[0] == 2:
      results = scripts.mrna_files.randomGenerator.randomRNA(pull[1])
    elif pull[0] == 3:
      single = int(request.args.get('single'))
      if not all(pull):
        raise RuntimeError('Mandatory value(s) not provided')
      results = scripts.mrna_files.randomGenerator.randomProteins(pull[1], single)
    else:
      raise RuntimeError('Invalid value(s) provided')
    kwargs = {
      'success': True,
      'data': {
        'results':results,
      }
    }
    res = jsonify(kwargs)
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
      return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')