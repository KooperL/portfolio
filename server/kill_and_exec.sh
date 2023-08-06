#!/bin/bash

current_dir="$(pwd)"
flask_command="/usr/bin/python3 $current_dir/v1.flask/app.py"
go_command="bash $current_dir/v2.golang/bin/app"

# Check if the Python Flask app is running
if pgrep -x "python3" > /dev/null; then
  pkill -f "$flask_command"
  $flask_command &
fi

if pgrep -x "go" > /dev/null; then
  pkill -f "$go_command"
  $go_command &
fi

# Rust server will go here
