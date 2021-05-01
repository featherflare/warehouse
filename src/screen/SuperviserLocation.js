import React, { useState, useEffect, useCallback, useContext } from 'react';
import { emitCustomEvent } from 'react-custom-events';
import { NotificationContext } from '../context/Notification/ProviderNotification';
import DisplayNotification from '../context/Notification/DisplayNotification';

import axios from 'axios';
import '../css/SuperviserLocation.css';

const SuperviserLocation = ({ msg }) => {
  const { dispatch } = useContext(NotificationContext);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [errorMessage, setErrorMessage] = useState([]);

  const ActionNotification = useCallback(
    (status) => {
      if (status === 'SUCCESS') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'POPUP_CORRECT',
            message: 'บันทึกค่าสำเร็จ',
          },
        });
      } else if (status === 'ERROR'){
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'POPUP_INCORRECT',
            message: 'กรุณาระบุตำแหน่ง',
          },
        })
      }
    },
    [dispatch]
  );
  const toInputUppercase = e => {
    e.target.value = ("" + e.target.value).toUpperCase();
  }
  
  const handleSend = () => {
   
    setSource('');
    setDestination('');
    console.log(source, destination);

    if (source && destination) {
      axios.get(
        'http://192.168.137.16:8000/managements/location_transfer/', //http://192.168.137.16:8000/test-api/ //https://44cdb04c-ce85-4389-8564-72f16f3f2eba.mock.pstmn.io/testing-swh-http/
        {
          params: {
            source: source,
            destination: destination
          }
        }).then((response) => {
            console.log(response.data.error)
            setErrorMessage(response.data.error);
          });
    }

    if (errorMessage.length === 0) {
      if (source !== '' && destination !== ''){
        ActionNotification('SUCCESS');
      } else {
        ActionNotification('ERROR')
      }
    }
        
        // axios({
          //   method: 'get',
          //   url: 'https://44cdb04c-ce85-4389-8564-72f16f3f2eba.mock.pstmn.io/testing-swh-http/',
          //   responseType: 'stream',
          //   params: {
    //     source: source,
    //     destination: destination
    //   }
    // });
    // console.log(res);
    // console.log(res.data);
  };
  return (
    <>
      <div className='container-svr'>
        <div className='headertext'>หน้าระบุตำแหน่งสำหรับ Location Transfer</div>
        <div className='bodytext'>ตำแหน่งเดิม</div>
        <div className='box-input'>
          <input
            type='text'
            name='location'
            className='input-text2'
            placeholder='กรุณาระบุตำแหน่งเดิม'
            value={source}
            onChange={(e) => setSource(e.target.value)}
            onInput={toInputUppercase}
            
          />
        </div>
        <div className='bodytext'>ตำแหน่งใหม่</div>
        <div className='box-input'>
          <input
            type='text'
            name='location'
            className='input-text2'
            placeholder='กรุณาระบุตำแหน่งใหม่'
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onInput={toInputUppercase}
          />
        </div>
        <div className='box-input'>
          <button className='btn-send' onClick={handleSend}>
            บันทึก
          </button>
        </div>
        {errorMessage.length !== 0 && (
          <div className='error-text'>
            <div >เกิดข้อผิดพลาด :</div>

            {errorMessage.map((err) => {
              return(
                <div>- {err}</div>
              )
            })}
          </div>
        )}
        {<DisplayNotification />}
      </div>
    </>
  );
};
export default SuperviserLocation;
