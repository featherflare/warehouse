import React, { useState } from 'react';
import '../css/Login.css';

const Login = () => {
  const [username, setUserName] = useState('username');
  const [password, setPassword] = useState('password');
  return (
    <>
      <div className='container-login'>
        <div className='leftBox-login'>
          <div>
            <div className='text1'>SMART</div>
            <div className='text2'>WAREHOUSE</div>
            <div className='text-grid'>
              <div className='text3'>by</div>
              <div className='text4'>ATACO</div>
            </div>
          </div>
        </div>
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
            <button className='btn-login'>QR code</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
