import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Stocks() {
  const [req, setReq] = useState({
    method: 'GET',
    url: 'http://localhost:8000/api/stocks/',
    params: {
      function: 'TIME_SERIES_INTRADAY',
      symbol: 'MSFT',
      interval: '5min',
      apikey: 'demo',
    },
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
  console.log(data)
  console.log(req)
  return (

    <div>

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
*/
