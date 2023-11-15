import React from "react";

const CalendarHeader = ({ selectedYear, onPrevYear, onNextYear }) => {
  return (
    <div className="calendar-header">
        <button onClick={onPrevYear}>Kalendarz {selectedYear - 1}</button>
        <h1>Kalendarz {selectedYear}</h1>
        <button onClick={onNextYear}>Kalendarz {selectedYear + 1}</button>
    </div>
  );
};

export default CalendarHeader;