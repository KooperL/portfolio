# Important
This app uses python 3.x

# Installation
`pip install virtualenv` to download the module to create/activate a virtual environment.

Create a new venv with `virtualenv flask` and then `source flask/bin/activate` to activate it.

`pip install -r requirements.txt` to download modules.

This does not install `mongoDB` so that should be done seperately with the instructions on `https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/`

The conf file in `/etc/mongodb.conf` must point to `{dir}/data/mongodb` instead of its default.
