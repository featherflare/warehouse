import { useState } from 'react';
import { emitCustomEvent } from 'react-custom-events';

export default function useToken() {
  const hours = 10;
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

    if (userToken && (new Date().getTime() - userToken.saveTime > hours * 60 * 60 * 1000)) { //hours * 60 * 60 * 1000
      emitCustomEvent('SESSION_TIMEOUT')
    }

    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}