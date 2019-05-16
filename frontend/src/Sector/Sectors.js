import React, {useEffect, useState} from 'react';
import StockAPI from '../API/StockAPI.js';
import SectorKPI from './SectorKPI.js';

import {
  Button,
} from '@material-ui/core';

function Sectors() {
  const {
    sectors,
    getSectors,
  } = StockAPI();

  const [frame, setFrame] = useState('realtime')

  useEffect(() => {
    getSectors(frame, 'xxx') //B62IP93O6OGM4LCA
  }, [frame])

  function changeFrame() {
    setFrame('fiveDay')
  }

  return (
    <div>
      <Button onClick={console.log(sectors)}> Log </Button>
      <Button onClick={changeFrame}> change </Button>
      {sectors.isLoading ?
        "loading"
        :
          sectors.data.data ?
            sectors.data.data.map((sector, index) =>
                <SectorKPI key={index} info={sector}/>
          )
          :
          "data not true"
      }
    </div>
  )
}

export default Sectors
