import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './Calendar.css';
import Calendar from 'react-calendar';
import './App.css';

function App() {
  const [dates, setDates] = useState(JSON.parse(localStorage.getItem('dates')) ? JSON.parse(localStorage.getItem('dates')) : []);
  useEffect(()=>{
    localStorage.setItem('dates', JSON.stringify(dates))
    console.log(dates);
  },[dates]);

  const handleChangeDates = (date) => {
    var copy = dates.slice();
    if (copy.includes(date.getTime())){
      var index = copy.indexOf(date.getTime());
      copy.splice(index, 1);
      setDates(copy);
    }
    else {
      copy.push(date.getTime());
      setDates(copy);
    }
  }
  return (
    <div className="App">
      <div className='calendar-container'>
      <header className="App-header">
        <Calendar 
        onChange={handleChangeDates} 
        tileClassName={({ date, view }) => {
       // date will return every date visible on calendar and view will view type (eg. month)
       if(dates.includes(date.getTime())){
         return 'highlight'; // your class name
        }
      }}/>
      
      </header>
      </div>
    </div>
  );
}

export default App;
