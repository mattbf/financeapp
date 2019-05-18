import React from 'react';
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

  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  function deleteChip(data) {
    onDelete(data)
  }

  console.log(symbols.length)
  return (
    <div className={classes.root}>
      {symbols.length > 0 ?
        symbols.map(data => {
        let icon;

        if (data.label === 'React') {
          icon = <TagFacesIcon />;
        }


        return (
          <Chip
            key={data.key}
            icon={icon}
            label={data.label}
            onDelete={deleteChip(data)}
            className={classes.chip}
            variant="outlined"
            deleteIcon={<Close />}
            style={{color: data.color, borderColor: data.color, }}

          />
        );
      })
      :
      null
    }
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
