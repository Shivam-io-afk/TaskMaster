import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import OverviewPage from './components/Overview';
import PrvTask from './components/PrivateTask';
import ErrorIndicator from './components/ErrIndic';
import ProjectOvr from './components/ProjectOvr';
import MoreSection from './components/More';
import Settings from './components/Setting.js';
import SessionTimeout from './components/SessionTimeout';
import { LoaderProvider, useGlobalLoader } from './context/LoaderContext';
import './App.css';

function AppContent() { 
  const location = useLocation();
  const { setContentReady, markDataLoaded } = useGlobalLoader();

  // Mark content as ready as soon as component mounts
  useEffect(() => {
    // Set content as ready after a short delay to ensure loader is visible
    const timeout = setTimeout(() => {
      setContentReady();
      markDataLoaded();
    }, 1500);
    
    return () => clearTimeout(timeout);
  }, [setContentReady, markDataLoaded]);

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
        <Route path='/' element={<Page1 />}></Route>
        <Route path='/Personal' element={<Page2 />}></Route>
        <Route path='/Projects' element={<Page3 />}></Route>
        <Route path='/More' element={<Page4 />}></Route>
        <Route path='/Settings' element={<Page5 />}></Route>
      </Routes>

      {/* <ErrorIndicator/> ----- error indicator popup */}
    </div>
  );
}

function App() {
  return (
    <>
      <SessionTimeout />
      <AppContent />
    </>
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

const Page5  = () => {
  return(
    <>
      <Settings/>
    </>
  )
}






export default App;





