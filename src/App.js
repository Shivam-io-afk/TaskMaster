import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import MyComponent from './components/vanta';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import SubsectionApp from './components/SubSection_App';
import SubSection from './components/SubSection';
import TaskPortion from './components/TaskPortion';
import Overview from './components/Ovr';


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
      <Routes>
        <Route path='/' element={<Page1/>}></Route>
        <Route path='/tasklist' element={<Page2/>}></Route>
        <Route path='/project' element={<Page3/>}></Route>
        <Route path='/categories' element={<Page4/>}></Route>
      </Routes>
    </div>
  );
}






const Page1 = () => {
  return(
      <>
          <Overview/>
      </>
  );
}

const Page2 = () => {
  return(
      <>
          <h1>This is Tasklist Page</h1>
      </>
  );
}




const Page3 = () => {
  return (
    <>
      <div className='topBanner'>
        <MyComponent />
        <div className='context'>
          <p>My Project<FaRegEdit className='incs' style={{ cursor: "pointer" }} /></p>
          <p><FaCalendarAlt className='incs' />19 Mar 2025</p>
          <span className='dir_span'><span>Dashboard</span><b> / </b><span>Project Overview</span></span>
        </div>
      </div>
      <SubsectionApp />
      <SubSection />
      <TaskPortion />
    </>
  )
}


const Page4 = () => {
  return(
      <>
          <h1>This is Categories Page</h1>
      </>
  );
}


export default App;





