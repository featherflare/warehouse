import React, { useState, useCallback, useContext, useEffect } from 'react'
import * as IoIcons5 from 'react-icons/io5';
import useHardwareId from '../component/Hooks/useHardwareId';
import useToken from '../component/Hooks/useToken';
import useTicket from '../component/Hooks/useTicket';
import { NotificationContext } from '../context/Notification/ProviderNotification';
import DisplayNotification from '../context/Notification/DisplayNotification';
import axios from 'axios';
import '../css/RegisterHardwareId.css'
import { emitCustomEvent } from 'react-custom-events';
import Loading from './Loading';

async function requestTicket(token, hardwareId) {
  var body = {
      "hardware_id": hardwareId
  }

  return axios({
    method: 'post',
    url: "https://44cdb04c-ce85-4389-8564-72f16f3f2eba.mock.pstmn.io/requestTicket",
    data: body,
    headers: {
      "Authorization": token
    }
  }).then(data => data.data);
}

const RegisterHardwareId = ({ ticket, setTicket, hardwareId, setHardwareId}) => {
  const { dispatch } = useContext(NotificationContext);
  // const { hardwareId, setHardwareId} = useHardwareId();
  const [value,setValue] = useState();
  const [isReady, setIsReady] = useState(true);
  const { token, setToken } = useToken();
  const [isLoading, setIsLoading] = useState(false);
  // const { ticket, setTicket } = useTicket();

  let interval;

  const ActionNotification = useCallback(
      (status) => {
        if (status === 'SUCCESS') {
          dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
              type: 'POPUP_CORRECT',
              message: 'บันทึกสำเร็จ',
            },
          });
        } else if (status === 'EMPTY'){
          dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
              type: 'POPUP_INCORRECT',
              message: 'กรุณากรอกหมายเลขอุปกรณ์ 3 หลัก!',
            },
          })
        } else if (status === 'HW_NOT_READY'){
          dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
              type: 'POPUP_INCORRECT',
              message: 'กรุณากรอกหมายเลขอุปกรณ์ 3 หลัก!',
            },
          })
        }
      },
      [dispatch]
    );
  
  const getTicket = async (value) => {
    const { ticket, is_ready } = await requestTicket(token, value)
    console.log(ticket);
    if (ticket && is_ready) {
      let store = {}
      store['ticket'] = ticket
      setTicket(store);
      setIsReady(true)
      setIsLoading(false);
      clearInterval(interval);
      ActionNotification('SUCCESS')
      emitCustomEvent('CLOSE_LOADING');
    } else if (ticket || !is_ready) {
      clearInterval(interval);
      emitCustomEvent('CLOSE_LOADING');
      setIsReady(false);
      setIsLoading(false);
      alert(`อุปกรณ์ฮาร์ดแวร์หมายเลข: ${value} อาจไม่พร้อมใช้งาน กรุณาเปลี่ยนอุปกรณ์`);
    }
  }

  const handleSubmit = async e => {
      if(value){
          var val = value.toString();
          if(val.length === 3){
              let store = {};
              store['hardwareId'] = value;
              setHardwareId(store);
              setIsLoading(true);
              interval = setInterval(() => {
                getTicket(value);
              }, 1500);
              setValue('');
          }else {
            setIsLoading(false);
              ActionNotification('EMPTY')
          }
      } else {
        setIsLoading(false);
          ActionNotification('EMPTY')
      }
  }

  const handleChange = (e) => {
      const re = /^[0-9\b]+$/
      if (e.target.value ==='' || re.test(e.target.value)){
          let val = e.target.value;
          let max = 3;
          let newVal = val < max ? val : parseInt(val.toString().substring(0, max));
          setValue(newVal);
      }
  }

  useEffect(() => {
    emitCustomEvent('HW_READY', isReady);
    emitCustomEvent('CLOSE_LOADING');
  }, [isReady])

  return(
      <>
      <div className='box-container-rhw'>
          <div className='container-rhw'>
              <div className='icons-rhw'>
                  <IoIcons5.IoSettingsSharp size={'100%'} color={'#254549'}/>
              </div>
              <div className='headertext-rhw'>ตั้งค่าอุปกรณ์ฮาร์ดแวร์</div>
              <div className='subheadertext-rhw'>กรุณาระบุหมายเลขอุปกรณ์ 3 หลัก</div>
              <div className='body-rhw'>หมายเลขอุปกรณ์ปัจจุบัน: {hardwareId} </div>
              <input 
                  type='text'
                  pattern='[0-9]*'
                  inputMode='decimal'
                  name='hardwarId'
                  className='input-text-rhw'
                  placeholder='hardwareId'
                  maxLength='3'
                  value={value}
                  onChange={(e) => handleChange(e)}
                  />
              <div className='box-btn-rhw'>
                  <button type='submit' className='btn-rhw' onClick={handleSubmit}>บันทึกค่า</button>
              </div>
              {isLoading && <Loading />}
              {<DisplayNotification />}
          </div>
      </div>
      </>
  )
}

export default RegisterHardwareId;