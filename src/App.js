import React, { useState, useEffect } from 'react';
import './Calendar.css';
import Calendar from 'react-calendar';
import './App.css';

function App() {
  const [dates, setDates] = useState(JSON.parse(localStorage.getItem('dates')) ? JSON.parse(localStorage.getItem('dates')) : []);
  const [len, setLen] = useState(localStorage.getItem('len') ? localStorage.getItem('len') : 3);
  const [numPred, setNumPred] = useState(localStorage.getItem('numPred') ? localStorage.getItem('numPred') : 10);
  const [nextDays, setNextDays] = useState(JSON.parse(localStorage.getItem('nextDays')) ? JSON.parse(localStorage.getItem('nextDays')) : []);
  const [nextPeriod, setNextPeriod] = useState(JSON.parse(localStorage.getItem('nextPeriod')) ? JSON.parse(localStorage.getItem('nextPeriod')) : []);
  
  
  useEffect(()=>{
    localStorage.setItem('dates', JSON.stringify(dates))
    localStorage.setItem('nextDays', JSON.stringify(nextDays))
    localStorage.setItem('nextPeriod', JSON.stringify(nextPeriod))
    localStorage.setItem('len', len)
    localStorage.setItem('numPred', numPred)
    const updateNextDays = () => {
      let copy = [];
      for (let i=0; i < dates.length; i++){
        let pdate = dates[i];
        for (let j = 1; j < len; j++){
          copy.push(pdate + j*86400000);
        }
      }
      setNextDays(copy);
    }
    updateNextDays();

    const makePrediction = () => {
      let copy = [];
      if(dates.length < 2){
        return;
      } 
      let diff = dates[dates.length-1] - dates[dates.length-2]
      for (let i=1; i<=numPred; i++){
        copy.push(dates[dates.length-1]+i*diff);
      }
      setNextPeriod(copy);
    }
    makePrediction()
    console.log(nextPeriod)
  },[dates, len, numPred]);

  const handleChangeDates = (date) => {
    var copy = dates.slice();
    if (copy.includes(date.getTime())){
      var index = copy.indexOf(date.getTime());
      copy.splice(index, 1);
      copy.sort()
      setDates(copy);
    }
    else {
      copy.push(date.getTime());
      copy.sort()
      setDates(copy);
    }
  }

  const handleChangeLen = (event) => {
    setLen(event.target.value);
  }

  const handleChangeNumPred = (event) => {
    setNumPred(event.target.value);
  }
  return (
    <div className="App">
      <div className='calendar-container'>
      <header className="App-header">
        <label className='titleText'>Period Tracker</label><br></br><br></br>
        <div><label className='bodyText'>Length of Period (Days): </label><input type="number" id='length' defaultValue={len} onChange={handleChangeLen} className='numField'/></div>
        <br></br>
        <Calendar 
        onChange={handleChangeDates} 
        tileClassName={({ date, view }) => {
       // date will return every date visible on calendar and view will view type (eg. month)
          if (nextDays.includes(date.getTime())){
            return 'dayRest';
          }
          if(dates.includes(date.getTime())){
          return 'day1'; 
          }
          if(nextPeriod.includes(date.getTime())){
          return 'prediction'; 
          }
        }}/>
      <div><label className='bodyText'>Predict next </label><input type="number" id='numPred' defaultValue={numPred} onChange={handleChangeNumPred} className='numField'/><label className='bodyText'> periods</label></div>
      </header>
      </div>
    </div>
  );
}

export default App;
