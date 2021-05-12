import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ProviderNotification from './context/Notification/ProviderNotification';
import ProviderAlert from './context/Alert/ProviderAlert'
import './css/index.css';

ReactDOM.render(
  <React.StrictMode>
    <ProviderNotification>
      <ProviderAlert>
        <App />
      </ProviderAlert>
    </ProviderNotification>
  </React.StrictMode>,
  document.getElementById('root')
);
