import React, { Component } from 'react';
import { Provider } from 'react-redux';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from './createStore';
import Header from './containers/header';
import Grid from './containers/grid';

injectTapEventPlugin();

export default class Game extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Provider store={store}>
          <div>
            <Header />
            <Grid
              gridSize={400}
              tileSize={100}
            />
          </div>
          </Provider>
      </MuiThemeProvider>
    );
  }
}
