import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import OverviewPage from './components/Overview';
import PrvTask from './components/PrivateTask';
import ErrorIndicator from './components/ErrIndic';
import ProjectOvr from './components/ProjectOvr';
import MoreSection from './components/More';
import './App.css';


function App() { 
  useEffect(() => { //Importing CDN 
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => { //Importing CDN 
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
        <Route path='/home' element={<Page1 />}></Route>
        <Route path='/' element={<Page2 />}></Route>
        <Route path='/prvtask' element={<Page3 />}></Route>
        <Route path='/more' element={<Page4 />}></Route>
      </Routes>

    <ErrorIndicator/>
    </div>
  );
}






const Page1 = () => {
  return (
    <>
      <OverviewPage/>
    </>
  );
}


const Page2 = () => {

  return (
    <>
     <PrvTask/>
    </>
  );
}




const Page3 = () => {

  return (
    <>
      <ProjectOvr/>
    </>
  )
}


const Page4 = () => {
  return (
    <>
      <MoreSection/>
    </>
  );
}


export default App;





