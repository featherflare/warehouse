import React, { useState, useEffect } from 'react';
import { emitCustomEvent } from 'react-custom-events';
import QrReader from 'react-qr-scanner';
const QrcodeLogIn = () => {
  // const defaultState = [
  //   {
  //     result: 'No result',
  //   },
  // ];
  const [data, setData] = useState();
  const [result, setResult] = useState([]);
  // const [{ result }] = data;

  const handleScan = (data) => {
    try {
      var scaning = data.text;
    } catch {
      var scaning = data;
    }

    if (data) {
      setData(scaning);
    }
  };

  const handleError = (err) => {
    console.log(err);
  };
  useEffect(() => {
    if (typeof data !== 'undefined') {
      parseJwt();
    }
  }, [data]);

  useEffect(() => {
    if (result !== 'No result') {
      emitCustomEvent('LOGIN', result);
    }
  }, [result]);

  const parseJwt = (token) => {
    var token = data;
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return setResult(jsonPayload);
  };

  console.log(data);
  console.log(result);
  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ height: 300, width: 350 }}
      />
    </div>
  );
};

export default QrcodeLogIn;
