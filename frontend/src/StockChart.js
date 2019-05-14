import React, {useEffect, useState} from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, AreaChart, Area } from 'recharts';
import axios from 'axios';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import StockAPI from './StockAPI.js';

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
  const [graphConfig, setGraphConfig] = useState({
    symbol: symbol.symbol,
    timeFunc: 'TIME_SERIES_DAILY',
    frame: 'fiveDays',
    apikey: 'B62IP93O6OGM4LCA'
  })
  const {
    chartData,
    getChart,
    getSymbolStats,
    symbolStats,
  } = StockAPI();

  useEffect(() => {
    getChart(graphConfig)
    console.log("config updated")
  }, [graphConfig])

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  console.log(chartData)


  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  function hanldeRefresh() {
    // getSymbolInfo('MSFT', 'B62IP93O6OGM4LCA')
    // setAllData(symbolInfo)

  }

  function handleSetTime(event) {
    console.log("config changed")
    console.log(event.target.value)
    setGraphConfig({
      symbol: symbol.symbol,
      timeFunc: 'TIME_SERIES_DAILY',
      frame: event.target.value,
      apikey: 'B62IP93O6OGM4LCA'
    })
  }

  // useEffect(() => {
  //   if (timeFrame.historic) {
  //     if (timeFrame.period == 'fiveDays') {
  //       setAllData(data.data.results.historic.fiveDays)
  //     }
  //     if (timeFrame.period == 'month') {
  //       setAllData(data.data.results.historic.month)
  //     }
  //     if (timeFrame.period == 'sixMonths') {
  //       setAllData(data.data.results.historic.sixMonths)
  //     }
  //     if (timeFrame.period == 'year') {
  //       setAllData(data.data.results.historic.year)
  //     }
  //     if (timeFrame.period == 'fiveYears') {
  //       setAllData(data.data.results.historic.fiveYears)
  //     }
  //     if (timeFrame.period == 'max') {
  //       setAllData(data.data.results.historic.max)
  //     }
  //   } else {
  //     setAllData(data.data.results.daily)
  //   }
  // }, [timeFrame])

  const fakeCond = false


  return(
      <div className={classes.ChartContainer}>
        <Paper>
          <div className={classes.ChartHeading}>
          <div className={classes.StockInfo}>
            <Typography variant='h3'>symbol </Typography>
            <Typography variant='h4'>close </Typography>
            <ArrowUpward color="secondary" />
          </div>
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
              <Area
                dot={false}
                type="monotone"
                dataKey='open'
                stroke={fakeCond ? "#8884d8" : "#82ca9d" }
                fill={fakeCond ? "url(#colorUv)" : "url(#colorPv)"}
                strokeWidth={3}
              />
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
            <Button value={'daily'} color="primary"  onClick={(event) => {handleSetTime(event)}} className={classes.button}>
              Today
            </Button>
            <Button value={'fiveDays'} color="primary" onClick={(event) => {handleSetTime(event)}} className={classes.button}>
              5D
            </Button>
            <Button value={'month'} color="primary" onClick={(event) => {handleSetTime(event)}} className={classes.button}>
              1M
            </Button>
            <Button value={'sixMonths'} color="primary" onClick={(event) => {handleSetTime(event)}} className={classes.button}>
              6M
            </Button>
            <Button value={'year'} color="primary" onClick={(event) => {handleSetTime(event)}} className={classes.button}>
              1Y
            </Button>
            <Button value={'fiveYears'} color="primary" onClick={(event) => {handleSetTime(event)}} className={classes.button}>
              5Y
            </Button>
            <Button value={'max'} color="primary" onClick={(event) => {handleSetTime(event)}} className={classes.button}>
              MAX
            </Button>
          </div>

          <Button onClick={hanldeRefresh}> Refresh </Button>
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
