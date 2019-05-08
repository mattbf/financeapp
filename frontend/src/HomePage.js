import React from 'react';
import StockSearch from './StockSearch.js';
import StockInfo from './StockInfo.js';
import SearchBar from './SearchBar.js';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }),
);

function HomePage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>

      <SearchBar/>
    </div>
  )
}

export default HomePage
