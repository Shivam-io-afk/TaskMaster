import React, { useState, useEffect } from "react";
import "../styles/Celendar.css";

const months = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);
  
  useEffect(() => {
    renderCalendar();
  }, [currentDate]);

  const renderCalendar = () => {
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    let lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    let lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay();
    let lastDateOfLastMonth = new Date(year, month, 0).getDate();
    let liDayTag = [];

    for (let i = firstDayOfMonth; i > 0; i--) {
      liDayTag.push(<li key={`prev-${i}`} className="inactive">{lastDateOfLastMonth - i + 1}</li>);
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      let isToday = i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? "active" : "";
      liDayTag.push(<li key={`curr-${i}`} className={isToday}>{i}</li>);
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
      liDayTag.push(<li key={`next-${i}`} className="inactive">{i - lastDayOfMonth + 1}</li>);
    }

    setDays(liDayTag);
  };

  const handlePrevNext = (direction) => {
    let newMonth = direction === "prev" ? currentDate.getMonth() - 1 : currentDate.getMonth() + 1;
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth));
  };

  return (
    <div className="wrapper">
      <header>
        <p className="current-date">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</p>
        <div className="icons">
          <span onClick={() => handlePrevNext("prev")} style={{cursor:"pointer"}} className="leftIcon">&lt;</span>
          <span onClick={() => handlePrevNext("next")} style={{cursor:"pointer"}} className="rightIcon">&gt;</span>
        </div>
      </header>
      <div className="calendar">
        <ul className="weeks">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul className="days">{days}</ul>
      </div>
    </div>
  );
};



export default Calendar;





//

export const SelectableCal = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Track selected date

  useEffect(() => {
    renderCalendar();
  }, [currentDate]);

  const renderCalendar = () => {
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    let lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    let lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay();
    let lastDateOfLastMonth = new Date(year, month, 0).getDate();
    let liDayTag = [];

    // Add days from the previous month
    for (let i = firstDayOfMonth; i > 0; i--) {
      liDayTag.push(
        <li key={`prev-${i}`} className="inactive">
          {lastDateOfLastMonth - i + 1}
        </li>
      );
    }

    // Add days from the current month
    for (let i = 1; i <= lastDateOfMonth; i++) {
      let isToday =
        i === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear()
          ? "active"
          : "";

      // Check if the date is selected
      let isSelected =
        selectedDate &&
        i === selectedDate.getDate() &&
        month === selectedDate.getMonth() &&
        year === selectedDate.getFullYear()
          ? "selected"
          : "";

      liDayTag.push(
        <li
          key={`curr-${i}`}
          className={`${isToday} ${isSelected}`}
          onClick={() => handleDateClick(i, month, year)} // Handle date selection
        >
          {i}
        </li>
      );
    }

    // Add days from the next month
    for (let i = lastDayOfMonth; i < 6; i++) {
      liDayTag.push(
        <li key={`next-${i}`} className="inactive">
          {i - lastDayOfMonth + 1}
        </li>
      );
    }

    setDays(liDayTag);
  };


    // Handle date selection
    const handleDateClick = (day, month, year) => {
      const selected = new Date(year, month, day);
      setSelectedDate(selected); // updating
  
      // Format the date as DD-Mon-YYYY
      const formattedDate = `${String(day).padStart(2, "0")}-${months[month].substring(0, 3)}-${year}`;
      onDateSelect(formattedDate); // Pass formatted date to parent component
    };

  // Handle previous/next month navigation
  const handlePrevNext = (direction) => {
    let newMonth = direction === "prev" ? currentDate.getMonth() - 1 : currentDate.getMonth() + 1;
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth));
  };

  return (
    <div className="wrapper">
      <header>
        <p className="current-date">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </p>
        <div className="icons">
          <span
            onClick={() => handlePrevNext("prev")}
            style={{ cursor: "pointer" }}
            className="leftIcon"
          >
            &lt;
          </span>
          <span
            onClick={() => handlePrevNext("next")}
            style={{ cursor: "pointer" }}
            className="rightIcon"
          >
            &gt;
          </span>
        </div>
      </header>
      <div className="calendar">
        <ul className="weeks">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul className="days">{days}</ul>
      </div>
    </div>
  );
};

