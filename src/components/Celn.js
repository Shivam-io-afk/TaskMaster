import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Celendar.css';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);
  
  const renderCalendar = useCallback(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay();
    const lastDateOfLastMonth = new Date(year, month, 0).getDate();
    const liDayTag = [];

    // Previous month days
    for (let i = firstDayOfMonth; i > 0; i--) {
      liDayTag.push(<li key={`prev-${i}`} className="inactive">{lastDateOfLastMonth - i + 1}</li>);
    }

    // Current month days
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday = i === new Date().getDate() && 
                     month === new Date().getMonth() && 
                     year === new Date().getFullYear() ? "active" : "";
      liDayTag.push(<li key={`curr-${i}`} className={isToday}>{i}</li>);
    }

    // Next month days
    for (let i = lastDayOfMonth; i < 6; i++) {
      liDayTag.push(<li key={`next-${i}`} className="inactive">{i - lastDayOfMonth + 1}</li>);
    }

    setDays(liDayTag);
  }, [currentDate]);

  useEffect(() => {
    renderCalendar();
  }, [renderCalendar]);

  const handlePrevNext = (direction) => {
    const newMonth = direction === "prev" ? currentDate.getMonth() - 1 : currentDate.getMonth() + 1;
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth));
  };

  return (
    <div className="wrapper">
      <header>
        <p className="current-date">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</p>
        <div className="icons">
          <span onClick={() => handlePrevNext("prev")} className="leftIcon">&lt;</span>
          <span onClick={() => handlePrevNext("next")} className="rightIcon">&gt;</span>
        </div>
      </header>
      <div className="calendar">
        <ul className="weeks">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <li key={day}>{day}</li>
          ))}
        </ul>
        <ul className="days">{days}</ul>
      </div>
    </div>
  );
};

export const SelectableCal = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const renderCalendar = useCallback(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay();
    const lastDateOfLastMonth = new Date(year, month, 0).getDate();
    const liDayTag = [];

    // Previous month days
    for (let i = firstDayOfMonth; i > 0; i--) {
      liDayTag.push(<li key={`prev-${i}`} className="inactive">{lastDateOfLastMonth - i + 1}</li>);
    }

    // Current month days
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday = i === new Date().getDate() && 
                     month === new Date().getMonth() && 
                     year === new Date().getFullYear() ? "active" : "";
      
      const isSelected = selectedDate &&
                        i === selectedDate.getDate() &&
                        month === selectedDate.getMonth() &&
                        year === selectedDate.getFullYear() ? "selected" : "";

      liDayTag.push(
        <li 
          key={`curr-${i}`} 
          className={`${isToday} ${isSelected}`}
          onClick={() => handleDateClick(i, month, year)}
        >
          {i}
        </li>
      );
    }

    // Next month days
    for (let i = lastDayOfMonth; i < 6; i++) {
      liDayTag.push(<li key={`next-${i}`} className="inactive">{i - lastDayOfMonth + 1}</li>);
    }

    setDays(liDayTag);
  }, [currentDate, selectedDate]);

  useEffect(() => {
    renderCalendar();
  }, [renderCalendar]);

  const handleDateClick = (day, month, year) => {
    const clickedDate = new Date(year, month, day);
    setSelectedDate(clickedDate);
    if (onDateSelect) {
      onDateSelect(clickedDate);
    }
  };

  const handlePrevNext = (direction) => {
    const newMonth = direction === "prev" ? currentDate.getMonth() - 1 : currentDate.getMonth() + 1;
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth));
  };

  return (
    <div className="wrapper">
      <header>
        <p className="current-date">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</p>
        <div className="icons">
          <span onClick={() => handlePrevNext("prev")} className="leftIcon">&lt;</span>
          <span onClick={() => handlePrevNext("next")} className="rightIcon">&gt;</span>
        </div>
      </header>
      <div className="calendar">
        <ul className="weeks">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <li key={day}>{day}</li>
          ))}
        </ul>
        <ul className="days">{days}</ul>
      </div>
    </div>
  );
};

export default Calendar;