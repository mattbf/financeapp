import React from 'react';
import useStockSearch from './useStockSearch.js';
import StockInfo from './StockInfo.js';
import SearchBar from './GeneralComponents/SearchBar.js';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles(
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%",
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }),
);

function HomePage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link to="/testing/1"> testing </Link>
      <SearchBar/>
    </div>
  )
}

export default HomePage
