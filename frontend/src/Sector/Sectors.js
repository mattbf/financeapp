import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StockAPI from '../API/StockAPI.js';
import SectorKPI from './SectorKPI.js';
import MenuButton from '../MaterialComponents/MenuButton.js';

import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from '@material-ui/core';


const buttonFunctions = [
  {
    name: 'Realtime Performance',
    time: 'realtime',
  },
  {
    name: 'One Day Performance',
    time: 'day',
  },
]

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Sectors() {
  const classes = useStyles();
  const {
    sectors,
    getSectors,
  } = StockAPI();

  const [frame, setFrame] = useState('realtime')
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  useEffect(() => {
    getSectors(frame, 'xxx') //B62IP93O6OGM4LCA
  }, [frame])

  function changeFrame(event) {
    setFrame(event.target.value)
  }

  const [values, setValues] = React.useState({
    age: '',
    name: 'hai',
  });


  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  // function handleChange(event) {
  //   setValues(oldValues => ({
  //     ...oldValues,
  //     [event.target.name]: event.target.value,
  //   }));
  // }


  return (
    <div>
      {frame}
      <Button onClick={console.log(sectors)}> Log </Button>
      <Button onClick={changeFrame}> change </Button>
      <FormControl variant="outlined" className={classes.formControl}>
       <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
         Age
       </InputLabel>
       <Select
         value='realtime'
         onChange={changeFrame}
         input={<OutlinedInput labelWidth={labelWidth} name="frameset" id="outlined-age-simple" />}
       >
         <MenuItem value='realtime'>Realtime Performance</MenuItem>
         <MenuItem value='day'>One Day Performance</MenuItem>
         <MenuItem value='fiveDay'>Five Day Performance</MenuItem>
         <MenuItem value='month'>One Month Performance</MenuItem>
         <MenuItem value='threeMonth'>Three Month Performance</MenuItem>
         <MenuItem value='year'>One Year Performance</MenuItem>
         <MenuItem value='YTD'>YTD Performance</MenuItem>
         <MenuItem value='threeYear'>Three Year Performance</MenuItem>
         <MenuItem value='fiveYear'>Five Year Performance</MenuItem>
         <MenuItem value='tenYear'>Ten Year Performance</MenuItem>
       </Select>
     </FormControl>
       <div className={classes.sectorWrapper}>
        {sectors.isLoading ?
          "loading"
          :
            sectors.data.data ?
              sectors.data.data.map((sector, index) =>
                  <SectorKPI key={index} info={sector}/>
            )
            :
            "data not true"
        }
      </div>
    </div>
  )
}

export default Sectors
