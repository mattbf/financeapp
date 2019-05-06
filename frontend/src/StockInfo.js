import React, {useState, useEffect} from 'react';
import axios from 'axios';

import StockChart from './StockChart.js';

function StockInfo() {
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
  console.log(data.data)
  return (

    <div>
      <StockChart data={data} />
    </div>
  )
}

export default StockInfo

/*
{ data.data &&
  <ul>
  Hello
  {Object.values(data.data["Time Series (5min)"]).map((stock, index) =>
    <li key={index}> {stock["1. open"]} </li>
  )}

  </ul>
}
*/
