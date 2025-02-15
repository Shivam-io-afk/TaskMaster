import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import SideBar from './components/sidebar';
import { BrowserRouter as Router } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='main'>
      <Router>
        <SideBar />
        <App />
      </Router>
    </div>
  </React.StrictMode>
);


