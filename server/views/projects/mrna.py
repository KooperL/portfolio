from flask import Blueprint, render_template, jsonify, request
import scripts.utils.decorators
import scripts.utils.responses
import scripts.utils.structs


mrna = Blueprint('mrna', __name__)

@mrna.route(f'/{scripts.utils.structs.projectsPath}/mrna', methods=['GET', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
def mrnaHome():
  if request.method == 'GET':
    dna_field = request.args.get('dna_field_id')
    if not dna_field:
      raise RuntimeError('Mandatory value not provided')
    dna = dna_field.replace('%20','').replace('\n', '').replace('\r', '').lower()
    count = scripts.mrna_files.decode.simple_count(dna)
    mrna = scripts.mrna_files.decode.mrna_complement(dna)
    aa_p = scripts.mrna_files.decode.amino_acids(mrna)
    if sum(count)<13:
      tm = 4*(count[0]+count[1])+4*(count[2]+count[3])
    else:
      tm = 64.9+41*(count[0]+count[1]-16.4)/sum(count)
    kwargs = {
      'success': True,
      'data': {
        'dna_field': dna,
        'mrna_field': mrna,
        'rdna_field': scripts.mrna_files.decode.reverse_complement(dna),
        'simplecount': count,
        'gccontent': scripts.mrna_files.decode.gc_content(dna),
        'aa': aa_p,
        'aa_s': scripts.mrna_files.decode.aa_single_from_partial(aa_p),
        'molweight': scripts.mrna_files.decode.mol_weight(aa_p),
        'tm': tm
      }
    }
      # return render_template('mrna.html', **kwargs)
    res = jsonify(kwargs)
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
      return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')