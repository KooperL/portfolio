from flask import Blueprint, render_template, jsonify, request, json
import scripts.utils.decorators
import scripts.utils.responses
import datetime
import controllers.database
import controllers.discordLogger
from dotenv import dotenv_values

config = dotenv_values('../.env')

contact = Blueprint('contact', __name__)

@contact.route('/contact', methods=['GET', 'POST', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.rateLimit
def contactHome():
  if request.method == 'POST':
    data = request.get_json()
    # session_id = request.args.get('session_id')
    # message = request.args.get('message')
    # if not all([session_id, message]):
    if 'session_id' not in data and 'message' not in data:
      raise RuntimeError('Mandatory value(s) not provided')
    session_id = data.get('session_id')
    message = data.get('message')
    controllers.discordLogger.send_discord_message(config['DISCORD_WEBHOOK_URL'], f'CONTACT POST: {session_id}, {message}')    

    insertQuery = 'INSERT INTO contact_messages VALUES (?, ?, ?, ?);'
    controllers.database.conn.insert(insertQuery, (None, datetime.datetime.now(), session_id, message))
    kwargs = {
      'success': True,
    }
    res = jsonify(kwargs)
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')
