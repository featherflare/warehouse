import React, { useState, useEffect, useCallback, useContext } from 'react';
import { emitCustomEvent } from 'react-custom-events';
import { NotificationContext } from '../context/Notification/ProviderNotification';
import DisplayNotification from '../context/Notification/DisplayNotification';

import axios from 'axios';
import '../css/SuperviserLocation.css';

const SuperviserLocation = ({ msg }) => {
  const { dispatch } = useContext(NotificationContext);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [{ error_message, destination_location_status }] = msg;
  const [errorMessage, setErrorMessage] = useState('error message');
  const [destinationLocationStatus, setDestinationLocationStatus] = useState(
    true
  );

  const ActionNotification = useCallback(
    (status) => {
      if (status === 'SUCCESS') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'POPUP_CORRECT',
            message: 'ส่งค่าสำเร็จ',
          },
        });
      }
    },
    [dispatch]
  );

  useEffect(() => {
    console.log(destinationLocationStatus);
    if (destinationLocationStatus) {
      ActionNotification('SUCCESS');
    } else if (!destinationLocationStatus) {
      ActionNotification('FAIL');
      setErrorMessage(error_message);
    }
  }, [destinationLocationStatus, error_message]);

  const handleSend = () => {
    let location = {
      source_location: source,
      destination_location: destination,
    };
    emitCustomEvent('SEND_LOCATION', location);
    setSource('');
    setDestination('');
    console.log(source, destination);
    const res = axios.get(
      'https://44cdb04c-ce85-4389-8564-72f16f3f2eba.mock.pstmn.io/testing-swh-http',
      {
        params: {
          source: source,
          destination: destination,
        },
      }
    );
    console.log(res.data);
  };
  return (
    <>
      <div className='container-svr'>
        <div className='headertext'>From Location</div>
        <div className='box-input'>
          <input
            type='text'
            name='location'
            className='input-text2'
            placeholder='start'
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
        <div className='headertext'>Go to Location</div>
        <div className='box-input'>
          <input
            type='text'
            name='location'
            className='input-text2'
            placeholder='end'
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className='box-input'>
          <button className='btn-send' onClick={handleSend}>
            SEND
          </button>
        </div>
        {!destinationLocationStatus && (
          <div className='error-text'>{errorMessage}</div>
        )}
        {<DisplayNotification />}
      </div>
    </>
  );
};
export default SuperviserLocation;
