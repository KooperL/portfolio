#!/bin/bash

current_dir="$(pwd)"
ui_dir="$current_dir/ui.react"
go_dir="$current_dir/server/v2.golang"

cd "$current_dir"

git fetch origin

if [ "$(git rev-parse HEAD)" != "$(git rev-parse @{u})" ]; then
  git pull origin
  if [ -d "$ui_dir" ]; then
    cd "$ui_dir"
    npm run-script build
  fi

  if [ -d "$go_dir" ]; then
    cd "$go_dir"

    go build -o bin/app
  fi
fi

# Change back to the original working directory
cd "$current_dir"
