# Installing packages
Add the module to `$GOPATH` with `export GOPATH=/project/gopath`
Run `go mod tidy` to download all required packages

# Compiling
Run `go build -o bin/app` to create an executable file named `bin/app`. 

# Adding a systemd unit file
Touch and edit `/lib/systemd/system/goweb.service`

Add the following code:
```
[Unit]
Description=goweb

[Service]
Type=simple
Restart=always
RestartSec=5s
ExecStart=/path/to/directory/server/v2.golang/bin/app

[Install]
WantedBy=multi-user.target
```

Enable service starting on system reboot with: `sudo systemctl enable goweb`


# Instantiating MySQL
<!-- https://stackoverflow.com/questions/14098242/mysql-new-user-access-denied#14098261 -->
Login to MySQL
`mysql -u root -p`

Create a MySQL user
`CREATE USER 'username'@'ip' IDENTIFIED BY '*password*';`

Allow full control to that user
`GRANT ALL PRIVILEGES ON * . * TO 'username'@'ip';`

Reloading the privileges tables
`FLUSH PRIVILEGES;`

Run `CREATE DATABASE chatApp; USE chatApp; source ../schema.sql;` to create the tables.