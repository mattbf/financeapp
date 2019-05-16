import React, {useEffect, useState} from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import StockChart from './StockChart.js';
import StockAPI from './StockAPI.js';
import {match} from 'react-router-dom';
import KPI from './KPI.js';
import BreadCrumbs from './MaterialComponents/BreadCrumbs.js';
import PrimaryAppBar from './PrimaryAppBar.js';


import {
  Button,
  Paper,
} from '@material-ui/core';


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
    apikey: 'xxx'
  })
  const[test, setTest] = useState(true)
  const {
    chartData,
    getChart,
    getSymbolStats,
    symbolStats,
  } = StockAPI();
  // const [crumbs, setCrumbs] = useState([])
  useEffect(() => {
    getSymbolStats(match.params.symbol, 'xxx') //B62IP93O6OGM4LCA
    // generateCrumbs()
  }, [])

  return (
    <div>
      <div className={classes.Wrapper}>
      <div className={classes.graph}>
          <StockChart symbol={match.params.symbol}/>
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
    </div>
  )
}

export default StockInfoPage

//<PrimaryAppBar match={match}/>
