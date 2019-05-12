import React, {useEffect, useState} from 'react';
import StockChart from './StockChart.js';
import StockAPI from './StockAPI.js';
import {match} from 'react-router-dom';
import KPI from './KPI.js';

//.match.params.userId

import {
  Button,
} from '@material-ui/core';

const stockKpis = [
  {
    name:'Value',
    value:'1951',
    prefix:'',
    suffix:'',
    tooltip:'This is the tooltip description. You can put anything in here',
  },
  {
    name:'Another value',
    value:'1,000,000',
    prefix:'$',
    suffix:'M',
    tooltip:'This is the tooltip description.',
  },
  {
    name:'Short',
    value:'100',
    prefix:'$',
    suffix:'',
    tooltip:'This is the tooltip description. You can put anything in here. This is the tooltip description. You can put anything in here.',
  },
  {
    name:'Long title KPI',
    value:'4.5',
    prefix:'',
    suffix:'M',
    tooltip:'Short',
  },
]

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

      {stockKpis.map(kpi =>
        <KPI
          name={kpi.name}
          value={kpi.value}
          prefix={kpi.prefix}
          suffix={kpi.suffix}
          tooltip={kpi.tooltip}
        />
      )}
    </div>
  )
}

export default StockInfoPage
