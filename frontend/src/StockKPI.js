import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

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
      minWidth: '125px',
      height: '100px',
      margin: theme.spacing(1),
    },
    Heading: {
      marginRight: '20px',
    },
    Value: {
      marginRight: '5px',
      color: upordown ? '#00c676' : '#ff1744',
    },
    percent: {
      color: upordown ? '#00c676' : '#ff1744'
    },
    arrow: {
      color: upordown ? '#00c676' : '#ff1744',
      marginBottom: '2px',
    },
    valuebox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '5px',
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
      alignItems: 'bottom',
    },
  }),
);

const upordown = true

function KPI(info) {
  const classes = useStyles();
  console.log(info)
  return (
    <div className={classes.root}>
      <Paper className={classes.card}>
        <div className={classes.valueHeader}>
          <Typography variant='h5' className={classes.Heading}> 101.57{info.name} </Typography>
          <div className={classes.valuebox}>
            <Typography variant='subtitle1' className={classes.percent}> {upordown ? '+' : '-'}</Typography>
            <Typography variant='subtitle1' className={classes.Value}> 2.01{info.prefix} </Typography>
            <Typography variant='subtitle1' className={classes.percent}> ({info.prefix} </Typography>
            <Typography variant='subtitle1' className={classes.percent}> 8.09{info.value} </Typography>
            <Typography variant='subtitle1' className={classes.percent}> %){info.suffix} </Typography>
            {upordown ? <ArrowUpward style={{ fontSize: 20 }} className={classes.arrow}/> : <ArrowDownward style={{ fontSize: 20 }} className={classes.arrow}/> }

          </div>
        </div>
        <Typography variant='subtitle1'> SYBL{info.suffix} </Typography>
        <Typography variant='body2' className={classes.companyText}> Company Name could be long{info.suffix} </Typography>
      </Paper>
    </div>
  )
}

export default KPI
