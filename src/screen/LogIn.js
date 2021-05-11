import React, { useState } from 'react';
import '../css/Login.css';
import QrcodeLogIn from '../component/QrcodeLogIn';
import axios from 'axios';
import { emitCustomEvent, useCustomEventListener } from 'react-custom-events';
import PropTypes from 'prop-types';
import ModalLogin from '../component/ModalLogin';
import Loading from './Loading';


async function loginUser(credentials) {
  return axios({
    method: "post",
    url: "https://44cdb04c-ce85-4389-8564-72f16f3f2eba.mock.pstmn.io/loginRequestToken",
    data: credentials,
  }).then(data => data.data);
}

async function requestTicket(token, hardwareId) {
  return axios({
    method: 'post',
    url: "https://44cdb04c-ce85-4389-8564-72f16f3f2eba.mock.pstmn.io/requestTicket",
    data: {
      "hardwareId": hardwareId
    },
    headers: {
      "Authorization": token
    }
  }).then(data => data.data);
}

export default function Login({ token, setToken, ticket, setTicket, hardwareId, setHardwareId, isHardwareReady, setProfile }) {
  const [username, setUserName] = useState('username');
  const [password, setPassword] = useState('password');
  const [qrCodeCam, setQrCodeCam] = useState(false);
  const [closeModal, setCloseModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  let interval;

  useCustomEventListener('CloseModal',(modal) => {
    setCloseModal(modal)
  });

  const getTicket = async () => {
    const { ticket, is_ready } = await requestTicket(token, hardwareId)
    if (ticket || is_ready) {
      let store = {}
      store['ticket'] = ticket
      setTicket(store);
      clearInterval(interval)
      setIsLoading(false);
      emitCustomEvent('LOGIN_SUCCESSFULLY');
      emitCustomEvent('CLOSE_LOADING');
    } else if (ticket || !is_ready) {
      clearInterval(interval);
      setIsLoading(false);
      emitCustomEvent('CLOSE_LOADING');
      alert(`อุปกรณ์ฮาร์ดแวร์หมายเลข: ${hardwareId} อาจไม่พร้อมใช้งาน กรุณาเปลี่ยนอุปกรณ์`);
    }
  }

  const handleQRCode = () => {
    if (!qrCodeCam) {
      setQrCodeCam(true);
    } else if (qrCodeCam) {
      setQrCodeCam(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const { token, user_id, name, is_superuser, non_field_errors } = await loginUser({
      "username": username,
      "password": password
    })

    if (token) {
      let store1 = {}
      store1['token'] = token;
      store1['saveTime'] = new Date().getTime();
      let store2 = {};
      let store3 = {
        user_id: user_id,
        name: name,
        is_superuser: is_superuser
      };
      store2['profile'] = store3
      
      setProfile(store2);
      setIsLoading(false);
      if (is_superuser) {
        emitCustomEvent('SUPERUSER');
      } else if (hardwareId) {
        interval = setInterval(() => {
          setIsLoading(true)
          getTicket();
        }, 1500)
      } 
      setToken(store1);
    } else if (non_field_errors) {
      setCloseModal(false);
    }
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