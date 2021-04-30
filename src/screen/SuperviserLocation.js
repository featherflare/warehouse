import React, { useState } from 'react';
import { emitCustomEvent } from 'react-custom-events';
import axios from 'axios';
import '../css/SuperviserLocation.css';

const SuperviserLocation = () => {
  const [source, setSource] = useState('start-location');
  const [destination, setDestination] = useState('end-location');
  const handleSend = () => {
    let location = {
      source: source,
      destination: destination,
    };
    emitCustomEvent('SEND_LOCATION', location);
    const res = axios.get('https://44cdb04c-ce85-4389-8564-72f16f3f2eba.mock.pstmn.io/testing-swh-http', {
      params : {
        source: source,
        destination: destination
      }
    });
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
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className='box-input'>
          <button className='btn-send' onClick={handleSend}>
            SEND
          </button>
        </div>
      </div>
    </>
  );
};
export default SuperviserLocation;
