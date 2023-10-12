# Introduction

Welcome to my repo. This is the guts of my portfolio, I update it constantly to reflect my comprehension of programming and computer science. After many commits and revisions, I am proud to switch this to public and advertise my competency.

Find the website here: [kooperlingohr.com](https://kooperlingohr.com)


## Structure

The backend server was build with Python and Flask, but has since been rewritten in Go and Rust. Find them at `server/` with documentation.
The front end of the website is made with React and Typescript. Navigate to `ui.react/` for more information.



## Dependencies

```
apt get update
apt get upgrade
apt install nginx python3-pip

# In the python directory:
pip3 install -r requirements.txt --break-system-packages

wget -c https://dl.google.com/go/go1.14.2.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
echo "export PATH=$PATH:/usr/local/go/bin" > ~/.profile
```

## Serve

NGINX is required to serve the app. Make sure the programs above are downloaded.
Run the `setup.sh` file to configure files which are either ignored or fall outside the project's scope. The script uses the current directory as a reference, so be sure to be in `portfolio/` when you run it.
