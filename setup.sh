#!/bin/sh

domain="kooperlingohr.com"
environment="development"
flaskdevport="5000"
flaskprodport="5000"

# Run this file as a super user
# This will not handle database creation

crons="0 16 * * * /usr/bin/python3 $(pwd)/server/scripts/fuelscrape/fuelscrape.py

0 9 * * * /usr/bin/python3 $(pwd)/server/scripts/fuelscrape/fuelscrape.py

0 1 * * 2 /usr/bin/python3 $(pwd)/server/scripts/property/scrape.py

@reboot cd $(pwd)/server/ && /usr/bin/python3 $(pwd)/server/app.py"
crontab -l >> tempfile
echo crons >> tempfile
crontab tempfile
rm tempfile


nxinx="server {
  listen       80;
  server_name  $(domain);
  location /api/ {
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;
    proxy_pass http://127.0.0.1:$flaskprodport/;
    proxy_ssl_session_reuse off;
    proxy_set_header Host \$http_host;
    proxy_redirect off;
  }
  location / {
    root   $(pwd)/ui.react/build;
    index  index.html;
    try_files \$uri /index.html;
  }
}"

echo $nginx > /etc/nginx/conf.d/site1.conf
mkdir $(pwd)/server/data

flaskdotenv="MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_PORT=
GOOGLE_MAPS_API_KEY=
ORIGIN=
ENV=$environment
DEV_PORT=$flaskdevport
PROD_PORT=$flaskprodport"

echo $flaskdotenv > $(pwd)/server/.env

reactdotenv="REACT_APP_DEV_FLASK_API_PORT=$flaskdevport
REACT_APP_NODE_ENV=$environment"

echo $reactdotenv > $(pwd)/ui.react/.env