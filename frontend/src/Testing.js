import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import KPI from './KPI.js';
import StockKPI from './StockKPI.js';
import PrimaryAppBar from './PrimaryAppBar.js';
import BreadCrumbs from './MaterialComponents/BreadCrumbs.js';

const stockKpis = [
  {
    symbol:'MSFT',
    company:'Microsoft Corporation',
    value:'110.68',
    change:'15.00',
    percent:'10.88',
    isPos: true,
  },
  {
    symbol:'UBER',
    company:'Uber Technologies Inc.',
    value:'45.16',
    change:'1.99',
    percent:'2.01',
    isPos: false,
  },
  {
    symbol:'SYML',
    company:'Company Name',
    value:'88.00',
    change:'8.88',
    percent:'5.66',
    isPos: true,
  },

]


const useStyles = makeStyles(theme => ({
  breadcrumb: {
    marginTop: '15px',
    marginLeft: '15px',
  },
}));



function Testing() {
  const classes = useStyles();

  const BreadLinks = [
    {
      id: 0,
      name: 'Link 1',
      link: '/testing/1',
    },
    {
      id: 1,
      name: 'Another Link',
      link: '/MSFT',
    },
    {
      id: 2,
      name: 'Symbol Link',
      link: '/TCPL',
    },

  ]
  
  return (
    <div>
      <div className={classes.breadcrumb}>
        <BreadCrumbs BreadLinks={BreadLinks}/>
      </div>
      {stockKpis.map(kpi =>
        <StockKPI
          symbol={kpi.symbol}
          company={kpi.company}
          value={kpi.value}
          change={kpi.change}
          percent={kpi.percent}
          isPos={kpi.isPos}
        />
      )}
      <KPI name='Value' value='45' prefix='$' suffix='M' tooltip='This is the tooltip description. You can put anything in here'/>
    </div>
  )
}

export default Testing
