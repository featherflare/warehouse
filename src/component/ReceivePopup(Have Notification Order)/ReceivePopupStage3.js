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

const ReceivePopupStage3 = ({
  SKUName,
  SKUNumber,
  barcode,
  status,
  isPopUp,
  error,
}) => {
  const [popUp, setPopUp] = useState(isPopUp);
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);
  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 0.5;
        }

        clearInterval(id);
        return prev;
      });
    }, 75);

    setIntervalID(id);
  };

  useEffect(() => {
    if (status === true) {
      handleStartTimer();
    }
  }, [status]);

  useEffect(() => {
    if (width === 100) {
      setPopUp(false);
    }
  }, [width]);

  return (
    <>
      {popUp && (
        <div className={'receive-wrapper'}>
          <div className={`receive-item ${status ? true : false}`}>
            <div className='headerStage3'>RFID Tag Check</div>
            {/* Output From Hardware  */}
            <div className='wrapper'>
              <div className='topic'>SKUName</div>
              <div className='topic'>{SKUName}</div>
              <div className='topic'>SKUNumber</div>
              <div className='topic'>{SKUNumber}</div>
              <div className='topic'>Barcode</div>
              <div className='topic'>{barcode}</div>
            </div>
            {/* Check Error Type  */}
            {status === true && (
              <div className={`error-check`}>
                กรุณานำพาแลทสินค้าไปสแกน RFID ต่อไป
              </div>
            )}
            {status === false && error === 'TAG' && (
              <div className={`error-check`}>
                RFID Tag มีข้อผิดพลาดกรุณานำ Tag ใหม่มาเปลี่ยน
              </div>
            )}
            {status === false && error === 'NO 2ND SCAN' && (
              <div className={`error-check`}>
                ยังไม่ได้สแกน Barcode ครั้งที่ 2
              </div>
            )}
            {status === false && error === 'REJECT' && (
              <div className={`error-check`}>
                Pallet มีปัญหากรุณานำไปวางไว้ที่จุดที่กำหนด
              </div>
            )}
            <div className={'bar'} style={{ width: `${width}%` }} />
          </div>
        </div>
      )}
    </>
  );
};

export default ReceivePopupStage3;
