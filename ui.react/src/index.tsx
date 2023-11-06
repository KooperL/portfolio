// import { StrictMode } from "react";
import { createRoot } from 'react-dom/client'
// import { Provider } from 'react-redux';
// import { createStore } from 'redux'
import './index.css'
import App from './containers/App/App'
// import configureAppStore from "./store/configureStore";

// const store = configureAppStore

const rootElement = document.getElementById('root')
// @ts-ignore
const root = createRoot(rootElement)

root.render(
  // <Provider store={store}>
  <App />,
  //  </Provider>
)
