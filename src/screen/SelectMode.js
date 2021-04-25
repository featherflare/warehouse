import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from '../component/NavBar';
import Profile from '../assets/image/face.png';
import '../css/SelectMode.css';
import { useCustomEventListener, emitCustomEvent } from 'react-custom-events';
// import PickUp from '../screen/PickUp';
// import PutAway from '../screen/PutAway';
// import Receive from '../screen/Receive';
// import LocationTransfer from '../screen/LocationTransfer';

const SelectMode = ({ notiNavbarPickUp, notiNavbarLocation, hardware }) => {
  const [pickupAmount, setPickupAmount] = useState(10);
  const [locationTranferAmount, setLocationTranfer] = useState(10);
  const handlePutAway = () => {
    var payload = 2;
    emitCustomEvent('CHANGE_MODE_FROM_SELECT_MODE', payload);
    console.log('handle', payload);
  };
  const handlePickup = () => {
    var payload = 3;
    emitCustomEvent('CHANGE_MODE_FROM_SELECT_MODE', payload);
    console.log('handle', payload);
  };
  const handleLocation = () => {
    var payload = 4;
    emitCustomEvent('CHANGE_MODE_FROM_SELECT_MODE', payload);
    console.log('handle', payload);
  };
  return (
    <div className='container-selectmode'>
      <Navbar
        notiNavbarPickUp={notiNavbarPickUp}
        notiNavbarLocation={notiNavbarLocation}
        hardware={hardware}
      />
      <div className='grid'>
        <img
          src={Profile}
          alt='profile'
          width='150'
          height='150'
          style={{ borderRadius: 200, backgroundColor: '#FFF' }}
        />
        <div className='header-text'>สวัสดี! คุณสมบัติ ประพฤติดี</div>
      </div>
      <hr />
      <div className='feature'>
        <Link to={'/putAway'} onClick={handlePutAway}>
          <div className='box'>Put Away</div>
        </Link>
        <Link to={'/pickUp'} onClick={handlePickup}>
          {pickupAmount !== 0 && <div className='amount'>{pickupAmount}</div>}
          <div className='box'>Pick Up</div>
        </Link>
        <Link to={'/locationTransfer'} onClick={handleLocation}>
          {locationTranferAmount !== 0 && (
            <div className='amount'>{locationTranferAmount}</div>
          )}
          <div className='box'>Location Transfer</div>
        </Link>
      </div>
    </div>
  );
};

export default SelectMode;
