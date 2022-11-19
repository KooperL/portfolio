from flask import Blueprint, render_template, jsonify, request
import scripts.utils.decorators
import scripts.utils.responses
import datetime
import controllers.database


contact = Blueprint('contact', __name__)

@contact.route('/contact', methods=['GET', 'POST', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
def contactHome():
  if request.method == 'GET':
    kwargs = {
      'success': True,
      'data': [
        {
          'type': 'emoji',
          'data': [
            '😵‍💫',
          ]
        },
        {
          'type': 'subheader',
          'data': [
            'Aw, snap! Something went wrong...',
          ]
        },
        {
          'type': 'body',
          'data': [
            'You should probably contact me to let me know you found this error. My preferred method of contact is LinkedIn:',
          ]
        },
        {
          'type': 'button',
          'text': 'LinkedIn',
          'data': [
            'https://www.linkedin.com/in/kooper/',
          ]
        },
        {
          'type': 'body',
          'data': [
            'Alternatively, leave an anonymous message. If you\'re expecting a reply though, be sure to include your email too.',
          ]
        }
      ]
    }
    res = jsonify(kwargs)
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'POST':
    data = request.get_json()
    # session_id = request.args.get('session_id')
    # message = request.args.get('message')
    # if not all([session_id, message]):
    if 'session_id' not in data and 'message' not in data:
      raise RuntimeError('Mandatory value(s) not provided')
    session_id = data.get('session_id')
    message = data.get('message')
    insertQuery = 'INSERT INTO contact_messagesDB VALUES (?, ?, ?, ?);'
    # controllers.database.conn.execute(insertQuery, (None, datetime.datetime.now(), session_id, message))
    # controllers.database.conn.commit()
    controllers.database.conn.insert(insertQuery, (None, datetime.datetime.now(), session_id, message))
    # print(list(controllers.database.conn.execute(f'SELECT * FROM contactMessagesDB ORDER BY id DESC LIMIT 200')))
    kwargs = {
      'success': True,
    }
    res = jsonify(kwargs)
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')