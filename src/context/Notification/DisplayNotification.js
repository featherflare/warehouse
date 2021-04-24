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
  const [exit, setExit] = useState(false);

  // handle for time out 'correct' notification.
  const handleCloseNoti = () => {
    var payload = 0;
    console.log('handleCloseNoti', mode, stage);
    if (mode === 2 && stage == 1) {
      console.log('handleCloseNoti inner', mode, stage);
      setExit(true);
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      });
    } else if (mode === 3 && stage == 2) {
      console.log('handleCloseNoti inner', mode, stage);
      setExit(true);
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      });
      emitCustomEvent('CHANGE_MODE_AFTER_ERROR', payload);
    } else if (mode === 3 && stage == 3) {
      console.log('handleCloseNoti inner', mode, stage);
      setExit(true);
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      });
      emitCustomEvent('CHANGE_MODE_AFTER_ERROR', payload);
    } else if (mode === 4 && stage == 2) {
      console.log('handleCloseNoti inner', mode, stage);
      setExit(true);
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      });
      emitCustomEvent('CHANGE_MODE_AFTER_ERROR', payload);
    }
  };
  useEffect(() => {
    let timer = null;
    if (type !== 'INCORRECT2') {
      timer = setTimeout(() => {
        setExit(true);
        dispatch({
          type: 'REMOVE_NOTIFICATION',
        });
      }, 5000);
      if (type === 'CORRECT') {
        setExit(false);
      } else if (type === 'INCORRECT') {
        setExit(false);
      } else if (type === 'NOTIFY') {
        setExit(false);
      } else if (type === 'POPUP') {
        setExit(false);
      }
    } else {
      setExit(false);
    }
    return () => clearTimeout(timer);
  }, [type, message, dispatch]);

  return (
    !exit && (
      <div
        className={`notification-wrapper ${type === 'POPUP' ? 'popup' : ''}`}
      >
        <div className={`notification-item ${type} ${exit ? 'exit' : ''}`}>
          {console.log(type)}
          <p>{message}</p>
          {type === 'INCORRECT2' && (
            <div className='btn-warpper'>
              <button className='btn-noti' onClick={handleCloseNoti}>
                รับทราบ
              </button>
            </div>
          )}
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
