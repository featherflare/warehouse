import React, { useState, useCallback, useContext } from 'react'
import * as IoIcons5 from 'react-icons/io5';
import useHardwareId from '../component/Hooks/useHardwareId';
import useToken from '../component/Hooks/useToken';
import useTicket from '../component/Hooks/useTicket';
import { NotificationContext } from '../context/Notification/ProviderNotification';
import DisplayNotification from '../context/Notification/DisplayNotification';
import axios from 'axios';
import '../css/RegisterHardwareId.css'

async function requestTicket(token, hardwareId) {
    var body = {
        "hardware_id": hardwareId
    }

    return axios({
      method: 'post',
      url: "https://44cdb04c-ce85-4389-8564-72f16f3f2eba.mock.pstmn.io/ticket",
      data: body,
      headers: {
        "Authorization": token
      }
    }).then(data => data.json());
  }

const RegisterHardwareId = () => {
    const { dispatch } = useContext(NotificationContext);
    const { hardwareId, setHardwareId} = useHardwareId();
    const [value,setValue] = useState();
    const { token, setToken } = useToken();
    const { ticket, setTicket } = useTicket();

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

    const handleSubmit = async e => {
        if(value){
            var val = value.toString();
            console.log(val.length)
            if(val.length === 3){
                let store = {};
                store['hardwareId'] = value;
                
                setHardwareId(store);
                console.log(hardwareId);
                setValue('');
                const {ticket, is_ready} = await requestTicket(token, hardwareId);
                if (is_ready) {
                    ActionNotification('SUCCESS');
                } else {
                    ActionNotification('HW_NOT_READY');
                }
                console.log(is_ready)
                setTicket(ticket);
            }else {
                ActionNotification('EMPTY')
            }
        } else {
            ActionNotification('EMPTY')
        }
    }
    const handleChange = (e) => {
        const re = /^[0-9\b]+$/
        if (e.target.value ==='' || re.test(e.target.value)){
            let val = e.target.value
            console.log(typeof(val));
            console.log(val);
            let max = 3
            let newVal = val < max ? val : parseInt(val.toString().substring(0, max));
            setValue(newVal);
        }
    }
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
                {<DisplayNotification />}
            </div>
        </div>
        </>
    )
}

export default RegisterHardwareId;