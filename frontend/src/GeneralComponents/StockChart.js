import React, {useEffect, useState} from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, AreaChart, Area } from 'recharts';
import axios from 'axios';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import StockAPI from '../API/StockAPI.js';

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
  ArrowUpward,
  ArrowDownward,
} from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ChartContainer: {
      width: '100%',
      margin: theme.spacing(2)
    },
    margin: {
     margin: theme.spacing(1),
   },
   ChartHeading: {
     display: 'flex',
     width: '100%',
   },
   StockInfo: {

   },
   formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    margin: theme.spacing(1),
  },
  TFBlock: {
    display: 'flex',
    alignItems: 'center',
  }
  })
);


function StockChart(symbol) {
  //console.log("symbol: " + symbol.symbol)
  const [graphConfig, setGraphConfig] = useState({
    symbol: symbol.symbol,
    timeFunc: 'TIME_SERIES_INTRADAY',
    frame: 'daily',
    apikey: 'xxx'
  })
  const [frames, setFrames] = useState({
    daily: 'daily',
    fiveDays: 'fiveDays',
    month: 'month',
    sixMonths: 'sixMonths',
    year: 'year',
    fiveYears: 'fiveYears',
    max: 'max',
  })
  const {
    chartData,
    getChart,
    getSymbolStats,
    symbolStats,
    quote,
    getQuote,
  } = StockAPI();

  useEffect(() => {
    getChart(graphConfig)
    //console.log("config updated")
  }, [graphConfig])

  useEffect(() => {
    getQuote(symbol, 'xxx') //B62IP93O6OGM4LCA
  }, [])

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  //console.log(chartData)


  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleRefresh() {
    //console.log(quote)
  }

  function handleSetTime(timeframe) {
    //console.log("config changed")
    //console.log(event.target.value)
    console.log(timeframe)
    setGraphConfig({
      symbol: symbol.symbol,
      timeFunc: 'TIME_SERIES_DAILY',
      frame: timeframe,
      apikey: 'xxx'
    })
  }

  function handleSetIntra(timeframe) {
    //console.log("config changed")
    //console.log(event.target.value)
    //console.log(timeframe)
    setGraphConfig({
      symbol: symbol.symbol,
      timeFunc: 'TIME_SERIES_INTRADAY',
      frame: timeframe,
      apikey: 'xxx'
    })
  }


  const fakeCond = false


  return(
      <div className={classes.ChartContainer}>
        <Paper>
          <div className={classes.ChartHeading}>

          {quote.isLoading ?
            "Loading"
            :
             quote.data.data ?
            <div className={classes.StockInfo}>
              <Typography variant='h4'>{quote.data.data.symbol} </Typography>
              <Typography variant='h5'>{quote.data.data.price} </Typography>
              {fakeCond ? <ArrowUpward color="secondary" /> : <ArrowDownward/>}
            </div>
            :
            "No Data"
          }

          <IconButton aria-label="Delete" className={classes.margin}>
            <Settings />
          </IconButton>
          </div>
          {chartData.data ?
            <AreaChart width={800} height={300} data={chartData.data.data}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="75%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="75%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              {chartData.isLoading ?
                "Loading"
                :
                <Area
                  dot={false}
                  type="step"
                  dataKey='open'
                  stroke={fakeCond ? "#8884d8" : "#82ca9d" }
                  fill={fakeCond ? "url(#colorUv)" : "url(#colorPv)"}
                  strokeWidth={3}
                />
              }
              <CartesianGrid  stroke="#ccc" strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
            </AreaChart>
            :
            "wait"
          }
          <div className={classes.TFBlock}>
            <Button value='daily' color="primary" onClick={() => handleSetIntra('daily')}  className={classes.button}>
              Today
            </Button>
            <Button value={frames.fiveDays} color="primary" onClick={() => handleSetTime('fiveDays')} className={classes.button}>
              5D
            </Button>
            <Button value='month' color="primary" onClick={() => handleSetTime('month')} className={classes.button}>
              1M
            </Button>
            <Button value='sixMonths' color="primary" onClick={() => handleSetTime('sixMonths')} className={classes.button}>
              6M
            </Button>
            <Button value='year' color="primary" onClick={() => handleSetTime('year')} className={classes.button}>
              1Y
            </Button>
            <Button value='fiveYears' color="primary" onClick={() => handleSetTime('fiveYears')} className={classes.button}>
              5Y
            </Button>
            <Button value='max' color="primary" onClick={() => handleSetTime('max')} className={classes.button}>
              MAX
            </Button>
          </div>
          <Button onClick={handleRefresh}> log </Button>
        </Paper>
      </div>
  )
}

// y axis domain={[124, 130]}

export default StockChart


//
// <FormControl className={classes.formControl}>
//   <Select
//     open={open}
//     onClose={handleClose}
//     onOpen={handleOpen}
//     value={timeFrame.period}
//     onChange={handleChange}
//     inputProps={{
//       name: 'timeFrame',
//       id: 'demo-controlled-open-select',
//     }}
//   >
//     <MenuItem value="">
//       <em>None</em>
//     </MenuItem>
//     <MenuItem value={'daily'}>Today</MenuItem>
//     <MenuItem value={'fiveDays'}>5 Days</MenuItem>
//     <MenuItem value={'month'}>1 Month</MenuItem>
//     <MenuItem value={'sixMonths'}>6 Months</MenuItem>
//     <MenuItem value={'year'}>1 Year</MenuItem>
//     <MenuItem value={'max'}>Max</MenuItem>
//   </Select>
// </FormControl>
