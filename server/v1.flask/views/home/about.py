from flask import Blueprint, render_template, jsonify, request
import scripts.utils.decorators
import scripts.utils.responses


about = Blueprint('about', __name__)

@about.route('/about', methods=['GET', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.rateLimit
def aboutHome():
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
          'type': 'subheader',
          'data': [
            'I update it constantly to demonstrate my comprehension of new technologies I am learning.',
            'If you\'re just here for a quick visit, you might be more interested in browsing some of my favourite projects.',
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
          'type': 'body',
          'data': [
            'Initially created in July 2020 during my Honours year, this started from scratch as a hobby, secondary only to my studies. As I learned more, it ate more of my free time and continued to evolve. ',
            'It is designed with functionality and design over speed and SEO. This was a deliberate trade off to demonstrate experience with many technologies. ',
            'This is the perfect place for me to apply the skills and techniques I learn both recreationally and professionally. ',
            'Above all, creating this website, and making projects for it has taught me two things: 1) Each component of a website stack/CS domain is deep enough to spend an entire career to perfect, and 2) I want to spend my career in the frontend. ',
            'This is my roadmap\'s destination and ultimately this webiste will reflect where I place on that roadmap. ',
          ]
        },
        {
          'type': 'body',
          'data': [
            'Here\'s some information on what is being used to serve this website to you:',
          ]
        },
        {
          'type': 'unorderedList',
          'data': [
            'Domain registration and namespace mapping through GoDaddy 📝',
            'Servers are deployed and hosted on a VPS 🖥️',
            'Version control and storage managed with Git/Github 📆',
            'SSL certification and other security through Cloudflare 🕵️',
            'Sqlite (SQL) and MongoDB (noSQL) as databases/backends 💽',
            'Flask HTTP → WSGI server as a middleware API 🤖',
            'Front end is written with React in Typescript 💄',
            'Stack served to you and all with NGINX Unit 🧠',
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
