# Important
This app uses python 3.x.

# Installation
`pip install virtualenv` to download the module to create/activate a virtual environment.

Create a new venv with `virtualenv flask` and then `source flask/bin/activate` to activate it.

`pip install -r requirements.txt` to download modules.

This does not install `mongoDB` so that should be done seperately with the instructions on `https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/`

The conf file in `/etc/mongodb.conf` must point to `{dir}/data/mongodb` instead of its default.

# Getting started

## Env
A `.env` file is required by the app. It must provide values for the following keys:
```ENV=[development, production]
MONGO_USERNAME=<value>
MONGO_PASSWORD=<value>
MONGO_PORT=<value>
GOOGLE_MAPS_API_KEY=<value>
ORIGIN=<value>
DEV_PORT=5000
PROD_PORT=5000``` 

## CRON
The app leverages scheduled webscrapers. Configure CRON with `sudo crontab -e`. Replace `/DIR/` with the repository location path.

```0 16 * * * /usr/bin/python3 /DIR/portfolio/server/scripts/fuelscrape/fuelscrape.py

0 9 * * * /usr/bin/python3 /DIR/portfolio/server/scripts/fuelscrape/fuelscrape.py

0 1 * * 2 /usr/bin/python3 /DIR/portfolio/server/scripts/property/scrape.py

@reboot cd /DIR/portfolio/server/ && /usr/bin/python3 /DIR/portfolio/server/app.py```

## SQLITE
Tracking for the `data/` folder is now disables, so the same applies for the databases. Run `mkdir data/` and `python initDatabase.py` to create the SQLite3 database file. Edit the file to change its behaviour. By default the important functions are commented out to save me from myself.

## MONGO
Configure the mongodb daemon at `/etc/mongod.conf` and populate the following values.
```storage:
  dbPath: /var/www/portfolio/server/data/mongodb
security:
    authorization: enabled
setParameter:
    enableLocalhostAuthBypass: false
bind_ip = 0.0.0.0```

## Creating the database

## Running
The entry point for this app is `app.py`

# Ideas
https://www.bioinformatics.org/sms2/random_dna.html

# Todo
-find the current dir && `echo >> nginx` and `echo >> cron` 
