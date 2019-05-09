import React, {useEffect, useState} from 'react'
import Chart from 'react-google-charts';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, } from 'recharts';
import axios from 'axios';
import {
  Button,
} from '@material-ui/core'

function StockChart(data) {
  // const [params, setParams] = useState({
  //   function: 'TIME_SERIES_INTRADAY',
  //   symbol: 'MSFT',
  //   interval: '5min',
  //   apikey: 'demo',
  // })
  // const [req, setReq] = useState({
  //   method: 'GET',
  //   url: 'http://localhost:8000/api/stocks/',
  //   params: params
  // })
  // const [data, setData] = useState({
  //   isLoaded: false,
  //   data: [],
  // })

  // const [json, setJson] = useState({
  //   isLoaded: false,
  //   data: []
  // })

//   useEffect(() => {
//     let newJson = []
//     axios(req)
//       .then(function(response) {
//         var keys = Object.keys(response.data.data["Time Series (5min)"])
//         keys.forEach(function(key){
//             newJson.push({
//               date: new Date(Date.parse(key)),
//               open: response.data.data["Time Series (5min)"][key]["1. open"]
//             })
//             //console.log(newJson.data)
//             //
//         });
//         setData({
//           isLoaded: true,
//           data: newJson
//         })
//         //setJson(response.data.data["Time Series (5min)"])
//       })
//       .catch(function (error) {
//       // handle error
//       console.log(error);
//   })
// }, [loadChart])

  // let newJson = []
  // if (data.data) {
  //      var keys = Object.keys(data.data["Time Series (5min)"])
  //      keys.forEach(function(key){
  //          newJson.push({
  //            date: new Date(Date.parse(key)),
  //            open: data.data["Time Series (5min)"][key]["1. open"]
  //          })
  //          //console.log(newJson.data)
  //          //
  //      });
  // }

  return(
      <div>
        <LineChart width={800} height={300} data={data.data}>
          <Line type="monotone" dataKey='open' stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      </div>
  )
}

// y axis domain={[124, 130]}

export default StockChart
