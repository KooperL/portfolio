import logging
from logging.handlers import RotatingFileHandler

from dotenv import dotenv_values
config = dotenv_values('../.env')

logger = logging.getLogger(__name__)
file_handler = RotatingFileHandler('../../logs/api.log', maxBytes=1024 * 1024 * 100, backupCount=20)
file_handler.setFormatter(logging.Formatter('%(asctime)s [%(levelname)s] v1.flask (%(pathname)s:%(lineno)d) -  %(message)s ', datefmt='%Y-%m-%d %H:%M:%S'))
if config['ENV'] == 'development':
  file_handler.setLevel(logging.DEBUG)
else:
  file_handler.setLevel(logging.WARNING)

logger.addHandler(file_handler)