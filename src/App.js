import './App.css';
import React, { useEffect } from 'react';
import MyComponent from './components/vanta';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [])


  return (
    <div className="App">
      <div className='topBanner'>
        <MyComponent/>
          <div className='context'>
              <p>My Project <FaRegEdit className='incs' style={{cursor:"pointer"}}/></p>
              <p><FaCalendarAlt className='incs'/>19 Mar 2003</p>
              <span className='dir_span'>Dashboard / Project Overview</span>
          </div>
      </div>
    </div>
  );
}

export default App;





