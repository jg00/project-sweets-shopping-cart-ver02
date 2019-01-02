import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import BaseLayout from "./components/BaseLayout";
import "./index.css";
import reducer from "./store/reducer";

import authReducer from "./store/reducers/authReducer";
import registerReducer from "./store/reducers/registerReducer";
// import resultReducer from "./store/reducers/result";

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  red: reducer // needs to be broken down
});

const logger = store => {
  return next => {
    return action => {
      console.log("Middleware: Dispatching", action);
      const result = next(action);
      console.log("Middleware next state ", store.getState());
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

// const store = createStore(
//   reducer,
//   composeEnhancers(applyMiddleware(logger, thunk))
// );

// let store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <BaseLayout />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
