import React, { useState } from "react";
import './Month.css';

const daysOfWeekPL = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "N"];

const Month = ({ monthName, monthDays, selectedYear, holidays1 }) => {
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
        {monthDays.map((day, index) => (
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
              <div>
                <div className="hovered-day">
                  <div className="hovered-content">
                    <div className="red-box">Święto</div>
                  </div>
                </div>
                <div className="triangle-down">&#9664;</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Month;














