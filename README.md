## Introduction
Welcome to my repo. This is the guts of my portfolo, I update it constantly to reflect my comprehension of programming and computer science. After many commits and revisions, I am proud to switch this to public and advertise my competency.


## Structure 
The backend server is a build with Python and Flask. Find it at `server/` and find documentation there.
The front end of the website is made with React and Typescipt. Navigate to `ui.react/` for more information.


# Build
Edit the `NGINX CONFIG` file, found at `/etc/nginx/conf.d/site1.conf` to configure the serve the site properly.
```server {
  listen       80;
  server_name  kooperlingohr.com;                                           # Update to desired domain/subdomain
  location /api/ {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;
    proxy_pass http://127.0.0.1:PORT/;                                      # Update to Flask port, see `portfolio/server/.env`
    proxy_ssl_session_reuse off;
    proxy_set_header Host $http_host;
    proxy_redirect off;
  }
  location / {
    root   /DIR/portfolio/ui.react/build;                                   # Update to directory
    index  index.html;
    try_files $uri /index.html;
  }
}```