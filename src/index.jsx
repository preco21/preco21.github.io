import './styles.css';
import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import RedBox from 'redbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/App';

if (process.env.NODE_ENV === 'production') {
  const {install} = require('offline-plugin/runtime');
  install();
}

injectTapEventPlugin();
renderApp();

if (module.hot) {
  module.hot.accept('./components/App', renderApp);
}

function renderApp() {
  render(
    <AppContainer errorReporter={RedBox}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('app'),
  );
}
