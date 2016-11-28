import './styles.css';
import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import RedBox from 'redbox-react';
import {install} from 'offline-plugin/runtime';
import App from './components/App';

install();
renderApp();

if (module.hot) {
  module.hot.accept('./components/App', () => renderApp());
}

function renderApp() {
  render(
    <AppContainer errorReporter={RedBox}>
      <App />
    </AppContainer>,
    document.getElementById('app'),
  );
}
