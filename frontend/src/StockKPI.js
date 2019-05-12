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
      height: '75px',
      margin: theme.spacing(1),
    },
    Heading: {
      marginRight: '20px',
    },
    Value: {

    },
    valuebox: {
      display: 'flex',
      alignItems: 'center',
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
    }
  }),
);

function KPI(info) {
  const classes = useStyles();
  console.log(info)
  return (
    <div className={classes.root}>
      <Paper className={classes.card}>
        <div className={classes.valueHeader}>
          <Typography variant='h5' className={classes.Heading}> Value{info.name} </Typography>
          <div className={classes.valuebox}>
            <Typography variant='subtitle1' className={classes.Value}> diff{info.prefix} </Typography>
            <Typography variant='subtitle1' className={classes.Value}> perc%{info.value} </Typography>
            <Typography variant='subtitle1' className={classes.Value}> {info.suffix} </Typography>
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default KPI
