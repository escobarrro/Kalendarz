import React, { useState, useEffect, useRef }  from "react";
import './TodayInfo.css';



const getDativeMonth = (monthName) => {
  const monthsExceptions = {
    "styczeń": "stycznia",
    "luty": "lutego",
    "marzec": "marca",
    "kwiecień": "kwietnia",
    "maj": "maja",
    "czerwiec": "czerwca",
    "lipiec": "lipca",
    "sierpień": "sierpnia",
    "wrzesień": "września",
    "październik": "października",
    "listopad": "listopada",
    "grudzień": "grudnia",
  };

  

  return monthsExceptions[monthName] || monthName;
};

const TodayInfo = ({ today }) => {
  const options = {year: 'numeric'};
  const options2 = { weekday: 'long'};
  const options3 = {day: 'numeric' };
  const options4 = {month: 'long'};
  const formattedDate = today.toLocaleDateString('pl-PL', options);
  const formattedDate2 = today.toLocaleDateString('pl-PL', options2);
  const formattedDate3 = today.toLocaleDateString('pl-PL', options3);
  const formattedDate4 = today.toLocaleDateString('pl-PL', options4);

const formattedDateWithDativeMonth = formattedDate4.replace(formattedDate4, getDativeMonth(formattedDate4));

const hourHandRef = useRef(null);
    const minuteHandRef = useRef(null);
    const secondHandRef = useRef(null);
  
    const updateClock = (hours, minutes, seconds) => {
      const hourDegrees = hours * 30;
      const minuteDegrees = minutes * 6;
      const secondDegrees = seconds * 6;
  
      if (hourHandRef.current) {
        hourHandRef.current.style.transform = `rotate(${hourDegrees}deg)`;
      }
  
      if (minuteHandRef.current) {
        minuteHandRef.current.style.transform = `rotate(${minuteDegrees}deg)`;
      }
  
      if (secondHandRef.current) {
        secondHandRef.current.style.transform = `rotate(${secondDegrees}deg)`;
      }
    };
  
    const setClockWithCurrentTime = () => {
      const date = new Date();
  
      const hours = ((date.getHours() + 11) % 12 + 1);
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
  
      updateClock(hours, minutes, seconds);
    };
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setClockWithCurrentTime();
      }, 1000);
  
      return () => {
        clearInterval(intervalId);
      };
    }, []);
  return (
    <div className="today-info">
      <h1>-------------------------------------</h1>
      <h2>Dziś jest {formattedDate2}</h2>
      <p>{formattedDate3}</p>
      <p className="month-date">{formattedDateWithDativeMonth} {formattedDate}</p>
      <div class="clock">
      <div className="hour-hand" ref={hourHandRef}></div>
        <div className="minute-hand" ref={minuteHandRef}></div>
        <div className="second-hand" ref={secondHandRef}></div>
</div>
      <h1>-------------------------------------</h1>
    </div>
  );
};

export default TodayInfo;
