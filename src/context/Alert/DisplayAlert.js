/* 
DisplayNotification display a notification and processing that notification can 
close autonomously or not.

Updated - 09/02/2021 - Aum
*/

import React, { useState, useContext, useEffect } from 'react';
import { AlertContext } from './ProviderAlert';
import '../../css/Alert.css';
import { emitCustomEvent, useCustomEventListener } from 'react-custom-events';

const DisplayAlert = () => {
  // notificationState will call from ProviderNotification.js and use to update share state for whole project.
  // dispatch will call from ProviderNotification.js and use to update new dispatch order to whole project.
  // 'useContext' share variable to whole project.
  const { alertState, dispatch } = useContext(AlertContext);
  const { type, message, exitPopup } = alertState;
  const [exit, setExit] = useState(true);

  // handle for time out 'correct' notification.
  const handleCloseNoti = () => {
    var newMode = 0;
    let payload = {
      information_type: 'mode_changed',
      new_mode: 0,
      new_stage: 0,
    };
    setExit(true);
    dispatch({
      type: 'REMOVE_NOTIFICATION',
    });
    emitCustomEvent('CHANGE_MODE_AFTER_ERROR', newMode);
    emitCustomEvent('SEND_PAYLOAD', payload);
  };

  useEffect(() => {
    console.log(exit);
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
      } else {
        setExit(true);
      }
    } else {
      if (typeof (type, message) !== 'undefined') {
        setExit(false);
      }
    }
    return () => clearTimeout(timer);
  }, [type, message, dispatch]);

  return (
    !exit && (
      <div className={`alert-wrapper`}>
        <div className={`alert-item ${type} ${exit ? 'exit' : ''}`}>
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

export default DisplayAlert;
