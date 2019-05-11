import React, {useEffect, useState} from 'react';
import StockChart from './StockChart.js';
import StockAPI from './StockAPI.js';
import {match} from 'react-router-dom';

//.match.params.userId

import {
  Button,
} from '@material-ui/core';

function StockInfoPage({match}) {
  const {
    symbolInfo,
    getSymbolInfo,
  } = StockAPI();

  function getinfo() {
    //getSymbolInfo('MSFT', 'B62IP93O6OGM4LCA')
    console.log(symbolInfo)
  }
  //const [timeFrame, setTimeFrame] = useState('')
  console.log(match.params.symbol)

  useEffect(() => {
    getSymbolInfo(match.params.symbol, 'B62IP93O6OGM4LCA')
  }, [])

  return (
    <div>
    {symbolInfo.isLoading ?
      "Loading"
      :
        symbolInfo.results ?
        <StockChart data={symbolInfo} />
        :
        "No data"
    }
      <Button onClick={getinfo}> Get info </Button>
    </div>
  )
}

export default StockInfoPage
