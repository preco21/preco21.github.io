import './styles.css';
import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import RedBox from 'redbox-react';
import App from './components/App';

injectOfflinePlugin();
renderApp();
applyHotLoader();

function renderApp() {
  render(
    <AppContainer errorReporter={RedBox}>
      <App />
    </AppContainer>,
    document.getElementById('app'),
  );
}

function injectOfflinePlugin() {
  if (process.env.NODE_ENV === 'production') {
    const {install} = require('offline-plugin/runtime');

    install();
  }
}

function applyHotLoader() {
  if (module.hot) {
    module.hot.accept('./components/App', renderApp);
  }
}
