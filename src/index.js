import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SideBar from './components/sidebar';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{ position: "relative", height: "100vh", width: "100vw", border: "1px solid red", overflow: "hidden" }}>
      <SideBar />
      <App />
    </div>
  </React.StrictMode>
);


