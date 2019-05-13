import React, {useEffect, useState} from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import StockChart from './StockChart.js';
import StockAPI from './StockAPI.js';
import {match} from 'react-router-dom';
import KPI from './KPI.js';


//.match.params.userId

import {
  Button,
  Paper,
} from '@material-ui/core';

const stockKpis = [
  {
    symbol: 'MSFT',
    name:'Value',
    value:'1951',
    prefix:'',
    suffix:'',
    tooltip:'This is the tooltip description. You can put anything in here',
  },
  {
    symbol: 'UBER',
    name:'Another value',
    value:'1,000,000',
    prefix:'$',
    suffix:'M',
    tooltip:'This is the tooltip description.',
  },
  {
    symbol: 'TCPL',
    name:'Short',
    value:'100',
    prefix:'$',
    suffix:'',
    tooltip:'This is the tooltip description. You can put anything in here. This is the tooltip description. You can put anything in here.',
  },
  {
    symbol: 'MSFT',
    name:'Long title KPI',
    value:'4.5',
    prefix:'',
    suffix:'M',
    tooltip:'Short',
  },
  {
    symbol: 'MSFT',
    name:'Value',
    value:'1000.09',
    prefix:'',
    suffix:'M',
    tooltip:'Short',
  },
  {
    symbol: 'MSFT',
    name:'Parameter',
    value:'12345678',
    prefix:'$',
    suffix:'B',
    tooltip:'Short',
  },
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Wrapper: {
      display: 'flex',
    },
    graph: {
      width: '65%',
    },
    kpiWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '35%',
      alignItems: 'center',
    },
  }),
);

function StockInfoPage({match}) {
  const classes = useStyles()
  // const {
  //   symbolInfo,
  //   getSymbolInfo,
  // } = StockAPI();
  //
  // function getinfo() {
  //   //getSymbolInfo('MSFT', 'B62IP93O6OGM4LCA')
  //   console.log(symbolInfo)
  // }
  // //const [timeFrame, setTimeFrame] = useState('')
  // console.log(match.params.symbol)
  //
  // useEffect(() => {
  //   getSymbolInfo(match.params.symbol, 'B62IP93O6OGM4LCA')
  // }, [])

  return (
    <div className={classes.Wrapper}>
    <div className={classes.graph}>
      <Paper> </Paper>
    </div>
    <div className={classes.kpiWrapper}>
      {stockKpis.map(kpi =>
        <KPI
          symbol={kpi.symbol}
          name={kpi.name}
          value={kpi.value}
          prefix={kpi.prefix}
          suffix={kpi.suffix}
          tooltip={kpi.tooltip}
        />
      )}
    </div>
    </div>
  )
}

export default StockInfoPage

// {symbolInfo.isLoading ?
//   "Loading"
//   :
//     symbolInfo.results ?
//     <StockChart data={symbolInfo} />
//     :
//     "No data"
// }
