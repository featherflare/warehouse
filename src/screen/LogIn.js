import React, { useState } from 'react';
import '../css/Login.css';
import QrcodeLogIn from '../component/QrcodeLogIn';
import axios from 'axios';
import { emitCustomEvent, useCustomEventListener } from 'react-custom-events';
import PropTypes from 'prop-types';
import useHardwareId from '../component/Hooks/useHardwareId';
import ModalLogin from '../component/ModalLogin'

async function loginUser(credentials) {
  return axios({
    method: "post",
    url: "https://44cdb04c-ce85-4389-8564-72f16f3f2eba.mock.pstmn.io/login",
    data: credentials,
  }).then(data => data.json())
}

async function requestTicket(token) {
  return axios({
    method: 'get',
    url: "https://44cdb04c-ce85-4389-8564-72f16f3f2eba.mock.pstmn.io/ticket",
    headers: {
      "Authorization": token
    }
  }).then(data => data.json());
}

export default function Login({ setToken, setTicket }) {
  const [username, setUserName] = useState('username');
  const [password, setPassword] = useState('password');
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [qrCodeCam, setQrCodeCam] = useState(false);

  const { hardwareId, setHardwareId } = useHardwareId();
  const [closeModal, setClostModal] = useState(true);

  useCustomEventListener('CloseModal',(modal) => {
    setClostModal(modal)
  });

  const handleQRCode = () => {
    if (!qrCodeCam) {
      setQrCodeCam(true);
    } else if (qrCodeCam) {
      setQrCodeCam(false);
    }
  };

  const handleSubmit = async e => {
    setClostModal(false)
    // e.preventDefault();
    // const {token, is_superuser} = await loginUser({
    //   "username": username,
    //   "password": password
    // });
    // setToken(token);
    // setIsSuperuser(is_superuser);

    // if (!is_superuser && hardwareId) {
    //   const ticket = await requestTicket(token)
    //   setTicket(ticket);
    // }
  }

  if (!hardwareId) {
    // return set hw id page
  }

  return (
    <>
      <div className='container-login'>
      {!closeModal && <ModalLogin/>}
        <div className='leftBox-login'>
          <div className='textbox'>
            <div className='text1'>SMART</div>
            <div className='text2'>WAREHOUSE</div>
            <div className='text3'>PROJECT</div>
          </div>
        </div>
        {!qrCodeCam && (
          <div className='rightBox-login'>
            <div className='text5'>SIGN IN</div>
            <div>
              <input
                type='text'
                name='username'
                className='input-text'
                placeholder='username'
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <input
                type='password'
                name='password'
                className='input-text'
                placeholder='password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button className='btn-login' type='submit' onClick={handleSubmit}>
                SIGN IN
              </button>
            </div>
            <div>
              <button className='btn-login' onClick={handleQRCode}>
                QR code
              </button>
            </div>
          </div>
        )}
        {qrCodeCam && (
          <div className='rightBox-qrCode'>
            <QrcodeLogIn />
            <button className='btn-back' onClick={handleQRCode}>
              back
            </button>
          </div>
        )}
        
      </div>
    </>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};