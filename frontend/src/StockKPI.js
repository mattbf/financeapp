import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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
      width: '275px',
      height: '100px',
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
    infoButton: {
      position: 'absolute',
      right: '2px',
      top: '2px',
    },
    valueHeader: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
  }),
);

const upordown = true

function KPI(info) {
  const classes = useStyles();
  console.log(info)
  return (
    <div className={classes.root}>
      <Link style={{textDecoration: 'none'}} to={`/${info.symbol}`}>
        <Paper className={classes.card}>
          <div className={classes.valueHeader}>
            <Typography variant='h5' className={classes.Heading}> {info.value} </Typography>
            <div className={classes.valuebox} style={{color: info.isPos ? '#00c676' : '#ff1744',}}>
              <Typography variant='subtitle1' className={classes.percent}> {info.isPos ? '+' : '-'}</Typography>
              <Typography variant='subtitle1' className={classes.Value}> {info.change} </Typography>
              <Typography variant='subtitle1' className={classes.percent}> ( </Typography>
              <Typography variant='subtitle1' className={classes.percent}> {info.percent} </Typography>
              <Typography variant='subtitle1' className={classes.percent}> %) </Typography>
              {info.isPos ? <ArrowUpward style={{ fontSize: 20 }} className={classes.arrow}/> : <ArrowDownward style={{ fontSize: 20 }} className={classes.arrow}/> }

            </div>
          </div>
          <Typography variant='subtitle1'> {info.symbol} </Typography>
          <Typography variant='body2' className={classes.companyText}> {info.company} </Typography>
        </Paper>
      </Link>
    </div>
  )
}

export default KPI
