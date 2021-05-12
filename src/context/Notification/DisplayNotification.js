/* 
DisplayNotification display a notification and processing that notification can 
close autonomously or not.

Updated - 09/02/2021 - Aum
*/

import React, { useState, useContext, useEffect } from 'react';
import { NotificationContext } from './ProviderNotification';
import '../../css/Notification.css';
import { emitCustomEvent, useCustomEventListener } from 'react-custom-events';

const DisplayNotification = ({ mode, stage }) => {
  // notificationState will call from ProviderNotification.js and use to update share state for whole project.
  // dispatch will call from ProviderNotification.js and use to update new dispatch order to whole project.
  // 'useContext' share variable to whole project.
  const { notificationState, dispatch } = useContext(NotificationContext);
  const { type, message, exitPopup } = notificationState;
  const [exit, setExit] = useState(true);

  // handle for time out 'correct' notification.
  
  useEffect(() => {
    let timer = null;
    if (type !== 'INCORRECT2') {
      timer = setTimeout(() => {
        setExit(true);
        dispatch({
          type: 'REMOVE_NOTIFICATION',
        });
      }, 5000);
      if (type === 'POPUP_CORRECT') {
        setExit(false);
      } else if (type === 'POPUP_INCORRECT') {
        setExit(false);
      } else if (type === 'POPUP') {
        setExit(false);
      }
    } else {
      if (typeof(type, message) !== 'undefined') {
        setExit(true);
      }
    }
    return () => clearTimeout(timer);
  }, [type, message, dispatch]);

  return (
    !exit && (
      <div
        className={`notification-wrapper-popup`}
      >
        <div className={`notification-item ${type} ${exit ? 'exit' : ''}`}>
          {console.log(type)}
          <p>{message}</p>
        </div>
      </div>
    )
  );
};

export default DisplayNotification;

// var a = 0;
// var b = 0;

// emitCustomEvent('changemode', a,b);

// useCustomEventListener('changemode', a => {
//   setMode(a);
// }, b => {
//   setStage(b);
// })
