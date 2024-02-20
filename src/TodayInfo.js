import React, { useState }  from "react";
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
  let time  = new Date().toLocaleTimeString()
  const [ctime,setTime] = useState(time)
  const UpdateTime=()=>{
    time =  new Date().toLocaleTimeString()
    setTime(time)
  }
  setInterval(UpdateTime)

const formattedDateWithDativeMonth = formattedDate4.replace(formattedDate4, getDativeMonth(formattedDate4));


  return (
    <div className="today-info">
      <h1>----------------------------------</h1>
      <h2>Dziś jest {formattedDate2}</h2>
      <p>{formattedDate3}</p>
      <p className="month-date">{formattedDateWithDativeMonth} {formattedDate}</p>
      <h1>Czas w Polsce</h1>
      <h2>{ctime}</h2>
      <h1>----------------------------------</h1>
    </div>
  );
};

export default TodayInfo;
