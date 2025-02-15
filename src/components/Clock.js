import { useState, useEffect } from "react";
import "../styles/Clock.css";

const NeumorphicClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hour = time.getHours() % 12;
  const minute = time.getMinutes();
  const second = time.getSeconds();

  const hourDeg = hour * 30 + minute * 0.5;
  const minuteDeg = minute * 6 + second * 0.1;
  const secondDeg = second * 6;

  return (
    <div className="clock-container">
      <div className="clock">
        <div className="clock-face">
          {/* Numbers */}
          <div className="number number-12">12</div>
          <div className="number number-3">3</div>
          <div className="number number-6">6</div>
          <div className="number number-9">9</div>

          {/* Hands */}
          <div className="hand hour-hand" style={{ transform: `translateX(-50%) rotate(${hourDeg}deg)` }}></div>
          <div className="hand minute-hand" style={{ transform: `translateX(-50%) rotate(${minuteDeg}deg)` }}></div>
          <div className="hand second-hand" style={{ transform: `translateX(-50%) rotate(${secondDeg}deg)` }}></div>

          {/* Center Dot */}
          <div className="center-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default NeumorphicClock;
