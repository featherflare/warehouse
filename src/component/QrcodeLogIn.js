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
  // useEffect(() => {
  //   if (typeof data !== 'undefined') {
  //     parseJwt(token);
  //   }
  // }, [data]);

  useEffect(() => {
    if (result !== 'No result') {
      emitCustomEvent('LOGIN', result);
    }
  }, [result]);

  const token = data;
  // function parseJwt(token) {
  //   var jwt = require('jsonwebtoken');
  //   // 'secret' is verify secretcode in signature
  //   jwt.verify(token, 'secret', function (err) {
  //     if (err) {
  //       console.log('wrong');
  //     } else {
  //       const base64Url = data.split('.')[1];
  //       const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //       const buff = new Buffer(base64, 'base64');
  //       const payloadinit = buff.toString('ascii');
  //       const payload = JSON.parse(payloadinit);
  //       setResult(payload);
  //     }
  //   });
  // }

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
