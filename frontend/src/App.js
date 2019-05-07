import React, {Fragment} from 'react';
import StockSearch from './StockSearch.js';
import StockInfo from './StockInfo.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchBar from './SearchBar.js';
import HomePage from './HomePage.js';

import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

function App() {

  return (
    <Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <HomePage/>
      </MuiThemeProvider>
    </Fragment>
  );
}

export default App;
