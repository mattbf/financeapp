import React from 'react';
import KPI from './KPI.js';


function Testing() {
  return (
    <div>
      <KPI name='Value' value='45' prefix='$' suffix='M' tooltip='This is the tooltip description. You can put anything in here'/>
    </div>
  )
}

export default Testing
