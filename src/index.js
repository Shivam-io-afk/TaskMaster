import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import SideBar from './components/sidebar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='main'>
      <SideBar />
      <App />
    </div>
  </React.StrictMode>
);


