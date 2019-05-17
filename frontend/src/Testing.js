import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import KPI from './GeneralComponents/KPI.js';
import StockKPI from './GeneralComponents/StockKPI.js';
import PrimaryAppBar from './GeneralComponents/PrimaryAppBar.js';
import BreadCrumbs from './MaterialComponents/BreadCrumbs.js';
import MiniSearchBar from './GeneralComponents/MiniSearchBar.js';
import CustomChart from './GeneralComponents/CustomChart.js';

const useStyles = makeStyles(theme => ({
  breadcrumb: {
    marginTop: '15px',
    marginLeft: '15px',
  },
}));

function Testing() {
  const classes = useStyles();

  return (
    <div>
        <CustomChart/>
    </div>
  )
}

export default Testing
