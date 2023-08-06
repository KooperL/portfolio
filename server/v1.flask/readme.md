# Important
This app uses python 3.9.5

# Getting started

## Installing packages
`pip install virtualenv` to download the module to use a virtual environment.
Create a new venv with `virtualenv flask` and then `source flask/bin/activate` to activate it. This is a shortcut in `portfolio/server/start.sh`

`pip install -r requirements.txt` to download modules.

This does not install `mongoDB` so that should be done separately with the instructions on `https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/`

The conf file in `/etc/mongodb.conf` must point to `portfolio/server/data/mongodb` instead of its default.


## Running
The entry point for this app is `app.py`. Run it with `python app.py`

