import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/NavBar';
import axios from 'axios';
import '../css/SelectMode.css';
import { emitCustomEvent } from 'react-custom-events';
import useToken from '../component/Hooks/useToken';

async function fetchPhoto(userId) {
  return axios({
    method: "get",
    url: "https://44cdb04c-ce85-4389-8564-72f16f3f2eba.mock.pstmn.io/login",
    params: userId
  }).then(data => data.json())
}

const SelectMode = ({
  notiNavbarPickUp,
  notiNavbarLocation,
  hardware,
  msg,
  modeNav,
  serverConnection,
  profile
}) => {
  const [pickupAmount, setPickupAmount] = useState(0);
  const [locationTranferAmount, setLocationTranfer] = useState(0);

  const { token, setToken } = useToken();
  const [picture, setPicture] = useState('https://scontent.fbkk13-2.fna.fbcdn.net/v/t31.18172-8/30171456_1766009410144864_5891886392162664402_o.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeHRcTkFamIO40klFQav2cSDF_yt64MaLr8X_K3rgxouv9RNkvdpVfeqAARkB2i4EWj5OpwgGAdPD3ujl_bVM6H-&_nc_ohc=cO_6_MI0GsYAX93WQGW&_nc_ht=scontent.fbkk13-2.fna&oh=665dc1ee9129b654ab7344703531a3d6&oe=60BF3C77');
  const [{ mode, stage }] = msg;

  const getPicture = async e => {
    const { user_image } = await fetchPhoto({user_id: profile.user_id});
    setPicture(`data:image/jpg;base64, ${user_image}`);
  }

  useEffect(() => {
    let payload = [
      {
        information_type: 'mode_changed',
        new_mode: 0,
        new_stage: 0,
      },
    ];
    emitCustomEvent('SEND_PAYLOAD', payload);
    // getPicture();
    console.log('send payload');
  }, []);

  useEffect(() => {
    const [{ pickup_amount, location_transfer_amount }] = msg;
    setPickupAmount(pickup_amount);
    setLocationTranfer(location_transfer_amount);
  }, [msg]);

  const handlePutAway = () => {
    var mode = 2;
    let payload = {
        information_type: 'mode_changed',
        new_mode: 2,
        new_stage: 1,
    };
    emitCustomEvent('CHANGE_MODE_FROM_SELECT_MODE', mode);
    emitCustomEvent('SEND_PAYLOAD', payload);
  };
  const handlePickup = () => {
    var mode = 3;
    let payload = {
        information_type: 'mode_changed',
        new_mode: 3,
        new_stage: 2,
    };
    emitCustomEvent('CHANGE_MODE_FROM_SELECT_MODE', mode);
    emitCustomEvent('SEND_PAYLOAD', payload);
  };
  const handleLocation = () => {
    var mode = 4;
    let payload = {
        information_type: 'mode_changed',
        new_mode: 4,
        new_stage: 2,
    };
    emitCustomEvent('CHANGE_MODE_FROM_SELECT_MODE', mode);
    emitCustomEvent('SEND_PAYLOAD', payload);
  };
  useEffect(() => {
    if (notiNavbarPickUp || notiNavbarLocation){
      let payload = {
          information_type: 'mode_changed',
          new_mode: 0,
          new_stage: 0,
      };
      emitCustomEvent('SEND_PAYLOAD', payload);
    }
  }, [notiNavbarPickUp, notiNavbarLocation])

  return (
    <div className='container-selectmode'>
      <Navbar
        mode={modeNav}
        notiNavbarPickUp={notiNavbarPickUp}
        notiNavbarLocation={notiNavbarLocation}
        hardware={hardware}
        serverConnection={serverConnection}
      />
      <div className='grid'>
        <img
          src={picture}
          alt='profile'
          width='150'
          height='150'
          style={{ borderRadius: 200, backgroundColor: '#FFF' }}
        />
        <div className='header-text'>สวัสดี! {profile.name}</div>
      </div>
      <hr />
      <div className='feature'>
        <Link to={'/putAway'} onClick={handlePutAway}>
          <div className='box'>Put Away</div>
        </Link>
        <Link to={'/pickUp'} onClick={handlePickup}>
          {pickupAmount !== 0 && pickupAmount && (
            <div className='amount1'>{pickupAmount}</div>
          )}
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
