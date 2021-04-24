import React, { useState } from 'react';
import '../css/Login.css';
import QrcodeLogIn from '../component/QrcodeLogIn';

const Login = () => {
  const [username, setUserName] = useState('username');
  const [password, setPassword] = useState('password');
  const [qrCodeCam, setQrCodeCam] = useState(false);
  const handleQRCode = () => {
    if (!qrCodeCam) {
      setQrCodeCam(true);
    } else if (qrCodeCam) {
      setQrCodeCam(false);
    }
  };
  return (
    <>
      <div className='container-login'>
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
              <button className='btn-login' type='submit'>
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

export default Login;
