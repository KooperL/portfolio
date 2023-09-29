from werkzeug.local import LocalProxy
from flask import current_app
from logging.config import dictConfig
from psutil import cpu_percent, virtual_memory
import flask
from flask import request
from datetime import datetime
import threading

def getRequestContext():
    if flask.has_request_context():
        newStr = f"{request.remote_addr} {request.headers.get('X-Request-ID')}"
        return newStr
    return 

logging_schema = {
  "version": 1,
  "formatters": {
    "default": {
      "format": f"[%(asctime)s] [%(levelname)s | %(module)s] [{threading.current_thread().ident}] [c{cpu_percent():02.0f}m{virtual_memory().percent:02.0f}] %(message)s",
      "datefmt": "%B %d, %Y %H:%M:%S",
    },
  },
  "handlers": {
    "console": {
      "class": "logging.StreamHandler",
      "formatter": "default",
    },
    "file": {
      "class": "logging.FileHandler",
      "filename": f"logs/{datetime.now():%Y-%m-%d}-out.log",
      "formatter": "default",
    },
  },
  "root": {
  "level": "INFO",
     "handlers": ["console", "file"]
  },
}

dictConfig(logging_schema)

logger = LocalProxy(lambda: current_app.logger)
