import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import {
  Paper,
  InputBase,
  Divider,
  IconButton,
} from '@material-ui/core'

import {
  Menu,
  Search,
  Directions,
} from '@material-ui/icons'

const useStyles = makeStyles(
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
      marginTop: 50,
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
  }),
);

function CustomizedInputBase() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="Menu">
        <Menu />
      </IconButton>
      <InputBase className={classes.input} placeholder="Search" />
      <IconButton className={classes.iconButton} aria-label="Search">
        <Search />
      </IconButton>
      <Divider className={classes.divider} />
      <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
        <Directions />
      </IconButton>
    </Paper>
  );
}

export default CustomizedInputBase;
