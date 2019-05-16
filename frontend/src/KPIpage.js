import React, {useEffect, useState} from 'react';
import StockAPI from './API/StockAPI.js';
import PrimaryAppBar from './GeneralComponents/PrimaryAppBar.js';
import {match} from 'react-router-dom';

import {
  Button,
} from '@material-ui/core';

function KPIPage({match}) {
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

//<PrimaryAppBar match={match}/>
