import React, { useState } from "react";
import './Month.css';

const daysOfWeekPL = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "N"];

const Month = ({ monthName, monthDays, selectedYear, holidays }) => {
  const [hoveredDay, setHoveredDay] = useState(null);
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
          const dayNumber = `${day.day}.${monthName}`;

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
              onMouseEnter={() => setHoveredDay(dayNumber)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              {day.isHoliday && <div className="holiday-circle" />}
              {day.day}
              {hoveredDay === dayNumber && day.isHoliday && (
                <div>
                  <div className="hovered-day">
                    <div className="hovered-content">
                      <div className="red-box">Święto</div>
                      {dayNumber === "1.Styczeń" ? "Nowy Rok" : dayNumber === "6.Styczeń" ? "Trzech Króli" : dayNumber === "31.Marzec" ? "Wielkanoc" : dayNumber === "1.Kwiecień" ? "Poniedziałek Wielkanocny" : dayNumber === "1.Maj" ? "Święto Pracy" : dayNumber === "3.Maj" ? "Święto Konstytucji 3 Maja" : dayNumber === "19.Maj" ? "Zesłanie Ducha Świętego" : dayNumber === "26.Maj" ? "Dzień Matki" : dayNumber === "30.Maj" ? "Boże Ciało" : dayNumber === "15.Sierpień" ? "Święto Wojska Polskiego" : dayNumber === "1.Listopad" ? "Wszystkich Świętych" : dayNumber === "11.Listopad" ? "Narodowe święto Niepodległości" : dayNumber === "25.Grudzień" ? "Boże Narodzenie (pierwszy dzień)" : dayNumber === "26.Grudzień" ? "Boże Narodzenie (drugi dzień)" : dayNumber}
                    </div>
                  </div>
                  <div className="triangle-down">&#9664;</div>
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













