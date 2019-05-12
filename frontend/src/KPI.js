import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import {
  Paper,
  Typography,
} from '@material-ui/core';

import {
  ArrowUpward,
} from '@material-ui/icons';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',

    },
    card: {
      padding: theme.spacing(1),
    },
    Heading: {

    },
    Value: {

    },
    valuebox: {
      display: 'flex',
      alignItems: 'center',
    }
  }),
);

function KPI(info) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.card}>
        <Typography variant='h6' className={classes.Heading}> {info.name} </Typography>
        <div className={classes.valuebox}>
          <Typography variant='subtitle1' className={classes.Value}> {info.prefix} </Typography>
          <Typography variant='subtitle1' className={classes.Value}> {info.value} </Typography>
          <Typography variant='subtitle1' className={classes.Value}> {info.suffix} </Typography>
        </div>
      </Paper>
    </div>
  )
}

export default KPI
