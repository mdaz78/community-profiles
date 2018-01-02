import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes.jsx';
import store, { history } from './store';
require('../public/stylesheets/base.scss');

/* eslint-disable */
ReactDOM.render(
  <Provider store={store}>
    <Router children={routes(store)} history={history} />
  </Provider>
  , document.getElementById('app')
);
/* eslint-enable */