# Installing packages

Run `go mod tidy` to download all required packages

# Compiling

Run `go build main.go` to create an executable file named `main` (required as per `.gitignore`). 

# Adding a systemd
Edit `/lib/systemd/system/goweb.service`

Add the following code:
`[Unit]
Description=goweb

[Service]
Type=simple
Restart=always
RestartSec=5s
ExecStart=/path/to/directory/server/v2.golang/main

[Install]
WantedBy=multi-user.target`

Enable service starting on system reboot with: `sudo systemctl enable mongod`