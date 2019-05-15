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
    trend: true,
  },
  {
    symbol: 'UBER',
    name:'Another value',
    value:'1,000,000',
    prefix:'$',
    suffix:'M',
    tooltip:'This is the tooltip description.',
    trend: true,
  },
  {
    symbol: 'TCPL',
    name:'Short',
    value:'100',
    prefix:'$',
    suffix:'',
    tooltip:'This is the tooltip description. You can put anything in here. This is the tooltip description. You can put anything in here.',
    trend: true,
  },
  {
    symbol: 'MSFT',
    name:'Long title KPI',
    value:'4.5',
    prefix:'',
    suffix:'M',
    tooltip:'Short',
    trend: false,
  },
  {
    symbol: 'MSFT',
    name:'Value',
    value:'1000.09',
    prefix:'',
    suffix:'M',
    tooltip:'Short',
    trend: true,
  },
  {
    symbol: 'MSFT',
    name:'Parameter',
    value:'12345678',
    prefix:'$',
    suffix:'B',
    tooltip:'Short',
    trend: false,
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
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
  }),
);

function StockInfoPage({match}) {
  const classes = useStyles()
  const [kpis, setKpis] = useState([])
  const [graphConfig, setGraphConfig] = useState({
    symbol: match.params.symbol,
    timeFunc: 'TIME_SERIES_INTRADAY',
    frame: '1D',
    apikey: 'B62IP93O6OGM4LCA'
  })
  const[test, setTest] = useState(true)
  const {
    chartData,
    getChart,
    getSymbolStats,
    symbolStats,
  } = StockAPI();

  useEffect(() => {
    getSymbolStats(match.params.symbol, 'B62IP93O6OGM4LCA')
  }, [])

  useEffect(() => {
    console.log(chartData)
  }, [test])

  function handleClick() {
    setTest(!test)
  }

  return (
    <div className={classes.Wrapper}>
    <div className={classes.graph}>
      <Button onClick={handleClick}> Click </Button>
      <Paper>
        <StockChart symbol={match.params.symbol}/>
      </Paper>
      </div>
      <div className={classes.kpiWrapper}>
        {symbolStats.isLoading ?
          "loading"
        :
          symbolStats.results ?
            symbolStats.results.kpis ?
                symbolStats.results.kpis.map((kpi, index) =>
                  <KPI
                    key={index}
                    symbol={kpi.symbol}
                    name={kpi.name}
                    value={kpi.value}
                    prefix={kpi.prefix}
                    suffix={kpi.suffix}
                    tooltip={kpi.tooltip}
                    trend={kpi.trend}
                  />
                )
              :
              "kpis not true"
            :
            "no Kpis"
      }
      </div>
    </div>
  )
}

export default StockInfoPage
