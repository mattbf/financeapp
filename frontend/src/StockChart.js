import React, {useEffect, useState} from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, } from 'recharts';
import axios from 'axios';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import {
  Button,
  Paper,
  IconButton,
  MenuItem,
  FormControl,
  Select,
  Typography,
} from '@material-ui/core'

import {
  Menu,
  Settings,
} from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ChartContainer: {
      width: '100%',
    },
    margin: {
     margin: theme.spacing(1),
   },
   ChartHeading: {
     display: 'flex',
   },
   StockInfo: {
     border: 'solid',
   },
   formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  })
);


function StockChart(data) {
  const classes = useStyles();
  const [timeFrame, setTimeFrame] = useState({
    historic: false,
    period: 'daily',
  });
  const [allData, setAllData] = useState(data.data.results.historic.fiveDays)
  const [open, setOpen] = useState(false);
  console.log(data)

  function handleChange(event) {
    if (event.target.value == 'daily') {
      setTimeFrame({
        historic: false,
        period: event.target.value,
      });
    } else {
      setTimeFrame({
        historic: true,
        period: event.target.value,
      });
    }
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  useEffect(() => {
    if (timeFrame.historic) {
      if (timeFrame.period == 'fiveDays') {
        setAllData(data.data.results.historic.fiveDays)
      }
      if (timeFrame.period == 'month') {
        setAllData(data.data.results.historic.month)
      }
      if (timeFrame.period == 'sixMonths') {
        setAllData(data.data.results.historic.sixMonths)
      }
      if (timeFrame.period == 'year') {
        setAllData(data.data.results.historic.year)
      }
      if (timeFrame.period == 'fiveYears') {
        setAllData(data.data.results.historic.fiveYears)
      }
      if (timeFrame.period == 'max') {
        setAllData(data.data.results.historic.max)
      }
    } else {
      setAllData(data.data.results.daily)
    }
  }, [timeFrame])

  return(
      <div className={classes.ChartContainer}>
        <Paper>
          <div className={classes.ChartHeading}>
          <div className={classes.StockInfo}>
            <Typography variant='h3'>{data.data.results.kpis.close.close} </Typography>
          </div>
          <IconButton aria-label="Delete" className={classes.margin}>
            <Settings />
          </IconButton>
          </div>
          <LineChart width={800} height={300} data={allData}>
            <Line type="monotone" dataKey='open' stroke="#8884d8" />
            <CartesianGrid  stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="date"  />
            <YAxis />
            <Tooltip />
            <Legend />
          </LineChart>
          <FormControl className={classes.formControl}>
            <Select
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={timeFrame.period}
              onChange={handleChange}
              inputProps={{
                name: 'timeFrame',
                id: 'demo-controlled-open-select',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'daily'}>Today</MenuItem>
              <MenuItem value={'fiveDays'}>5 Days</MenuItem>
              <MenuItem value={'month'}>1 Month</MenuItem>
              <MenuItem value={'sixMonths'}>6 Months</MenuItem>
              <MenuItem value={'year'}>1 Year</MenuItem>
              <MenuItem value={'max'}>Max</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </div>
  )
}

// y axis domain={[124, 130]}

export default StockChart
