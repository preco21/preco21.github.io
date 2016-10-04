import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import AppThemeWrapper from './components/AppThemeWrapper';

let errorReporter = null;

if (process.env.NODE_ENV !== 'production') {
  errorReporter = require('redbox-react');
}

ReactDOM.render(
  <AppContainer errorReporter={errorReporter}>
    <AppThemeWrapper />
  </AppContainer>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}
