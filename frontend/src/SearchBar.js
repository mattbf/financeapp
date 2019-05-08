import React, {useEffect, useState} from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import useStockSearch from './useStockSearch.js';

import {
  Paper,
  InputBase,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core'

import {
  Menu,
  Search,
  Directions,
} from '@material-ui/icons'

const useStyles = makeStyles(
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
      marginTop: 50,
    },
    input: {
      marginLeft: 8,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      width: 1,
      height: 28,
      margin: 4,
    },
  }),
);

function CustomizedInputBase() {
  const classes = useStyles();
  const [keywords, setKeywords] = useState('test ')
  const [results, setResults] = useState()
  const res = useStockSearch(keywords);

  useEffect((keywords) => {

    setResults(res)
    // console.log("results at search: ")
    // console.log(results)
  }, [res])
  console.log(res.results)
  return (
    <div>
      <Paper className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="Menu">
          <Menu />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search"
          value={keywords}
          onChange={e => setKeywords(e.target.value)}
         />
        <IconButton className={classes.iconButton} aria-label="Search">
          <Search />
        </IconButton>
        <Divider className={classes.divider} />
        <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
          <Directions />
        </IconButton>
      </Paper>
      <Typography>
        Results:
        {res.isSearched ?
        <ul>
        {res.results.data.bestMatches.map((match, index) =>
          <li key={index}> {match["1. symbol"]} </li>
        )}
        </ul>
         :
         "Broaden your search"
        }

      </Typography>
    </div>
  );
}

export default CustomizedInputBase;

// {keywords !== " " && res.results.data ?

// {keywords !== " " && results.results.data ?
// <ul>
// {results.results.data.bestMatches.map((match, index) =>
//   <li key={index}> {match["1. symbol"]} </li>
// )}
// </ul>
//  :
//  "Broaden your search"
// }
