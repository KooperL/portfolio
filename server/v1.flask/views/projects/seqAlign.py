from flask import Blueprint, render_template, jsonify, request
import scripts.utils.decorators
import scripts.utils.responses
import scripts.utils.structs


seqAlign = Blueprint('seqAlign', __name__)

@seqAlign.route(f'/{scripts.utils.structs.projectsPath}/seqalign', methods=['GET', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.rateLimit
def seqalignHome():
  if request.method == 'GET':
    pull = [
      request.args.get('sampletxt'),
      request.args.get('referencetxt'),
      request.args.get('identical'),
      request.args.get('mismatch'),
      request.args.get('gaps'),
      request.args.get('extgaps'),
    ]
    if not all(pull):
      raise RuntimeError('Mandatory value(s) not provided')
    results = scripts.mrna_files.seqalign.pairwise_align(*pull)
    draw_res = scripts.mrna_files.seqalign.drawseqalign(results)
    kwargs = {
      'success': True,
      'data': {
        'results': dict(zip(['s1', 's2', 'score', 'begin', 'end'], results)),
        'draw_res':draw_res,
      }
    }
    res = jsonify(kwargs)
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
      return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')

