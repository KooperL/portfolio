#!/bin/sh

current_dir="$(pwd)"
domain="kooperlingohr.com"
environment="development"
flask_port="5000"

# Run this file as a super user
# This will not handle database creation

crons="
@reboot !cd $current_dir/server/v1.flask/ && /usr/bin/python3 $current_dir/server/v1.flask/app.py\n
@reboot /bin/bash $current_dir/kill_and_exec.sh"

crontab -l >> tempfile
echo crons >> tempfile
crontab tempfile
rm tempfile

nginx_conf="user www-data;\n
worker_processes auto;\n
pid /run/nginx.pid;\n
include /etc/nginx/modules-enabled/*.conf;\n
\n
events {\n
        worker_connections 768;\n
}\n
\n
http {\n
        sendfile on;\n
        tcp_nopush on;\n
        types_hash_max_size 2048;\n
        include /etc/nginx/mime.types;\n
        default_type application/octet-stream;\n
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE\n
        ssl_prefer_server_ciphers on;\n
        access_log /var/log/nginx/access.log;\n
        error_log /var/log/nginx/error.log;\n
        gzip on;\n
        include /etc/nginx/conf.d/*.conf;\n
}"

nginx_backend_frontend="server {\n
  listen       80;\n
  server_name $domain;\n
  return 301 \$scheme://www.github.com/KooperL;\n
}\n
\n
server {\n
  listen       80;\n
  server_name  experimental.$domain;\n
\n
  location /api/v1 {\n
    proxy_set_header X-Real-IP \$remote_addr;\n
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;\n
    proxy_set_header X-Forwarded-Proto \$scheme;\n
    proxy_set_header X-Forwarded-Host \$host;\n
    proxy_set_header X-Forwarded-Prefix \$uri;\n
    proxy_set_header X-NginX-Proxy true;\n
    proxy_pass http://127.0.0.1:$flask_port/;\n
    proxy_ssl_session_reuse off;\n
    proxy_set_header Host \$http_host;\n
    proxy_redirect off;\n
  }\n
\n
  location / {\n
    root   $current_dir/ui.react/build;\n
    index  index.html;\n
    try_files \$uri /index.html;\n
    error_page 404 500 502 503 504 = @fallback;\n
  }\n
\n
  location @fallback {\n
    proxy_pass \$scheme://www.github.com/KooperL;\n
  }\n

}"

nginx_www_redirect="server {\n
    listen 80;\n
    server_name www.$domain;\n
    return 301 \$scheme://$domain$request_uri;\n
}"

echo $nginx_conf > /etc/nginx/nginx.conf
echo $nginx_backend_frontend > /etc/nginx/conf.d/site1.conf
echo $nginx_www_redirect > /etc/nginx/conf.d/site2.conf


server_env_vars="MONGO_USERNAME=\n
MONGO_PASSWORD=\n
MONGO_PORT=\n
GOOGLE_MAPS_API_KEY=\n
ORIGIN=\n
ENV=\n
DEV_PORT=\n
PROD_PORT=\n
forum-register-hash-key=\n
forum-register-salt-length=\n
forum-jwt-auth-token=\n
forum-jwt-refresh-token=\n
forum-access-token-life=\n
forum-refresh-token-life=\n
\n
DISCORD_BOT_TOKEN=\n
DISCORD_SERVER_ID=\n
\n
DISCORD_WEBHOOK_URL=\n
\n
RATE_LIMIT_WINDOW=\n
RATE_LIMIT_REQUESTS_LIMITED=\n
RATE_LIMIT_REQUESTS_GENERAL="

react_env_vars="REACT_APP_DEV_FLASK_API_PORT=$flask_port\n
REACT_APP_NODE_ENV=$environment"

echo $server_env_vars > $current_dir/server/.env
echo $react_env_vars > $current_dir/ui.react/.env
