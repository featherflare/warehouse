/*
ReceivePopupStage2 is use to display about correct/incorrect of barcode item at second time.
The display in the middle of display.
If correct Popup color is green,But If Incorrect Popup color is red.

*/
import React, { useState, useEffect } from 'react';

const ReceivePopupStage2 = ({
  SKUName,
  SKUNumber,
  barcode,
  ScannedSKUName,
  ScannedSKUNumber,
  ScannedBarcode,
  status,
  isPopUp,
}) => {
  const [popUp, setPopUp] = useState(isPopUp);
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);
  // Time count for Bar at the bottom
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

  //Check statues for start Bar Timer

  useEffect(() => {
    if (status === true) {
      handleStartTimer();
    }
  }, [status]);

  //Check Width for update PopUp

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
            <div className='headerStage2'>Barcode Check</div>
            {/* Output From Hardware  */}
            <div className={`wrapperStage2 ${status ? true : false}`}>
              <div className='topic'> </div>
              {status === false && <div className='topic'>Correct Pallet</div>}
              {status === false && (
                <div className='topic'>Incorrect Pallet</div>
              )}
              <div className='topic'>SKUName</div>
              <div className='topic'>{SKUName}</div>
              {status === false && (
                <div className='topic'>{ScannedSKUName}</div>
              )}
              <div className='topic'>SKUNumber</div>
              <div className='topic'>{SKUNumber}</div>
              {status === false && (
                <div className='topic'>{ScannedSKUNumber}</div>
              )}
              <div className='topic'>Barcode</div>
              <div className='topic'>{barcode}</div>
              {status === false && (
                <div className='topic'>{ScannedBarcode}</div>
              )}
            </div>
            {status === true && (
              <div className={`error-check`}>
                กรุณานำพาแลทสินค้าไปสแกน RFID ต่อไป
              </div>
            )}
            {status === false && (
              <div className={`error-check`}>
                กรุณาสแกนพาแลทให้ถูกต้องตามที่บอกไว้
              </div>
            )}

            <div className={'bar'} style={{ width: `${width}%` }} />
          </div>
        </div>
      )}
    </>
  );
};

export default ReceivePopupStage2;
