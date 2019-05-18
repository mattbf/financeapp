import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  IconButton,
  Typography,
} from '@material-ui/core';

import {
  Close,
} from '@material-ui/icons';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0.5),
    border: 'solid',
    borderRadius: '10px',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  margin: {
   margin: theme.spacing(1),
 },
}));

export default function SybmolChip() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant='button'> Symbol </Typography>
      <IconButton>
        <Close />
      </IconButton>
    </div>
  )
}
