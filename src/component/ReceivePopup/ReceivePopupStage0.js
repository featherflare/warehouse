/*
ReceivePopupStage0 is use to display a new order notifaction.
The display in the middle of display.

*/
import React, { useState, useEffect, useContext } from 'react';
import { emitCustomEvent } from 'react-custom-events';
//function of accept order
const ReceivePopupStage0 = ({ isPopUp }) => {
  const [popUp, setPopUp] = useState(isPopUp);
  //ส่งค่่า acceept กลับไปให้backendด้วยเป็นค่าstatusเมื่อเป็นtrue
  const [accept, setAccept] = useState(false);

  const HandleClickAccept = () => {
    setAccept(true);
    setPopUp(false);
    let payload = {
        hardware_id: '8000',
        employee_id: '60070502437',
        mode: 1,
        stage: 1,
        status: true
      }
    
    emitCustomEvent('SEND_PAYLOAD', payload)
    console.log('Accept');
  };
  const HandleClickDeline = () => {
    setPopUp(false);
    console.log('Decline');
  };
  useEffect(() => {
    if (accept) {
      console.log(accept);
    }
  }, [accept]);
  return (
    <>
      {popUp && (
        <div className={'receive-wrapper'}>
          <div className={'receive-item '}>
            <div className='headerStage0'>
              มีออเดอร์ receive ค้างไว้อยู่ที่ชั้น 1
            </div>
            <div className={`button ${accept ? 'accept' : ''}`}>
              <button className='btn' type='button' onClick={HandleClickAccept}>
                Accept
              </button>
              <button className='btn' type='button' onClick={HandleClickDeline}>
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReceivePopupStage0;
