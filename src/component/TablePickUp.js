/*
TablePickUp is use to display an information - All Pallet Count, SKU Name, location nubmer.
They display on top of display.
*/

import React from 'react';
import '../css/TablePickUp.css';

const TablePickUp = ({
  itemName,
  rowStr,
  floorRackStr,
  shelfStr,
  isNotify,
  status,
  totalPickup,
  donePickup,
  orderNumber
}) => {
  let rackLocation = null;
  let pallet = null;

  if (typeof (rowStr, floorRackStr, shelfStr) === 'undefined' || (rowStr, floorRackStr, shelfStr) === null) {
    rackLocation = `-/-`;
    pallet = '-';
  } else {
    rackLocation = `${rowStr}-${shelfStr}/${floorRackStr}`;
    pallet = `${donePickup}/${totalPickup}`;
  }


  return (
    <div className='container-pickup'>
      <div
        className={`header1-pickup ${
          status === false && isNotify ? 'false' : ''
        }`}
      >
        #คำสั่งซื้อ
      </div>
      <div className={`header3 ${status === false && isNotify ? 'false' : ''}`}>
        พาเลท
      </div>
      <div
        className={`header3-pickup ${
          status === false && isNotify ? 'false' : ''
        }`}
      >
        ตำแหน่งสินค้า
      </div>
      <div className={`header2 ${status === false && isNotify ? 'false' : ''}`}>
        SO item
      </div>
      <div className={`result1 ${status === false && isNotify ? 'false' : ''}`}>
        {orderNumber}
      </div>
      <div className={`result3 ${status === false && isNotify ? 'false' : ''}`}>
        {pallet}
      </div>
      <div className={`result3 ${status === false && isNotify ? 'false' : ''}`}>
        {rackLocation}
      </div>
      <div
        className={`result2-pickup ${
          status === false && isNotify ? 'false' : ''
        }`}
      >
        {itemName}
      </div>
    </div>
  );
};

export default TablePickUp;
