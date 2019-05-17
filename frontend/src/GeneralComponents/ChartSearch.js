import React, {useEffect, useState, createRef, useRef} from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import CircularLoad from '../MaterialComponents/CircularLoad.js';
import StockAPI from '../API/StockAPI.js';

import {
  Paper,
  InputBase,
  Divider,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemIcon,
  ClickAwayListener,
} from '@material-ui/core'

import {
  Menu,
  Search,
  Directions,
  Clear,
  Inbox,
  Drafts,
} from '@material-ui/icons'

import red from '@material-ui/core/colors/red';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '85%',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      opacity: '0.7',
      '&:hover': {
       opacity: "1",
     },
     ':focus': {
      opacity: "1",
    },
      transition: 'opacity 0.25s',
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
      backgroundColor: theme.palette.background.paper,
    },
    rightList: {
      alignItems: 'end',
      textAlign: 'right',
    },
    symbol: {
      fontWeight: 'bold',
    },
    filterMenu: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
  },
  }),
);

function ChartSearch(props) {
  const classes = useStyles();
  const { onClick, ...other } = props;

  const searchRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [searchOpen, setsearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [params, setParams] = useState({
    apikey: 'xxx', //B62IP93O6OGM4LCA
    function: 'SYMBOL_SEARCH',
    keywords: "",
  })
  const [req, setReq] = useState({
    method: 'GET',
    url: 'http://localhost:8000/api/stocks/',
    params: params
  })
  const [results, setResults] = useState([])
  const {
    response,
    doPost,
    doGet,
    getDailyChart,
    chartDailyData,
    getChart,
    chartData,
  } = StockAPI();

  const [req2, setReq2] = useState({
    method: 'GET',
    url: 'http://localhost:8000/api/stocks/',
    params: {
      function: 'TIME_SERIES_INTRADAY',
      symbol: 'MSFT',
      interval: '5min',
      apikey: 'demo',
    }
  })

  const [test, setTest] = useState([])

    useEffect(() => {
    setReq({
      method: 'GET',
      url: 'http://localhost:8000/api/stocks/',
      params: params
    })
  }, [params])

  function handleSearch(event) {
    doPost(req)
    setIsVisible(true)
    setsearchOpen(true)
    //setIsVisible(true)
    console.log(response)
  }

  function addSymbol(sym) {
    onClick(sym)
  }

  function openMenu() {
    setMenuOpen(true)
    setsearchOpen(false)
    clearSearch()
  }

  function closeMenu() {
    setMenuOpen(false)
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
      setsearchOpen(false);
      clearSearch();
      getDailyChart('RESET');
      setMenuOpen(false);
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

  function handleGetChart(symbol) {
    setsearchOpen(false)
    getChart(symbol)
  }

  const StockInfoLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to={`/${props.symbol}`} {...props} />

));

  return (
    <div className={classes.root} style={{opacity: !isVisible ? '1' : null}}>
      <Paper className={classes.searchBar}>
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
      {
        response.isSearch ?
        isVisible && searchOpen ?
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
                {response.results.data.bestMatches.slice(0, 6).map((match, index) =>
                    <ListItem button key={index} onClick={() => addSymbol(match["1. symbol"])}>
                        <ListItemText className={classes.symbol} primary={match["1. symbol"]} />
                        <ListItemText className={classes.rightList} primary={match["2. name"]} />
                    </ListItem>
                )}
              </List>
            </div>
         :
         <div className={classes.list}>
           <List component="nav">
               <ListItem>
                 <CircularLoad/>
               </ListItem>
           </List>
         </div>
        :
        null
        :
        null
      }
    </div>
  );
}

export default ChartSearch;
