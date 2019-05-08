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
} from '@material-ui/icons'

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

  function handleSearch() {
    doPost(req)
    console.log(response)
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
    <div className={classes.root}>
      <div className={classes.StatusDiv}>
        <ul>
          <li> isVisible: {isVisible.toString()} </li>
          <li> response:
            <ul>
              <li> Loading: {response.isLoading.toString()} </li>
              <li> Error: {response.isError.toString()} </li>
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
        {!response.isLoading ?
          <div className={classes.list}>
            <List component="nav">
              <ListItem button>
                <ListItemText primary="Inbox" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Drafts" />
              </ListItem>
            </List>
          </div>
         :
         "Loading"
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
