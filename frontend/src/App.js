import React, {Fragment} from 'react';
import useStockSearch from './useStockSearch.js';
import StockInfo from './StockInfo.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchBar from './SearchBar.js';
import HomePage from './HomePage.js';
import GlobalRouter from './GlobalRouter.js';

import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    //type: 'dark',
    primary: {
      main: '#000000',
    }, // Purple and green play nicely together.
    secondary: { main: '#d50000' }, // This is just green.A700 as hex.
  },
});

function App() {

  return (
    <Fragment>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalRouter/>
      </MuiThemeProvider>
    </Fragment>
  );
}

export default App;
