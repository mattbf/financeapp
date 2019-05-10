import React, {useEffect, useState} from 'react'
import Chart from 'react-google-charts';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, } from 'recharts';
import axios from 'axios';
import {
  Button,
} from '@material-ui/core'

function StockChart(data) {
  return(
      <div>
        <LineChart width={800} height={300} data={data.data}>
          <Line type="monotone" dataKey='open' stroke="#8884d8" />
          <CartesianGrid  stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="date"  />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      </div>
  )
}

// y axis domain={[124, 130]}

export default StockChart
