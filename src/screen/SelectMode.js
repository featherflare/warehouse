import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/NavBar';
import Profile from '../assets/image/face.png';
import '../css/SelectMode.css';
import { emitCustomEvent } from 'react-custom-events';
// import PickUp from '../screen/PickUp';
// import PutAway from '../screen/PutAway';
// import Receive from '../screen/Receive';
// import LocationTransfer from '../screen/LocationTransfer';

const SelectMode = ({ notiNavbarPickUp, notiNavbarLocation, hardware,msg }) => {
  const [pickupAmount, setPickupAmount] = useState(0);
  const [locationTranferAmount, setLocationTranfer] = useState(0);

  useEffect(() => {
    let payload = [
      {
        information_type: 'mode_changed',
        new_mode: 0,
        new_stage: 0
      }
    ]
    emitCustomEvent('SEND_PAYLOAD', payload);
    console.log('send payload')
  }, []);

  useEffect(() => {
    const [{ pickup_amount, location_transfer_amount }] = msg
    setPickupAmount(pickup_amount);
    setLocationTranfer(location_transfer_amount);
  }, [msg]);

  const handlePutAway = () => {
    var mode = 2;
    let payload = [{
        information_type: 'mode_changed',
        new_mode: 2,
        new_stage: 1
    }];
    emitCustomEvent('CHANGE_MODE_FROM_SELECT_MODE', mode);
    emitCustomEvent('SEND_PAYLOAD', payload);
  };
  const handlePickup = () => {
    var mode = 3;
    let payload = [{
      information_type: 'mode_changed',
      new_mode: 3,
      new_stage: 2
    }];
    emitCustomEvent('CHANGE_MODE_FROM_SELECT_MODE', mode);
    emitCustomEvent('SEND_PAYLOAD', payload);
  };
  const handleLocation = () => {
    var mode = 4;
    let payload = [{
      information_type: 'mode_changed',
      new_mode: 4,
      new_stage: 2
    }];
    emitCustomEvent('CHANGE_MODE_FROM_SELECT_MODE', mode);
    emitCustomEvent('SEND_PAYLOAD', payload);
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
          {pickupAmount !== 0 && pickupAmount && <div className='amount1'>{pickupAmount}</div>}
          <div className='box'>Pick Up</div>
        </Link>
        <Link to={'/locationTransfer'} onClick={handleLocation}>
          {locationTranferAmount !== 0 && locationTranferAmount && (
            <div className='amount2'>{locationTranferAmount}</div>
          )}
          <div className='box'>Location Transfer</div>
        </Link>
      </div>
    </div>
  );
};

export default SelectMode;
