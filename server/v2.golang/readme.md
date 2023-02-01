# Installing packages
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