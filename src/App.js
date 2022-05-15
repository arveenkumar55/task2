import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import DataAzuki from './Data/azukiMintAnalysis'
import kongxData from './Data/kongzMintAnalysis'
import Graph from './graph'

import MomentumGraph from './MomentumGraph'

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


function App() {

  const [value, setValue] = useState(DataAzuki())

  const [ValueChecked, setValueChecked] = useState('DataAzuki')


  const seTcheckedvalue = (isChecked, col) => {

    setValueChecked(col)


    if(col === 'DataAzuki') {
      setValue(DataAzuki())
    } else {
      setValue(kongxData())
    }
  }



  let payload = {
    seriesData1: [],
    seriesData2: []
  }

  let momentumPayload = {
    seriesData1: [],
    seriesData2: []
  }

  // let DataAzukiGraph = []
  // let kongxDataGraph = []
  for (let i = 0; i < value.length; i++) {


    // payload.categories.push(new Date(DataAzuki()[i].mintTime).getTime())

    payload.seriesData1.push([new Date(value[i].mintTime).getTime(), value[i].mintsCount])

    payload.seriesData2.push([new Date(value[i].mintTime).getTime(), value[i].totalMints])

  }


  for (let i = 0; i < DataAzuki().length; i++) {

    momentumPayload.seriesData1.push([new Date(DataAzuki()[i].mintTime).getTime(), DataAzuki()[i].mintsMomentum])

    momentumPayload.seriesData2.push([new Date(DataAzuki()[i].mintTime).getTime(), kongxData()[i].mintsMomentum])

  }


  // for (let i = 0; i < kongxData().length; i++) {

  //   if (daysCriteria === 'all') {

  //     kongxDataGraph.push([new Date(kongxData()[i].day).getTime(), kongxData()[i][ValueChecked]])

  //   } else {
  //     let date1 = new Date(kongxData()[i].day);
  //     let date2 =  new Date();
  //     let diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);

  //     // console.log('diffDays', diffDays)
  //     if (diffDays <= 31) {
  //       kongxDataGraph.push([new Date(kongxData()[i].day).getTime(), kongxData()[i][ValueChecked]])
  //     }
  //   }
  // }

  return (
    <div className="App">

      <FormControlLabel
        control={<Checkbox
          checked={ValueChecked === 'DataAzuki' ? true : false}
          onChange={(event) => { seTcheckedvalue(event.target.checked, 'DataAzuki') }}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />}
        label="DataAzuki"
        labelPlacement="start"
      />
      <FormControlLabel
        control={<Checkbox
          checked={ValueChecked === 'kongxData' ? true : false}
          onChange={(event) => { seTcheckedvalue(event.target.checked, 'kongxData') }}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />}
        label="DataKongx"
        labelPlacement="start"
      />

      <Graph payload={payload} />

      <MomentumGraph payload= {momentumPayload} />
    </div>
  );
}

export default App;
