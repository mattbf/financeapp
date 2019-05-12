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
    }
  }),
);

function KPI(info) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.card}>
        <div className={classes.infoButton}>
          <Tooltip title={info.tooltip} interactive placement="left-end">
            <IconButton aria-label="Delete"  size="small">
              <InfoOutlined fontSize="inherit"/>
            </IconButton>
          </Tooltip>
        </div>
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
