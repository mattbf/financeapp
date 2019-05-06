import React, {useEffect, useState} from 'react'
import Chart from 'react-google-charts';
import axios from 'axios';

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

  useEffect(() => {
    axios(req)
      .then(function(response) {
        setData(response.data)
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
  //const nonNullData = data.filter(row => row.value !== null)
  if (data.data) {
    for (var row in data.data["Time Series (5min)"]) {
      const { date, value } = row
      // const date = Object.keys(row)
      // const value = Object.vaues(row)
      rows.push([new Date(date), value])
      //console.log(row["1. open"])
      //console.log(value)
      const d = Object.keys(data.data["Time Series (5min)"])
      const v = Object.values(data.data["Time Series (5min)"][row])
      //console.log(v)

       var keys = Object.keys(data.data["Time Series (5min)"])
       keys.forEach(function(key){
           //rows.push();
           console.log(key)
           console.log(data.data["Time Series (5min)"][key]["1. open"])

       });
    }
    // data.data["Time Series (5min)"].map((index, stock) =>
    //   rows.push([new Date((Object.keys(stock))), stock["1. open"]])
    // )
    // console.log(data.data["Time Series (5min)"])
    //console.log(rows)

  }



  const stockDates = Object.keys(data)
  const stockValues = Object.values(data)

  const dataSet = [['DateTime', 'Stock Open']]
   for (let i = 0; i < stockDates.length; i += 1) {
     dataSet.push([stockDates[i], stockValues[i]])
   }
   useEffect(() => {
     setChartState({
       chartData: [columns, ...rows],
       isLoaded: true,
     })
   }, [])


  return(
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
