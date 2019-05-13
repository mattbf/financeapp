import React, {useEffect, useState} from 'react';
import StockAPI from './StockAPI.js';

function KPIPage() {
  const {doGet, response} = StockAPI()

  useEffect(() => {
    doGet({
      method: 'GET',
      url: 'http://localhost:8000/api/stocks/symbol/kpis/',
      symbol: 'MSFT',
      apikey: 'demo',
    })
  }, [])


  useEffect(() => {
    console.log(response)
  }, [response])

  return(
    <div>
     KPi page
    </div>
  )
}

export default KPIPage
