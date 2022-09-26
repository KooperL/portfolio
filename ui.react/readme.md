# Important
The app runs into errors when being built with node versions below v14.4.0.

# Installation
This app uses `npm` as the default package manager. Install node dependencies with `npm install`. The entry point for the app is `index.tsx`


## Env
The app can be build with in the following environments: `production`, `system integration testing` and `development`. Map the contexts with environment variables, This can be done in a `.env` file or through appending to the `start`/`build` script alias' in `package.json` (demonstrated below, but letter implemented). To add more keys, use this prefix to automatically load the variable: `REACT_APP_`.
See `../setup.sh` to skip.
```REACT_APP_NODE_ENV=[sit, production, developement]
REACT_APP_DEV_API_PORT:5000```
