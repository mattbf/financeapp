import React, {useEffect, useState} from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, AreaChart, Area, ComposedChart, Bar } from 'recharts';
import axios from 'axios';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import StockAPI from '../API/StockAPI.js';
import ChipsArray from './ChipsArray.js';
import SearchDialog from './SearchDialog.js';

import {
  Button,
  Paper,
  IconButton,
  MenuItem,
  FormControl,
  Select,
  Typography,
  Dialog,
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
      margin: theme.spacing(2),
      maxWidth: '1000px',
    },
    margin: {
     margin: theme.spacing(1),
   },
   settingsButton: {
     position: 'relative',
     margin: theme.spacing(1),
     right: '0px',
   },
   ChartHeading: {
     display: 'flex',
     width: '100%',
     justifyContent: 'space-between',
     alignItems: 'center',
     paddingLeft: theme.spacing(4),
     paddingRight: theme.spacing(4),
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
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  }
  })
);


function CustomChart(symbol) {
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

  const [symbolArray, setSymbolArray] = useState([

  ]);

  // { key: 0, label: 'MSFT', color: '#00c676' },
  // { key: 1, label: 'UBER', color: '#00c676' },

  useEffect(() => {
    getChart(graphConfig)
    //console.log("config updated")
  }, [graphConfig])

  useEffect(() => {
    getQuote(symbol, 'xxx') //B62IP93O6OGM4LCA
  }, [])

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(1);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  }

  const handleDialogClose = value => {
    setDialogOpen(false);
    setSelectedValue(value);
    console.log("Called: " + value)
    addSymbol(value)
  };

  const colorObj = {
    0: '#00c676',
    1: '#f50057',
    2: '#3d5afe',
    3: '#651fff',
  }

  console.log(symbolArray.length)

  function addSymbol(sym) {
    if (sym == null || sym == " " || sym == undefined) {
      return
    }
    else{
      if (symbolArray.length != 0) {
        const newKey = symbolArray[symbolArray.length -1].key + 1
        symbolArray.push({
          key: newKey, label: sym, color: colorObj[newKey]
        })
      }
      else {
        const newKey = 0
        symbolArray.push({
          key: newKey, label: sym, color: colorObj[newKey]
        })
      }
    }

    //console.log(symbolArray[symbolArray.length -1 ])
    //console.log(symbolArray.length)
    // setSymbolArray({
    //   key: 2, label: sym, color: colorObj[2]
    // })
  }
  const deleteSymbol = data => () => {
    const chipToDelete = symbolArray.indexOf(data);
    console.log("delete called: " + data.label) //might have to change to obj
    symbolArray.splice(chipToDelete, 1);
    //setSymbolArray(symbolArray);
    console.log(symbolArray)
  };

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
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
    setGraphConfig({
      symbol: symbol.symbol,
      timeFunc: 'TIME_SERIES_INTRADAY',
      frame: timeframe,
      apikey: 'xxx'
    })
  }

  //console.log(chartData)

  const fakeCond = false


  return(
      <div className={classes.ChartContainer}>
        <Paper>
          <div className={classes.ChartHeading}>
          <ChipsArray onClick={handleDialogOpen} onDelete={deleteSymbol} symbols={symbolArray}/>
          <IconButton aria-label="Delete" className={classes.settingsButton} onClick={handleDialogOpen}>
            <Settings />
          </IconButton>
          <SearchDialog
            selectedValue={selectedValue}
            open={dialogOpen}
            onClose={handleDialogClose}
          />
          </div>
          {chartData.data ?
            <ComposedChart width={900} height={300} data={chartData.data.data}
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
                  yAxisId="left"
                  dot={false}
                  type="monotone"
                  dataKey='open'
                  stroke={fakeCond ? "#8884d8" : "#82ca9d" }
                  fill={fakeCond ? "url(#colorUv)" : "url(#colorPv)"}
                  strokeWidth={3}
                />
              }
              {chartData.isLoading ?
                null
                :
                <Bar
                  yAxisId="right"
                  type="step"
                  dataKey='volume'
                  stroke={fakeCond ? "#8884d8" : "#82ca9d" }
                  fill={fakeCond ? "url(#colorUv)" : "url(#colorPv)"}
                  strokeWidth={3}
                />
              }
              <CartesianGrid  stroke="#ccc" strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
              <Tooltip />
              <Legend />
            </ComposedChart>
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
        </Paper>
      </div>
  )
}

// y axis domain={[124, 130]}

export default CustomChart
