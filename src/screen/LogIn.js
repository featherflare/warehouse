import React, { useState } from 'react';
import '../css/Login.css';
import QrcodeLogIn from '../component/QrcodeLogIn';
import axios from 'axios';
import { emitCustomEvent, useCustomEventListener } from 'react-custom-events';
import PropTypes from 'prop-types';
import ModalLogin from '../component/ModalLogin';
import Loading from './Loading';


async function loginUser(credentials, setCloseModal, setUserName, setPassword, setErrMsg) {
  return axios({
    method: "post",
    url: "http://192.168.1.69:8000/auth/token/",
    data: credentials,
  }).then(data => data.data).catch(error => {
    console.log(error);
    setCloseModal(false);
    setErrMsg('ชื่อผู้ใช้งานหรือรหัสผ่านผิดพลาด');
    setUserName('');
    setPassword('');
  });
}

async function requestTicket(token, hardwareId) {
  var body = {
    "hardware_id": hardwareId
  }

  return axios({
    method: 'post',
    url: "http://192.168.1.69:8000/auth/hardware-ticket/",
    data: body,
    headers: {
      "Authorization": `Token ${token}`
    }
  }).then(data => data.data);
}

export default function Login({ token, setToken, ticket, setTicket, hardwareId, setHardwareId, isHardwareReady, setProfile }) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [qrCodeCam, setQrCodeCam] = useState(false);
  const [closeModal, setCloseModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('');
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
    if (username && password) {
      setIsLoading(true);
      try {
        const { token, user_id, name, is_superuser, non_field_errors } = await loginUser({
          "username": username,
          "password": password
        }, setCloseModal, setUserName, setPassword, setErrMsg)
    
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
      } catch (error) {
        console.log(error);
        setCloseModal(false);
        setUserName('');
        setPassword('');
      }
    } else {
      setCloseModal(false);
      setErrMsg('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
    }
  }

  return (
    <>
      <div className='container-login'>
      {!closeModal && <ModalLogin errMsg={errMsg}/>}
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
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <input
                type='password'
                name='password'
                className='input-text'
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button className='btn-login' type='submit' onClick={handleSubmit}>
                SIGN IN
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};