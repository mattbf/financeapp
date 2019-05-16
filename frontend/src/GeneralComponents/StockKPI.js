import React, {useEffect, useState} from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import StockAPI from '../API/StockAPI.js';

import {
  Paper,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';

import {
  ArrowUpward,
  ArrowDownward,
  InfoOutlined,
  TrendingUp,
} from '@material-ui/icons';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',

    },
    card: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      position: 'relative',
      width: '250px',
      height: '125px',
      margin: theme.spacing(1),
    },
    Heading: {
      marginRight: '20px',
    },
    Value: {
      marginRight: '5px',
      //color: info.isPos ? '#00c676' : '#ff1744',
    },
    percent: {
      //color: info.isPos ? '#00c676' : '#ff1744'
    },
    arrow: {
      //color: info.isPos ? '#00c676' : '#ff1744',
      marginBottom: '5px',
    },
    valuebox: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'end',
    },
    margin: {
      margin: theme.spacing(1),
    },
    infoButtons: {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      right: '2px',
      top: '2px',
    },
    colorHover: {
      '&:hover': {
       color: "#00C676",
       backgroundColor: 'rgba(0, 198, 118, 0.15)',
     },
   },
    valueHeader: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
  }),
);

// const upordown = true //convert to int then use Math.sign()
// {quote.data.data.change

function KPI(symbol) {
  const classes = useStyles();
  console.log(symbol)
  const {
    quote,
    getQuote,
  } = StockAPI();

  useEffect(() => {
    getQuote(symbol, 'B62IP93O6OGM4LCA')
  }, [])


  return (
    <div className={classes.root}>
    {quote.isLoading ?
      "Loading"
      :
        quote.data.data ?
        <Link style={{textDecoration: 'none'}} to={`/${quote.data.data.symbol}`}>
          <Paper className={classes.card}>
            <div className={classes.infoButtons}>
              <Link style={{textDecoration: 'none'}} to={`/${quote.data.data.symbol}`}>
                <IconButton aria-label="Delete"  size="small" className={classes.colorHover}>
                  <TrendingUp fontSize="inherit"/>
                </IconButton>
              </Link>
            </div>
            <div className={classes.valueHeader}>
              <Typography variant='h5' className={classes.Heading}> {quote.data.data.price} </Typography>
              <div className={classes.valuebox} style={{color: quote.data.data.isPos ? '#00c676' : '#ff1744',}}>
                <Typography variant='subtitle1' className={classes.percent}></Typography>
                <Typography variant='subtitle1' className={classes.Value}> {quote.data.data.change} </Typography>
                <Typography variant='subtitle1' className={classes.percent}> ( </Typography>
                <Typography variant='subtitle1' className={classes.percent}> {quote.data.data.percentChange} </Typography>
                <Typography variant='subtitle1' className={classes.percent}> ) </Typography>
                {quote.data.data.isPos ? <ArrowUpward style={{ fontSize: 20 }} className={classes.arrow}/> : <ArrowDownward style={{ fontSize: 20 }} className={classes.arrow}/> }

              </div>
            </div>
            <Typography variant='subtitle1'> {quote.data.data.symbol} </Typography>
            <Typography variant='body2' className={classes.companyText}> Company </Typography>
          </Paper>
        </Link>
        :
        "no Data"
      }
    </div>
  )
}

export default KPI
