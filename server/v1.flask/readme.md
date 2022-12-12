# Important
This app uses python 3.9.x

# Installation
`pip install virtualenv` to download the module to use a virtual environment.
Create a new venv with `virtualenv flask` and then `source flask/bin/activate` to activate it. This is a shortcut in `portfolio/server/start.sh`

`pip install -r requirements.txt` to download modules.

This does not install `mongoDB` so that should be done seperately with the instructions on `https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/`

The conf file in `/etc/mongodb.conf` must point to `portfolio/server/data/mongodb` instead of its default.

# Getting started

## Env
A `.env` file is required by the app. See `../setup.sh` to skip. It must provide values for the following keys:
```
ENV=<development | production>
MONGO_USERNAME=<value>
MONGO_PASSWORD=<value>
MONGO_PORT=<value>
GOOGLE_MAPS_API_KEY=<value>
ORIGIN=<value>
DEV_PORT=5000
PROD_PORT=5000
blog-register-hash-key=<value>
blog-register-salt-length=<value>
blog-jwt-auth-token=<value>
blog-jwt-refresh-token=<value>
blog-access-token-life=<value>
blog-refresh-token-life=<value>
```

## CRON
The app leverages scheduled webscrapers. Configure CRON with `sudo crontab -e`. Replace `{{DIR}}` with the repository location path. See `../setup.sh` to skip.

```
0 16 * * * /usr/bin/python3 /{{DIR}}/portfolio/server/v1.flask/scripts/fuelscrape/fuelscrape.py

0 9 * * * /usr/bin/python3 /{{DIR}}/portfolio/server/v1.flask/scripts/fuelscrape/fuelscrape.py

0 1 * * 2 /usr/bin/python3 /{{DIR}}/portfolio/server/v1.flask/scripts/property/scrape.py

@reboot cd /{{DIR}}/portfolio/server/v1.flask/ && /usr/bin/python3 /{{DIR}}/portfolio/server/v1.flask/app.py
```

## SQLITE
Tracking for the `../data/` folder is now disabled, so the same applies for the databases. Run `mkdir ../data/` and `python initDatabase.py` to create the SQLite3 database file. The process executing the database queries is not you, so folder the database resides in must have the correct write permissions, as well as the actual database file. Edit the file to change its behaviour. By default the important functions are commented out to save me from myself.

## MONGO
Configure the mongodb daemon at `/etc/mongod.conf` and populate the following values.
```
storage:
  dbPath: /var/www/portfolio/server/data/mongodb
security:
    authorization: enabled
setParameter:
    enableLocalhostAuthBypass: false
bind_ip = 0.0.0.0
```

## Running
The entry point for this app is `app.py`

# Ideas
https://www.bioinformatics.org/sms2/random_dna.html

