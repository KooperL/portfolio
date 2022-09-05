NGINX config `/etc/nginx/conf.d/site1.conf`

```server {
    listen       80;
    server_name  kooperlingohr.com;
    location / {
        root   /var/www/app-react/build;
        index  index.html;
        try_files $uri /index.html;
    }
#     location / {
#        proxy_pass  http://127.0.0.1:3000/;
#    }
}```

CRONs

`@reboot cd /var/www/app-react/ && npm run start`









todo

-find this dir && echo >> nginx
- react local port and python flask port from same env 
- neg text on settings modal
- hover mouse effect on modal






FOR FLASK

NGINX CONFIG `/etc/nginx/conf.d/site2.conf`
```server {
    listen       80;
    server_name  api.kooperlingohr.com;
    location / {
        proxy_pass  http://127.0.0.1:5000/;
    }
}```

CRONs
```0 16 * * * /usr/bin/python3 /var/www/app/fuelscrape/fuelscrape.py

0 9 * * * /usr/bin/python3 /var/www/app/fuelscrape/fuelscrape.py

0 1 * * 2 /usr/bin/python3 /var/www/app/property/new/scrape.py

@reboot /usr/bin/python3 /var/www/app/app.py```



HELP: https://stackoverflow.com/questions/62166918/node-wont-change-to-newest-version-14-4-0
TODO: 
https://stackoverflow.com/questions/63307181/react-nginx-reverse-proxy-and-docker-giving-404
https://stackoverflow.com/questions/6417036/track-mouse-speed-with-js
https://stackoverflow.com/questions/61334832/how-to-use-a-svg-react-component-as-background

ISSUES:
Iframe: https://stackoverflow.com/questions/18373592/iframe-contents-cant-appear-in-firefox