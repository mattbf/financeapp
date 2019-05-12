import React from 'react';
import KPI from './KPI.js';
import StockKPI from './StockKPI.js';


function Testing() {
  return (
    <div>
      <StockKPI />
      <KPI name='Value' value='45' prefix='$' suffix='M' tooltip='This is the tooltip description. You can put anything in here'/>
    </div>
  )
}

export default Testing
