/*
ReceivePopupStage1 is use to display after accept order if you receive order
The display in the middle of display.
Output is Detail of your item in pallet 

*/
import React from 'react';

const ReceivePopupStage1 = ({ SKUName, SKUNumber, barcode, isPopUp }) => {
  return (
    <>
      {isPopUp && (
        <div className={'receive-wrapper'}>
          <div className={'receive-item '}>
            <div className='headerStage1'>New Receiver Order</div>
            <div className='wrapper'>
              <div className='topic'>SKUName</div>
              <div className='topic'>{SKUName}</div>
              <div className='topic'>SKUNumber</div>
              <div className='topic'>{SKUNumber}</div>
              <div className='topic'>Barcode</div>
              <div className='topic'>{barcode}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReceivePopupStage1;
