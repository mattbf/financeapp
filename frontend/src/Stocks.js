import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Stocks() {
  const [req, setReq] = useState({
    url: 'http://localhost:8000/api/stocks/',
  })
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/api/stocks/')
      .then(function(response) {
        setData(response.data)
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
