import React, {useEffect, useState} from 'react';
import StockAPI from '../API/StockAPI.js';
import SectorKPI from './SectorKPI.js';
import MenuButton from '../MaterialComponents/MenuButton.js';

import {
  Button,
} from '@material-ui/core';


const buttonFunctions = [
  {
    name: 'Realtime Performance',
    time: 'realtime',
  },
  {
    name: 'One Day Performance',
    time: 'day',
  },
]
function Sectors() {
  const {
    sectors,
    getSectors,
  } = StockAPI();

  const [frame, setFrame] = useState('realtime')

  useEffect(() => {
    getSectors(frame, 'xxx') //B62IP93O6OGM4LCA
  }, [frame])

  function changeFrame(frameset) {
    console.log("change frame called")
    setFrame(frameset)
  }

  return (
    <div>
      <Button onClick={console.log(sectors)}> Log </Button>
      <Button onClick={changeFrame}> change </Button>
      <MenuButton frame={frame} list={buttonFunctions} func={changeFrame}/>
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
