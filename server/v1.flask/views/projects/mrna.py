from flask import Blueprint, render_template, jsonify, request
import scripts.utils.decorators
import scripts.utils.responses
import scripts.utils.structs
import scripts.mrna_files.decode

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
    aminoAcids = scripts.mrna_files.decode.amino_acids(mrna)
    if len(dna) < 13:
      tm = 4*(count['g']+count['c'])+4*(count['a']+count['t'])
    else:
      tm = 64.9+41 * (count['g']+count['c']-16.4) / len(dna)
    kwargs = {
      'success': True,
      'data': {
        'dna_field': dna,
        'mrna_field': mrna,
        'rdna_field': scripts.mrna_files.decode.reverse_complement(dna),
        'simplecount': count,
        'gccontent': scripts.mrna_files.decode.gc_content(dna),
        'aa': aminoAcids['partial'],
        'aa_s': aminoAcids['single'],
        'molweight': scripts.mrna_files.decode.mol_weight(dna),
        'tm': tm
      }
    }
    res = jsonify(kwargs)
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
      return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')