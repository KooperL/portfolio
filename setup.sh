#!/bin/sh

current_dir="$(pwd)"
domain="kooperlingohr.com"
environment="development"
backendport="5000"

# Run this file as a super user
# This will not handle database creation

crons="#0 16 * * * !/usr/bin/python3 $current_dir/server/v1.flask/scripts/fuelscrape/fuelscrape.py

#0 9 * * * !/usr/bin/python3 $current_dir/server/v1.flask/scripts/fuelscrape/fuelscrape.py

#0 1 * * 2 !/usr/bin/python3 $current_dir/server/v1.flask/scripts/property/scrape.py

# 0 * * * * !/bin/bash $current_dir/pull_and_build.sh
# 5 * * * * !/bin/bash $current_dir/server/kill_and_exec.sh

@reboot !cd $current_dir/server/v1.flask/ && /usr/bin/python3 $current_dir/server/v1.flask/app.py

@reboot /bin/bash $current_dir/kill_and_exec.sh"

crontab -l >> tempfile
echo crons >> tempfile
crontab tempfile
rm tempfile


nxinx1="server {
  listen       80;
  server_name  $(domain);
  location /api/v1 {
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_set_header X-Forwarded-Host \$host;
    proxy_set_header X-Forwarded-Prefix \$uri;
    proxy_set_header X-NginX-Proxy true;
    proxy_pass http://127.0.0.1:$backendport/;
    proxy_ssl_session_reuse off;
    proxy_set_header Host \$http_host;
    proxy_redirect off;
  }
  location / {
    root   $current_dir/ui.react/build;
    index  index.html;
    try_files \$uri /index.html;
  }
}"

nxinx2="server {
    listen 80;
    server_name www.$(domain);
    return 301 $scheme://$(domain)$request_uri;
}"

echo $nginx1 > /etc/nginx/conf.d/site1.conf

echo $nginx2 > /etc/nginx/conf.d/site2.conf


mkdir $current_dir/server/data

serverdotenv="MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_PORT=
GOOGLE_MAPS_API_KEY=
ORIGIN=
ENV=$environment
PROD_PORT=$backendport
DISCORD_WEBHOOK_URL=
RATE_LIMIT_WINDOW=
RATE_LIMIT_REQUESTS_LIMITED=
RATE_LIMIT_REQUESTS_GENERAL="
echo $serverdotenv > $current_dir/server/.env

reactdotenv="REACT_APP_DEV_FLASK_API_PORT=$backendport
REACT_APP_NODE_ENV=$environment"

echo $reactdotenv > $current_dir/ui.react/.env
