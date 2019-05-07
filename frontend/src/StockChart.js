import React, {useEffect, useState} from 'react'
import Chart from 'react-google-charts';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import axios from 'axios';
import {
  Button,
} from '@material-ui/core'

function StockChart() {
  const [chartState, setChartState] = useState({
    chartData: [],
    isLoaded: false,
  })
  //console.log(data)
  const [params, setParams] = useState({
    function: 'TIME_SERIES_INTRADAY',
    symbol: 'MSFT',
    interval: '5min',
    apikey: 'demo',
  })
  const [req, setReq] = useState({
    method: 'GET',
    url: 'http://localhost:8000/api/stocks/',
    params: params
  })
  const [data, setData] = useState([])
  const [json, setJson] = useState([])

  useEffect(() => {
    axios(req)
      .then(function(response) {
        setData(response.data)
        setJson(response.data.data["Time Series (5min)"])
      })
      .catch(function (error) {
      // handle error
      console.log(error);
  })
  }, [])

  //const json = jsonData
  const columns = [
    { type: 'date', label: 'Date' },
    { type: 'number', label: 'Stock Open' },
  ]
  let rows = []
  let newJson = []
  //const nonNullData = data.filter(row => row.value !== null)
  if (data.data) {
       var keys = Object.keys(data.data["Time Series (5min)"])
       keys.forEach(function(key){
           rows.push([new Date(Date.parse(key)), data.data["Time Series (5min)"][key]["1. open"]]);
           //console.log(rows)
           newJson.push({
             date: new Date(Date.parse(key)),
             open: data.data["Time Series (5min)"][key]["1. open"]
           })
           console.log(newJson)
       });
  }



  // const stockDates = Object.keys(data)
  // const stockValues = Object.values(data)
  //
  // const dataSet = [['DateTime', 'Stock Open']]
  //  for (let i = 0; i < stockDates.length; i += 1) {
  //    dataSet.push([stockDates[i], stockValues[i]])
  //  }

   useEffect(() => {
     setChartState({
       chartData: [columns, ...rows],
       isLoaded: true,
     })
     //console.log(chartState.chartData)
   }, [data])

   const testData = [
     {date: '2019-05-07T17:30:00.000Z',
      open: 120.98,
     },
      {date: '2019-05-07T17:35:00.000Z',
       open: 125.98,
      },
     {date: '2019-05-07T17:40:00.000Z',
      open: 140.98,
     },
    {date: '2019-05-07T17:45:00.000Z',
     open: 120.98,
    },
   ]


   function logData() {
     console.log(data.data["Time Series (5min)"])
   }

  return(

      chartState.isLoaded ?
      <div>
        <Chart
          chartType="LineChart"
          data={chartState.chartData}
          options={{
            hAxis: {
              format: 'MMMM dd',
            },
            vAxis: {
              format: 'short',
            },
            title: 'Chart title',
          }}
          rootProps={{ 'data-testid': '2' }}
        />
        <LineChart width={800} height={300} data={newJson}>
          <Line type="monotone" dataKey='open' stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
        </LineChart>
      </div>
      :
      <div>
        <div>Fetching data from API</div>
        <Button onClick={logData}> click </Button>
      </div>

  )
}


export default StockChart


/*


<Component
  initialState={{ dataLoadingStatus: 'loading', chartData: [] }}
  didMount={async function(component) {
    const COUNTRY_CODE = 'lb'
    const INDICATOR = 'DT.DOD.DECT.CD'
    const response = await fetch(
      'https://api.worldbank.org/v2/countries/' +
        COUNTRY_CODE +
        '/indicators/' +
        INDICATOR +
        '?format=json',
    )
    const json = await response.json()
    const [metadata, data] = json
    {

    }
    const columns = [
      { type: 'date', label: 'Year' },
      { type: 'number', label: 'Debt' },
    ]
    let rows = []
    const nonNullData = data.filter(row => row.value !== null)
    for (let row of nonNullData) {
      const { date, value } = row
      rows.push([new Date(Date.parse(date)), value])
    }
    component.setState({
      chartData: [columns, ...rows],
      dataLoadingStatus: 'ready',
    })
  }}
>
  {component => {
    return component.state.dataLoadingStatus === 'ready' ? (
      <Chart
        chartType="LineChart"
        data={component.state.chartData}
        options={{
          hAxis: {
            format: 'yyyy',
          },
          vAxis: {
            format: 'short',
          },
          title: 'Debt incurred over time.',
        }}
        rootProps={{ 'data-testid': '2' }}
      />
    ) : (
      <div>Fetching data from API</div>
    )
  }}
</Component>





chartState.isLoaded ?
  <Chart
    chartType="LineChart"
    data={chartState.chartData}
    options={{
      hAxis: {
        format: 'yyyy',
      },
      vAxis: {
        format: 'short',
      },
      title: 'Chart title',
    }}
    rootProps={{ 'data-testid': '2' }}
  />
 :
<div>Fetching data from API</div>

*/
