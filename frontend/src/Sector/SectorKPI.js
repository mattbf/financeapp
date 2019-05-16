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
      width: '215px',
      height: '65px',
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


function SectorKPI(info) {
  const classes = useStyles();
  // console.log("info passed to sector card: ")
  // console.log(info)

  return (
    <div className={classes.root}>
          <Paper className={classes.card}>
            <div className={classes.valueHeader}>
              <Typography variant='subtitle2' className={classes.Heading}>{info.info.sector} </Typography>
              <div className={classes.valuebox} style={{color: info.info.isPos ? '#00c676' : '#ff1744',}}>
                <Typography variant='subtitle1' className={classes.percent}>{info.info.change}</Typography>
                {info.info.isPos ? <ArrowUpward style={{ fontSize: 20 }} className={classes.arrow}/> : <ArrowDownward style={{ fontSize: 20 }} className={classes.arrow}/> }
              </div>
            </div>
          </Paper>
    </div>
  )
}

export default SectorKPI
