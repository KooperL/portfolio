from flask import Blueprint, render_template, jsonify, request
import scripts.utils.decorators
import scripts.utils.responses


homePage = Blueprint('homePage', __name__)

@homePage.route('/home', methods=['GET', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
def homeHome():
  if request.method == 'GET':
    kwargs = {
      'success': True,
      'data': [
        {
          'type': 'header',
          'data': [
            'Hi 👋 I\'m Kooper, welcome to my website.',
          ]
        },
        {
          'type': 'button',
          'text': '/projects',
          'data': [
            '/projects',
          ]
        },
        {
          'type': 'button',
          'text': '/contact',
          'data': [
            '/contact',
          ]
        },
        {
          'type': 'button',
          'text': '/about',
          'data': [
            '/about',
          ]
        },
        {
          'type': 'button',
          'text': '/blog',
          'data': [
            '/blog',
          ]
        }
      ]
    }
    res = jsonify(kwargs)
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')