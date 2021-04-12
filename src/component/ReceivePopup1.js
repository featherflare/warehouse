/*
ReceivePopupStage3 is use to display about correct/incorrect of RFID Tag.
The display in the middle of display.
If correct Popup color is green,But If Incorrect Popup color is red.
In Incorrect Case hace 3 case.
1. IF Iserror send 'TAG' is mean "Tag Error"
2. IF Iserror send 'NO 2ND SCAN' is mean "Userr doesn't scan barcode second time"
3. IF Iserror send 'REJECT' is mean "Pallet Error"

*/
import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
const ReceivePopupStage3 = ({
  SKUName,
  SKUNumber,
  barcode,
  status,
  isPopUp,
  error,
  msg
}) => {
  const [popUp, setPopUp] = useState(isPopUp);
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  // if (isPopUp !== popUp) {
  //   setPopUp(isPopUp);
  // }
console.log('popup', isPopUp, popUp)
  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 0.5;
        }

        clearInterval(id);
        return prev;
      });
    }, 50);

    setIntervalID(id);
  };

  useEffect(() => {
    if (status === true) {
      setWidth(0)
      handleStartTimer();
    }
  }, [status]);

  useEffect(() => {
    if (width === 100) {
      setPopUp(false);
    }
  }, [width]);

  useEffect(() => {
    if (typeof(isPopUp) !== 'undefined' && isPopUp !== popUp) {
      setPopUp(isPopUp);
    }
  }, [msg, isPopUp]);

  // console.log(isPopUp, popUp);
  return (
    <>
      {popUp && (
        <div className={'receive-wrapper'}>
          <div className={`receive-item ${status ? true : false}`}>
            <div className='gridheader'>
              <div className='icon'>
                {status && <FaIcons.FaCheckCircle size={70} />}
                {status === false && (
                  <RiIcons.RiCloseCircleFill size={70} color='#fff' />
                )}
              </div>
              <div className={`headerStage3 ${status ? true : false}`}>
                Receive Mode
              </div>
            </div>
            <hr className='receive-line' />
            {/* Output From Hardware  */}
            <div className='wrapper'>
              <div className={`topic1 ${status ? true : false}`}>SO Number</div>
              <div className='vertical-line'></div>
              <div className={`topic ${status ? true : false}`}>
                {SKUNumber}
              </div>
              <div className={`topic1 ${status ? true : false}`}>SO Item</div>
              <div className='vertical-line'></div>
              <div className={`topic ${status ? true : false}`}>{SKUName}</div>
            </div>
            {/* Check Error Type  */}
            <hr className='receive-line' />
            {status === true && (
              <div className={`error-check-true`}>
                กรุณานำพาเลทสินค้าไปวางไว้ที่จุดที่กำหนด
              </div>
            )}
            {status === false && error === 'TAG' && (
              <div className={`error-check-false`}>
                RFID Tag มีข้อผิดพลาดกรุณานำ Tag ใหม่มาเปลี่ยน
              </div>
            )}
            {status === false && error === 'NO 2ND SCAN' && (
              <div className={`error-check-false`}>
                ยังไม่ได้สแกน Barcode ครั้งที่ 2
              </div>
            )}
            {status === false && error === 'REJECT' && (
              <div className={`error-check-false`}>
                Pallet มีปัญหากรุณานำไปวางไว้ที่จุดที่กำหนด
              </div>
            )}
            {status === true && <div className={'bar'} style={{ width: `${width}%` }} />}
          </div>
        </div>
      )}
    </>
  );
};

export default ReceivePopupStage3;
