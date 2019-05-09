import React, {useEffect, useState, createRef, useRef} from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import useStockSearch from './useStockSearch.js';
import {
  Paper,
  InputBase,
  Divider,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'

import {
  Menu,
  Search,
  Directions,
  Clear,
} from '@material-ui/icons'

import red from '@material-ui/core/colors/red';

import StockAPI from './StockAPI.js';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    searchBar: {
      display: 'flex',
      alignItems: 'center',
      padding: '2px 4px',
      width: '100%',
      marginTop: 50,
      zIndex: '99',
    },
    input: {
      marginLeft: 8,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    redButton: {
      padding: 10,
      color: red[600],
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
    },
    list  : {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    rightList: {
      alignItems: 'end',
      textAlign: 'right',
    },
    symbol: {
      fontWeight: 'bold',
    },
  }),
);

function CustomizedInputBase() {
  const classes = useStyles();
  const searchRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
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
  const [results, setResults] = useState([])
  const {response, doPost} = StockAPI();

    useEffect(() => {
    setReq({
      method: 'GET',
      url: 'http://localhost:8000/api/stocks/',
      params: params
    })
  }, [params])

  function handleSearch(event) {
    doPost(req)
    //setIsVisible(true)
    console.log(response)
  }

  function handleKeyPress(e) {
      if (e.key == "Enter") {
      handleSearch()
    }
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

  function clearSearch() {
    setParams({
    apikey: 'B62IP93O6OGM4LCA',
    function: 'SYMBOL_SEARCH',
    keywords: "",
  })
}
    useEffect(() => {
      if (isVisible) {
      clearSearch();
    }
  }, [isVisible])

  return (
    <div className={classes.root}>
      <div className={classes.StatusDiv}>
        <ul>
          <li> isVisible: {isVisible.toString()} </li>
          <li> response:
            <ul>
              <li> Loading: {response.isLoading.toString()} </li>
              <li> Error: {response.isError.toString()} </li>
              <li> isSearch: {response.isSearch.toString()} </li>
              <li> Data?: {response.results.data ? "true" : "false"} </li>
              <li> length: {response.results.length} </li>
              <li> Data: config </li>
            </ul>
          </li>
          <li> keywords: {params.keywords}</li>
        </ul>
      </div>
      <Paper className={classes.searchBar}>
        <IconButton className={classes.iconButton} aria-label="Menu">
          <Menu />
        </IconButton>
        <InputBase
          className={classes.input}
          ref={searchRef}
          placeholder="Search"
          value={params.keywords}
          onChange={handleSingleChange('keywords')}
          onKeyPress={handleKeyPress}
         />
        <IconButton
          className={classes.iconButton}
          aria-label="Search"
          onClick={handleSearch}
        >
          <Search />
        </IconButton>
        <Divider className={classes.divider} />
        <IconButton
          color="secondary"
          className={classes.iconButton}
          aria-label="Directions"
          onClick={clearSearch}
        >
          <Clear />
        </IconButton>
      </Paper>
      {response.isSearch ?
        !response.isLoading ?
          !response.results.data || !response.results.data.bestMatches ?
          <div className={classes.list}>
            <List component="nav">
                <ListItem>
                  <ListItemText primary="Try broadening your search" />
                </ListItem>
            </List>
          </div>
          :
          response.results.data.bestMatches.length == 0 ?
            <div className={classes.list}>
              <List component="nav">
                  <ListItem>
                    <ListItemText primary="Try broadening your search" />
                  </ListItem>
              </List>
            </div>
            :
            <div className={classes.list}>
              <List component="nav">
                {response.results.data.bestMatches.map((match, index) =>
                  <ListItem button key={index}>
                    <ListItemText className={classes.symbol} primary={match["1. symbol"]} />
                    <ListItemText className={classes.rightList} primary={match["2. name"]} />
                  </ListItem>
                )}
              </List>
            </div>

         :
         "Loading"
        :
        "nothing"
      }
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
