import React, {useEffect, useState} from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, } from 'recharts';
import axios from 'axios';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import {
  Button,
  Paper,
  IconButton,
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

   },
  })
);


function StockChart(data) {
  const classes = useStyles();
  return(
      <div className={classes.ChartContainer}>
        <Paper>
          <div className={classes.ChartHeading}>
          <IconButton aria-label="Delete" className={classes.margin}>
            <Settings />
          </IconButton>
          </div>
          <LineChart width={800} height={300} data={data.data}>
            <Line type="monotone" dataKey='open' stroke="#8884d8" />
            <CartesianGrid  stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="date"  />
            <YAxis />
            <Tooltip />
            <Legend />
          </LineChart>
        </Paper>
      </div>
  )
}

// y axis domain={[124, 130]}

export default StockChart
