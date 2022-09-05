import datetime
import inspect
import random
import json
import sys
import os
from dotenv import dotenv_values
config = dotenv_values('.env')
appDir = os.getcwd()

from flask import Flask, render_template, request, redirect, url_for, flash, make_response, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import sqlite3
#export FLASK_ENV=development (or production I guess)
from jinja2 import Environment
environment = Environment()



import pymongo
from pymongo import MongoClient
from bson.json_util import dumps

import scripts.mrna_files.decode
import scripts.mrna_files.secondary
import scripts.mrna_files.seqalign
import scripts.property.draw
import scripts.utils.databaseUtils
import scripts.fuelscrape.newdrawfuel
import scripts.utils.rgb

#sys.path.insert(1, appDir + '/stocks/')
#import pattern_detect




app = Flask(__name__)
# cors = CORS(app, resources={r'*': {'origins': '*'}})
cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
db = SQLAlchemy(app)

class fuelpricesDB(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  date = db.Column(db.DateTime, nullable=False)
  minprice = db.Column(db.Float(6), nullable=False)
  maxprice = db.Column(db.Float(6), nullable=False)
  averageprice = db.Column(db.Float(6), nullable=False)
  wholesaleprice = db.Column(db.Float(6), nullable=False)

##################################
#  use in python IDE to create #
#from app import db,emailsDB,cartivoiceDB,cartioptionsDB,fuelpricesDB
#db.create_all()         #
##################################
import urllib.parse
username = urllib.parse.quote_plus(config['MONGO_USERNAME'])
password = urllib.parse.quote_plus(config['MONGO_PASSWORD'])
client = MongoClient('mongodb://%s:%s@localhost:%s/' % (username, password, config['MONGO_PORT']))
db = client['traffic_log']
traffic_data = db['data']

def log(ip, page):
  dic = {
    'Date': datetime.datetime.now(),
    'ip': ip,
    'page': page,
  }
  traffic_data.insert_one(dic)

# @app.after_request
# def apply_caching(response):
  # response.headers["X-Frame-Options"] = "SAMEORIGIN"
  # response.headers['Access-Control-Allow-Origin'] = '*'
  # response.headers['Content-Type'] = 'application/json'
  # response.headers['Access-Control-Allow-Origin'] = '*'
  # return response

# @app.route('/log/')
# def logHome():
#   data = traffic_data.find()
#   list_data = list(traffic_data.find())
#   json_data = json.loads(dumps(list_data))
#   return render_template('log.html', data=json_data)
  #return jsonify(json_data)

@cross_origin()
@app.route('/home')
def homeHome():
  # log(request.remote_addr, inspect.stack()[0][3])
  kwargs = {
    'success': True,
    'data': [
      {
        'title': 'Games',
        'points': [
          {
            'address': '/tictactoe',
            'name': 'Tictactoe',
          }
        ]
      }, {
        'title': 'Data Storage and Analysis',
        'points': [
          {
            'address': '/fuelprices',
            'name': 'UL91 Fuel Price trends',
          },
          {
            'address': '/property',
            'name': 'Real estate data interface',
          }
      ],
      }, {
        'title': 'Bioinformatics',
        'points': [
          {
            'address': '/mrna',
            'name': 'DNA:mRNA decoder',
          },
          {
            'address': '/secondary',
            'name': 'Predict secondary protein structure',
          },
          {
            'address': '/seqalign',
            'name': 'Pairwise sequence alignment',
          }
        ],
      }, {
        'title': 'Repos',
        'points': [
          {
            'address': 'https://github.com/KooperL/tkinter3dengine',
            'name': 'Python/Tkinter 3d Engine',
            },
          {
            'address': 'https://github.com/KooperL/tkinterAstar',
            'name': 'A* Path finder py',
          }
        ]
      }
    ]
  }
  response = jsonify(kwargs)
  response.headers.add('Access-Control-Allow-Origin', '*')
  return response

@cross_origin()
@app.route('/heatmap')
def heatmapHome():
  dic = []
  allSubs = scripts.utils.databaseUtils.call()
  priceMin = 200000
  priceMax = 2000000

  for sub in allSubs:
    price = scripts.utils.databaseUtils.call({'suburb': sub['suburb']}, 'price')
    try:
      price = price[0]['pricedata']['mean_means']
    except:
      continue
    mean = priceMin*(price<priceMin) + priceMax*(price>priceMax) + (price>priceMin)*(price<priceMax)*price
    #col = ((mean-priceMin)/(priceMax-priceMin))*255
    col = scripts.utils.rgb.rgb(priceMin, priceMax, mean)
    bounds = sub['bounds']
    boundsCorrected = map(lambda x: {'lat': x[1], 'lng': x[0]}, bounds)
    dic.append({'suburb': sub['suburb'], 'price': price, 'colour': ''.join([hex(c)[-2:].replace('x','0') for c in col]), 'bounds': list(boundsCorrected)})
  return render_template('test.html', data={'data':dic})

# @app.route('/stocks/', methods=['GET', 'POST'])
# def stocksHome():
  # log(request.remote_addr, inspect.stack()[0][3])
#   kwargs = {
#       'title':'Stock page',
#       'heading':'Stock page',
#       'candlestick_patterns': 'pattern_detect.patterns_list()',
#       'df':'pattern_detect.data()',
#       }
#   return render_template('stocks.html', **kwargs)
#   '''
#   if request.method == 'POST':
#     pattern = request.form['pattern']
#     pattern_function = getattr(talib, pattern)
#     results = pattern_function(df['Open'], df['High'], df['Low'], df['Close'])
#   else:
#     pattern = None
# '''

@app.route('/fuelprices')
@cross_origin()
def fuelpricesHome():
  # log(request.remote_addr, inspect.stack()[0][3])
  try:
    conn = sqlite3.connect(f'{appDir}/data/database.db')
    rows = list(conn.execute(f'SELECT * FROM fuelpricesDB ORDER BY id DESC LIMIT 200'))[::-1]
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
    response = jsonify(kwargs)
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return response
  except Exception as e:
    kwargs = {
      'success': False,
      'error': e
    }
    response = jsonify(kwargs)
    return response

@app.route('/mrna', methods=['GET'])
@cross_origin()
def mrnaHome():
  # log(request.remote_addr, inspect.stack()[0][3])
  try: 
    if request.method == 'GET':
      if not request.args.get('dna_field_id'):
        raise RuntimeError('Mandatory value not provided')
      dna_field = request.args.get('dna_field_id')
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
      return jsonify(kwargs)
    else:
      raise RuntimeError('Method not allowed')
  except Exception as e:
    kwargs = {
      'success': False,
      'error': e
    }
    response = jsonify(kwargs)
    return response


@app.route('/secondary', methods=['GET'])
@cross_origin()
def secondaryHome():
  # log(request.remote_addr, inspect.stack()[0][3]).
  try:
    if request.method == 'GET':
      aas = request.args.get('aa_field_id')
      aaformat = request.args.get('aaf_field_id')
      #threshold = request.form['detectthreshold']
      threshold = request.args.get('detectthreshold')
      avg = request.args.get('leniency')
      if not all([aas, aaformat, threshold, avg]):
        raise RuntimeError('Mandatory value(s) not provided')
      output = scripts.mrna_files.secondary.secondary_predict(aas.lower(), aaformat, threshold, avg)
      kwargs = {
      'success': True,
      'data': {
        'aa_field': aas,
        'ahp_field': output[0],
        'ahm_field': output[1],
        'bsp_field': output[2],
        'bsm_field': output[3],
        'pred_str': output[4],
        'ahl_field': output[5],
        'bsl_field': output[6],
        }
      }
      response = jsonify(kwargs)
      return response
    else:
      raise RuntimeError('Method not allowed')
  except Exception as e:
    kwargs = {
      'success': False,
      'error': e
    }
    response = jsonify(kwargs)
    return response

# environment.tests['isvalidsuburb'] = isvalidsuburb

@app.route('/property', methods=['GET'])
@cross_origin()
def propertyHome():
  try:
    # log(request.remote_addr, inspect.stack()[0][3])
    if request.method == 'GET':
      stats = scripts.property.draw.state_stats()
      ranked = scripts.property.draw.highest_des()
      kwargs = {
        'success': True,
        'data': {
          'stats': stats,
          'highest': ranked
        }
      }
      response = jsonify(kwargs)
      return response
    else:
      raise RuntimeError('Method not allowed')
  except Exception as e:
    kwargs = {
      'success': False,
      'error': e
    }
    response = jsonify(kwargs)
    return response

@app.route('/property/search', methods=['GET'])
@cross_origin()
def propertySearchHome():
  # log(request.remote_addr, inspect.stack()[0][3])
  try:
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
      response = jsonify(kwargs)
      return response
    else:
      raise RuntimeError('Method not allowed')
  except Exception as e:
    kwargs = {
      'success': False,
      'error': e
    }
    response = jsonify(kwargs)
    return response

# @app.route('/property/files', methods=['GET'])
# def propfilesHome():
#   # log(request.remote_addr, inspect.stack()[0][3])
#   return render_template('prop_files.html',files = list_files(appDir + '/property/prop_data/'))

@cross_origin()
@app.route('/seqalign', methods=['GET'])
def seqalignHome():
  # log(request.remote_addr, inspect.stack()[0][3])
  try:
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
          'results':results,
          'draw_res':draw_res,
        }
      }
      response = jsonify(kwargs)
      return response
    else:
      raise RuntimeError('Method not allowed')
  except Exception as e:
    kwargs = {
      'success': False,
      'error': e
    }
    response = jsonify(kwargs)
    return response



if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000, debug=True)
