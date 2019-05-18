import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

import {
  IconButton,
} from '@material-ui/core';

import {
  Add,
  Close,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  margin: {
   margin: theme.spacing(1),
 },
}));

function ChipsArray(props) {
  const classes = useStyles();
  const { onClick, onDelete, symbols, ...other } = props;

  const [chipData, setChipData] = useState(symbols)

  useEffect(() => {
    console.log("chip useEffect called")
    setChipData(symbols)
  }, [props.symbols.length])

  function deleteChip(data) {
    onDelete(data)
  }

  return (
    <div className={classes.root}>
      {symbols.map(data =>
        <Chip
        key={data.key}
        label={data.label}
        onDelete={onDelete(data)}
        className={classes.chip}
        variant="outlined"
        style={{color: data.color, borderColor: data.color, }}
        />
      )}
    {symbols.length <= 2 ?
      <IconButton onClick={onClick} className={classes.margin} aria-label="Add" size="small">
        <Add />
      </IconButton>
      :
      null
    }

    </div>
  );
}

export default ChipsArray;
