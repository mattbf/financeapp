import React from 'react';
import StockChart from './StockChart.js';
import StockAPI from './StockAPI.js';

import {
  Button,
} from '@material-ui/core';

function StockInfoPage() {
  const {
    symbolInfo
  } = StockAPI();

  function getinfo() {
    symbolInfo('UBER', 'B62IP93O6OGM4LCA')
  }
  return (
    <div>
      <StockChart />
      <Button onClick={getinfo}> Get info </Button>
    </div>
  )
}

export default StockInfoPage
