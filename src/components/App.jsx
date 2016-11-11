import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './Main';
import Background from './Background';

class App extends Component {
  componentWillMount() {
    injectTapEventPlugin();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Main />
          <Background />
        </div>
      </MuiThemeProvider>
    );
  }
}

export {
  App as default,
};
