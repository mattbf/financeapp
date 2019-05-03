import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Stocks() {
  const [params, setParams] = useState({
    apikey: 'B62IP93O6OGM4LCA',
    function: 'SYMBOL_SEARCH',
    keywords: "Mic",
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
    { data.data &&
      <ul>
      Hello
      {data.data.bestMatches.map((match, index) =>
        <li key={index}> {match["1. symbol"]} </li>
      )}

      </ul>
    }
    </div>
  )
}

export default Stocks

/*
{data.map(stock =>
  <
)}

params: {
  function: 'TIME_SERIES_INTRADAY',
  symbol: 'MSFT',
  interval: '5min',
  apikey: 'demo',
},

data.data["Time Series (5min)"].map(time =>
  <div> {time['1. open']} </div>
)

apikey: "demo",
function: "TIME_SERIES_INTRADAY",
interval: "5min",
symbol: "MSFT",
*/
