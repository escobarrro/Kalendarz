import React, { useState, useEffect } from "react";
import Holidays from 'date-holidays';
import CalendarHeader from "./CalendarHeader";
import Month from './Month';
import TodayInfo from './TodayInfo';
import './App.css';

const Calendar = ({ year }) => {
  const days = [];
  const [selectedYear, setSelectedYear] = useState(year);
  const [holidays, setHolidays] = useState([]);
  const [today, setToday] = useState(new Date());
  const months = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];
  const holidays2 = [
    { date: "01.Styczeń", name: "Święto 1" },
  ];

  

  useEffect(() => {
    const hd = new Holidays('PL');
    setHolidays(hd.getHolidays(selectedYear));
  }, [selectedYear]);

  const getMonthDays = (year, month) => {
    const days = [];
    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);
    const numDays = lastDate.getDate();
    const prevMonth = new Date(year, month, 0);
    const numDaysPrevMonth = prevMonth.getDate();
    const startDay = firstDate.getDay() === 0 ? 6 : firstDate.getDay() - 1;
  

  
  
    for (let i = startDay; i > 0; i--) {
      const prevMonthDate = numDaysPrevMonth - (i - 1);
      days.push({
        day: prevMonthDate,
        isHoliday: false,
        isWeekend: false,
        isOtherMonth: true,
      });
    }

    for (let i = 1; i <= numDays; i++) {
      const currentDate = new Date(year, month, i);
      const dayOfWeek = currentDate.getDay();
      const isHoliday = holidays.some(holiday => {
        const holidayDate = new Date(holiday.date);
        return holidayDate.getDate() === i && holidayDate.getMonth() === month;
      });

      days.push({
        day: i,
        isHoliday: isHoliday,
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
        isOtherMonth: false,
      });
    }
  
    const remainingDays = Math.ceil((numDays + startDay) / 7) * 7 - (numDays + startDay);
    let nextMonthDate = 1;
  
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: nextMonthDate,
        isHoliday: false,
        isWeekend: false,
        isOtherMonth: true,
      });
      nextMonthDate++;
    }
  
    return days;
  };

  const handlePrevYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear(selectedYear + 1);
  };

  const calendar = months.map((month, index) => (
    <Month
      key={month}
      monthName={month}
      monthIndex={index}
      monthDays={getMonthDays(selectedYear, index)}
      holidaysData={holidays}
      selectedYear={selectedYear}
      holidays={holidays2}
    />
  ));

  return (
    <div className="calendar-container">
      <div className="calendar-small-container">
      <CalendarHeader
        selectedYear={selectedYear}
        onPrevYear={handlePrevYear}
        onNextYear={handleNextYear}
      />
      <div className="calendar">
      {calendar}
      </div>
      </div>
      <TodayInfo today={today} className="today-info"/>
      </div>
  );
};

const App = () => {
  return <Calendar year={2024} />;
};

export default App;

