import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ProviderNotification from './context/Notification/ProviderNotification';
import './css/index.css';
import Login from './screen/LogIn';

ReactDOM.render(
  <React.StrictMode>
    <ProviderNotification>
      <App />
    </ProviderNotification>
  </React.StrictMode>,
  document.getElementById('root')
);
