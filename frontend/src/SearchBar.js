import React, {useEffect, useState, createRef, useRef} from 'react';
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

import StockAPI from './StockAPI.js';

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
    statusDiv: {
      display: 'absolute',
      marginTop: '25px',
      marginLeft: '25px',
    }
  }),
);

function CustomizedInputBase() {
  const classes = useStyles();
  const searchRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  //const [keywords, setKeywords] = useState("mic")
  const [params, setParams] = useState({
    apikey: 'B62IP93O6OGM4LCA',
    function: 'SYMBOL_SEARCH',
    keywords: "",
  })
  const [req, setReq] = useState({
    method: 'GET',
    url: 'http://localhost:8000/api/stocks/',
    params: params
  })
  //const results = useStockSearch(keywords)
  const [results, setResults] = useState([])
  const {response, doPost} = StockAPI();
  // useEffect(() => {
  //   console.log(results)
  // }, [keywords])
    useEffect(() => {
    setReq({
      method: 'GET',
      url: 'http://localhost:8000/api/stocks/',
      params: params
    })
  }, [params])

  function handleSearch() {
    // StockAPI.doSearch(keywords).then(function (result) {
    //   setResults(result)
    // }
    doPost(req)
    console.log(response)
  //)}
  }

  const handleSingleChange = name => event => {
    setParams({ ...params, [name]: event.target.value });
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = event => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsVisible(true);
    }
    if (searchRef.current && searchRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

    useEffect(() => {
      if (isVisible) {
      setParams({
      apikey: 'B62IP93O6OGM4LCA',
      function: 'SYMBOL_SEARCH',
      keywords: "",
    })}
  }, [isVisible])

  return (
    <div>
      <div className={classes.StatusDiv}>
        <ul>
          <li> isVisible: {isVisible.toString()} </li>
          <li> response:
            <ul>
              <li> Loading: {response.isLoading.toString()} </li>
              <li> Error: {response.isError.toString()} </li>
              <li> Data: {response.results.data} </li>
            </ul>
          </li>
          <li> keywords: {params.keywords}</li>
        </ul>
      </div>
      <Paper className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="Menu">
          <Menu />
        </IconButton>
        <InputBase
          className={classes.input}
          ref={searchRef}
          placeholder="Search"
          value={params.keywords}
          onChange={handleSingleChange('keywords')}
         />
        <IconButton
          className={classes.iconButton}
          aria-label="Search"
          onClick={handleSearch}
        >
          <Search />
        </IconButton>
        <Divider className={classes.divider} />
        <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
          <Directions />
        </IconButton>
      </Paper>
      <Typography>
        Results:
        {!response.isLoading ?
        <ul>
          {response.results.data ?
            "results is true"
            :
            "no search"
          }
        </ul>
         :
         "Loading"
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
