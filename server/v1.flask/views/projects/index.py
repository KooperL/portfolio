from flask import Blueprint, render_template, jsonify, request
import scripts.utils.decorators
import scripts.utils.responses
import scripts.utils.structs


projectsIndex = Blueprint('projectsIndex', __name__)

@projectsIndex.route(f'/{scripts.utils.structs.projectsPath}', methods=['GET', 'OPTIONS'])
@scripts.utils.decorators.errorHandle
@scripts.utils.decorators.rateLimit
def projectsHome():
  if request.method == 'GET':
    dataNew = [
      {
        "data": [
          "React apps"
        ],
        "type": "subheader"
      },
      {
        "type": "buttonArr",
        "data": [
          {
            "data": [
              f"/{scripts.utils.structs.projectsPath}/tictactoe"
            ],
            "text": "Tictactoe",
            "type": "button"
          },
          {
            "data": [
              f"/{scripts.utils.structs.projectsPath}/minesweeper"
            ],
            "text": "Minesweeper",
            "type": "button"
          },
          {
            "data": [
              f"/{scripts.utils.structs.projectsPath}/jssimulator"
            ],
            "text": "Front-end dev simulator",
            "type": "button"
          }
        ]
      },
      {
        "data": [
          "Data Storage and Analysis"
        ],
        "type": "subheader"
      },
      {
        "type": "buttonArr",
        "data": [
          {
            "data": [
              f"/{scripts.utils.structs.projectsPath}/fuelprices"
            ],
            "text": "UL91 Fuel Price trends",
            "type": "button"
          },
          {
            "data": [
              f"/{scripts.utils.structs.projectsPath}/property"
            ],
            "text": "Real estate data interface",
            "type": "button"
          },
        ]
      },
      {
        "data": [
          "Bioinformatics"
        ],
        "type": "subheader"
      },
      {
        "type": "buttonArr",
        "data": [
          {
            "data": [
              f"/{scripts.utils.structs.projectsPath}/mrna"
            ],
            "text": "DNA:mRNA decoder",
            "type": "button"
          },
          {
            "data": [
              f"/{scripts.utils.structs.projectsPath}/secondary"
            ],
            "text": "Protein 2° Structure",
            "type": "button"
          },
          {
            "data": [
              f"/{scripts.utils.structs.projectsPath}/seqalign"
            ],
            "text": "Pairwise sequence alignment",
            "type": "button"
          },
          {
            "data": [
              f"/{scripts.utils.structs.projectsPath}/randombio"
            ],
            "text": "DNA sequence generator",
            "type": "button"
          },
        ]
      },
      {
        "data": [
          "Repos"
        ],
        "type": "subheader"
      },
      {
        "type": "buttonArr",
        "data": [
          {
            "data": [
              "https://github.com/KooperL/portfolio"
            ],
            "text": "This Website",
            "type": "button"
          },
          {
            "data": [
              "https://github.com/KooperL/trafficCounter"
            ],
            "text": "AI Traffic Counter",
            "type": "button"
          },
          {
            "data": [
              "https://github.com/KooperL/tkinter3dengine"
            ],
            "text": "Python/Tkinter 3d Engine",
            "type": "button"
          },
          {
            "data": [
              "https://github.com/KooperL/tkinterAstar"
            ],
            "text": "A* Path finder py",
            "type": "button"
          }
        ]
      }
    ]
    kwargs = {
      'success': True,
      'data': dataNew
    }
    res = jsonify(kwargs)
    return scripts.utils.responses.build_actual_response(res)
  elif request.method == 'OPTIONS': 
    return scripts.utils.responses.build_preflight_response()
  else:
    raise RuntimeError('Method not allowed')