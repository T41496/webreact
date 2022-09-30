import React, { Component, Suspense } from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import Base from "./components/Base";
import store from "./store";
import { createBrowserHistory as createHistory } from "history";
import "react-redux-notify/dist/ReactReduxNotify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { withNamespaces  } from "react-i18next";

import {HelmetProvider, Helmet} from 'react-helmet-async';

import "./i18n";

const history = createHistory();
function App ({ t }) {
    return (
      
      <Provider store={store}>
        <Router history={history}>
            <Base />
        </Router>
      </Provider> 
    );
  }


export default withNamespaces()(App);
