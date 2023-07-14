from functools import wraps
from lib2to3.pytree import Base
from nis import cat
from tokenize import Number
from threading import Lock
from typing import final
import urllib.parse
import threading

import os
from dotenv import dotenv_values
config = dotenv_values('../.env')
appDir = os.getcwd()

from flask import Flask, render_template, request, redirect, url_for, flash, make_response, session, jsonify

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

import controllers.discordLogger

import views.cms.aboutPage
import views.cms.contactPage
import views.cms.fuelpricesPage
import views.cms.homePage
import views.cms.jssimulatorPage
import views.cms.minesweeperPage
import views.cms.mrnaPage
import views.cms.projectsPage
import views.cms.propertyPage
import views.cms.randombioPage
import views.cms.secondaryPage
import views.cms.seqalignPage
import views.cms.tictactoePage

import views.home.contact
import views.home.capture
import views.home.monitor
import views.projects.fuelprices
import views.projects.mrna
import views.projects.property
# import views.projects.property_search
import views.projects.randomBio
import views.projects.secondary
import views.projects.seqAlign
import views.projects.siteAnalysis
import views.forum.forumIndex
import views.forum.register
import views.forum.login
import views.forum.logout
import views.forum.post
import views.forum.post_search
import views.forum.refresh
import views.forum.user_search


app = Flask(__name__)
app.wsgi_app = ProxyFix(
  app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
)


username = urllib.parse.quote_plus(config['MONGO_USERNAME'])
password = urllib.parse.quote_plus(config['MONGO_PASSWORD'])
client = MongoClient('mongodb://%s:%s@localhost:%s/' % (username, password, config['MONGO_PORT']))
db = client['traffic_log']
traffic_data = db['data']

app.register_blueprint(views.home.monitor.monitor)
app.register_blueprint(views.home.capture.capture)
app.register_blueprint(views.home.contact.contact)

app.register_blueprint(views.cms.aboutPage.aboutCms)
app.register_blueprint(views.cms.contactPage.contactCms)
app.register_blueprint(views.cms.fuelpricesPage.fuelpricesCms)
app.register_blueprint(views.cms.homePage.homeCms)
app.register_blueprint(views.cms.jssimulatorPage.jssimulatorCms)
app.register_blueprint(views.cms.minesweeperPage.minesweeperCms)
app.register_blueprint(views.cms.mrnaPage.mrnaCms)
app.register_blueprint(views.cms.projectsPage.projectsCms)
app.register_blueprint(views.cms.propertyPage.propertyCms)
app.register_blueprint(views.cms.randombioPage.randombioCms)
app.register_blueprint(views.cms.secondaryPage.secondaryCms)
app.register_blueprint(views.cms.seqalignPage.seqalignCms)
app.register_blueprint(views.cms.tictactoePage.tictactoeCms)

app.register_blueprint(views.projects.fuelprices.fuelprices)
app.register_blueprint(views.projects.mrna.mrna)
app.register_blueprint(views.projects.property.property)
app.register_blueprint(views.projects.randomBio.randomBio)
app.register_blueprint(views.projects.secondary.secondary)
app.register_blueprint(views.projects.seqAlign.seqAlign)
app.register_blueprint(views.projects.siteAnalysis.siteAnalysis)

app.register_blueprint(views.forum.forumIndex.forumIndex)
app.register_blueprint(views.forum.login.login)
app.register_blueprint(views.forum.register.register)
app.register_blueprint(views.forum.refresh.refresh)
app.register_blueprint(views.forum.logout.logout)
app.register_blueprint(views.forum.post.post)
app.register_blueprint(views.forum.post_search.post_search)
app.register_blueprint(views.forum.user_search.user_search)

if __name__ == '__main__':

  if config['ENV'] == 'development':
    app.run(host='0.0.0.0', port=config['DEV_PORT'], debug=True)
  elif config['ENV'] == 'production':
    app.run(host='0.0.0.0', port=config['PROD_PORT'], debug=False)
