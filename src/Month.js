import React, { useState, useEffect } from "react";
import  Holidays  from "date-holidays";
import './Month.css';

const daysOfWeekPL = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Niedz"];

const Month = ({ monthName, monthDays, selectedYear }) => {
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

  const [hoveredDay, setHoveredDay] = useState(null);

  const [holidaysData, setHolidaysData] = useState({
    '01-1': 'Nowy Rok',
    '01-6': 'Święto Trzech Króli'
  });


  useEffect(() => {
    // Tutaj możesz dodać kod do pobierania danych o świętach z API lub innej źródłowej bazy danych
    // W tym przykładzie, po prostu używamy statycznych danych
    const hd = new Holidays();
    const holidays = hd.getHolidays(selectedYear, 'PL');
    const holidaysObject = {};

  

    holidays.forEach(holiday => {
      const key = `${selectedYear}-${(holiday.date.getMonth() + 1).toString().padStart(2, '0')}-${holiday.date.getDate().toString().padStart(2, '0')}`;
      holidaysObject[key] = holiday.name;
    });

    console.log('Holidays Data:', holidaysObject);

    setHolidaysData(holidaysObject);
  }, [selectedYear]);

  const isHoliday = ({ day }) => {
    const selectedMonth = months.indexOf(monthName) + 1;

    const holidayDate = `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    return holidaysData[holidayDate] || null;
  };

  return (
    <div className="month">
      <h2>{monthName}</h2>
      <div className="days-of-week">
        {daysOfWeekPL.map((day, index) => (
          <div key={index} className={(index === 5 || index === 6) ? "day-of-week red" : "day-of-week"}>
            {day}
          </div>
        ))}
      </div>
      <div className="days">
      {monthDays.map((day, index) => {


  return (
    <div
      key={index}
      className={
        day.isOtherMonth
          ? "day gray"
          : day.isHoliday
          ? "day red holiday"
          : day.isWeekend
          ? "day red"
          : "day"
      }
      onMouseEnter={() => setHoveredDay(day)}
      onMouseLeave={() => setHoveredDay(null)}
    >
      {day.isHoliday && <div className="holiday-circle" />}
      {day.day}
      {hoveredDay === day && day.isHoliday && (
              <div className="hovered-day">
                {isHoliday({ day: day.day, month: monthName })}
                <div className="triangle-down" />
              </div>
            )}
    </div>
  );
})}
      </div>
    </div>
  );
};

export default Month;














