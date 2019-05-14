import React, {useEffect, useState} from 'react';
import StockAPI from './StockAPI.js';

import {
  Button,
} from '@material-ui/core';

function KPIPage() {
  const {doGet, response, getRes} = StockAPI()
  const[data, setData] = useState(true)
  const[test, setTest] = useState(true)

  useEffect(() => {
    setData(doGet({
      method: 'GET',
      url: 'http://localhost:8000/api/stocks/symbol/kpis/',
      params: {
        symbol: 'MSFT',
        
        apikey: 'B62IP93O6OGM4LCA',
      },
    }))
  }, [test])


  function handleClick() {
    setTest(!test)
  }

  useEffect(() => {
    console.log(data)
  }, [test])

  return(
    <div>
     KPi page
     <Button onClick={handleClick}> Click </Button>
    </div>
  )
}

export default KPIPage