import base64
import binascii
import datetime
from functools import wraps
import hashlib
import hmac
from lib2to3.pytree import Base
from nis import cat
from tokenize import Number
from threading import Lock
from typing import final
import urllib.parse
import inspect
import random
import secrets
import json
import sys
import os
from dotenv import dotenv_values
config = dotenv_values('.env')
appDir = os.getcwd()

from flask import Flask, render_template, request, redirect, url_for, flash, make_response, session, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS, cross_origin
import sqlite3
from werkzeug.middleware.proxy_fix import ProxyFix

from jinja2 import Environment
environment = Environment()
app = Flask(__name__)

import pymongo
from pymongo import MongoClient
from bson.json_util import dumps

import scripts.mrna_files.decode
import scripts.mrna_files.secondary
import scripts.mrna_files.seqalign
import scripts.mrna_files.randomGenerator
import scripts.property.draw
import scripts.utils.databaseUtils
import scripts.fuelscrape.newdrawfuel
import scripts.utils.rgb

import views.home.homePage
import views.home.about
import views.home.contact
import views.home.capture
import views.home.monitor

import views.projects.index
import views.projects.fuelprices
import views.projects.mrna
import views.projects.property
# import views.projects.property_search
import views.projects.randomBio
import views.projects.secondary
import views.projects.seqAlign

import views.blog.blogIndex
import views.blog.register
import views.blog.login
import views.blog.logout
import views.blog.post
import views.blog.post_search
import views.blog.refresh
import views.blog.user_search

#sys.path.insert(1, appDir + '/stocks/')
#import pattern_detect



# Use cache decorator to prevent db fetches
# cache = Cache(app)
# @cache.cached(timeout=60)


app = Flask(__name__)
app.wsgi_app = ProxyFix(
  app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
)


username = urllib.parse.quote_plus(config['MONGO_USERNAME'])
password = urllib.parse.quote_plus(config['MONGO_PASSWORD'])
client = MongoClient('mongodb://%s:%s@localhost:%s/' % (username, password, config['MONGO_PORT']))
db = client['traffic_log']
traffic_data = db['data']

app.register_blueprint(views.home.homePage.homePage)
app.register_blueprint(views.home.monitor.monitor)
app.register_blueprint(views.home.capture.capture)
app.register_blueprint(views.home.about.about)
app.register_blueprint(views.home.contact.contact)

app.register_blueprint(views.projects.index.projectsIndex)
app.register_blueprint(views.projects.fuelprices.fuelprices)
app.register_blueprint(views.projects.mrna.mrna)
app.register_blueprint(views.projects.property.property)
app.register_blueprint(views.projects.randomBio.randomBio)
app.register_blueprint(views.projects.secondary.secondary)
app.register_blueprint(views.projects.seqAlign.seqAlign)

app.register_blueprint(views.blog.blogIndex.blogIndex)
app.register_blueprint(views.blog.login.login)
app.register_blueprint(views.blog.register.register)
app.register_blueprint(views.blog.refresh.refresh)
app.register_blueprint(views.blog.logout.logout)
app.register_blueprint(views.blog.post.post)
app.register_blueprint(views.blog.post_search.post_search)
app.register_blueprint(views.blog.user_search.user_search)





# @app.route('/analytics', methods=['GET', 'OPTIONS'])
# @scripts.utils.decorators.errorHandle
# def analyticsHome():
#   if request.method == 'GET':
#     kwargs = {
#       'success': True,
#       'data': {
#         'platformVisits': {
#           'Linux': 3,
#           'Windows': 5,
#           'OSX': 1
#         },
#         'browserVisits': {
#           'Firefox': 10,
#           'Chrome': 7,
#           'Edge': 3
#         },
#         'uniqueVisits': 7,
#         'allVisits': 20,

#       }
#     }
#     res = jsonify(kwargs)
#     return scripts.utils.responses.build_actual_response(res)
#   elif request.method == 'OPTIONS': 
#     return scripts.utils.responses.build_preflight_response()
#   else:
#     raise RuntimeError('Method not allowed')

# @app.route('/heatmap', methods=['GET', 'OPTIONS'])
# @scripts.utils.decorators.errorHandle
# def heatmapHome():
#   if request.method == 'GET':
#     arr = []
#     allSubs = scripts.utils.databaseUtils.call()
#     priceMin = 200000
#     priceMax = 2000000

#     for sub in allSubs:
#       try:
#         price = scripts.utils.databaseUtils.call({'suburb': sub['suburb']}, 'price')
#         price = price[0]['pricedata']['mean_means']
#       except:
#         continue
#       mean = priceMin*(price<priceMin) + priceMax*(price>priceMax) + (price>priceMin)*(price<priceMax)*price
#       #col = ((mean-priceMin)/(priceMax-priceMin))*255
#       col = scripts.utils.rgb.rgb(priceMin, priceMax, mean)
#       bounds = sub['bounds']
#       boundsCorrected = map(lambda x: {'lat': x[1], 'lng': x[0]}, bounds)
#       arr.append({'suburb': sub['suburb'], 'price': price, 'colour': ''.join([hex(c)[-2:].replace('x','0') for c in col]), 'bounds': list(boundsCorrected)})
#       kwargs={'data':arr}
#       res = jsonify(kwargs)
#       return scripts.utils.responses.build_actual_response(res)
#   elif request.method == 'OPTIONS': 
#     return scripts.utils.responses.build_preflight_response()
#   else:
#     raise RuntimeError('Method not allowed')
    
# @app.route('/stocks/', methods=['GET', 'POST'])
# def stocksHome():
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

if __name__ == '__main__':
  if config['ENV'] == 'development':
    app.run(host='0.0.0.0', port=config['DEV_PORT'], debug=True)
  elif config['ENV'] == 'production':
    app.run(host='0.0.0.0', port=config['PROD_PORT'], debug=False)