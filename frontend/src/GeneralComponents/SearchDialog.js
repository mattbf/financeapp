import React, {useState, useEffect} from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ChartSearch from './ChartSearch.js';

import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
} from '@material-ui/core';

import {
  Add,
} from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ChartContainer: {
      width: '100%',
      margin: theme.spacing(2)
    },
  })
);

function SearchDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, ...other } = props;

  function handleClose() {
    onClose(selectedValue);
  }

  function handleListItemClick(value) {
    onClose(value);
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      {...other}
      fullWidth='true'
      maxWidth='md'

    >
      <DialogTitle id="simple-dialog-title">Add a symbol to the chart</DialogTitle>
      <ChartSearch onClick={onClose} />
      <List>
        <ListItem button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <Add />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="add account" />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default SearchDialog
