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
  orderNumber,
  pickupType,
  pickupAmount,
}) => {
  let amount = null;
  let rackLocation = null;
  let pallet = null;

  if (typeof (rowStr, floorRackStr, shelfStr) === 'undefined') {
    rackLocation = `-/-`;
    pallet = '-';
  } else {
    rackLocation = `${rowStr}-${shelfStr}/${floorRackStr}`;
    pallet = `${donePickup}/${totalPickup}`;
  }

  if (pickupType === 'SHOPPING') {
    amount = `${pickupAmount}`;
  } else {
    amount = 'FULL';
  }

  return (
    <div className='container-pickup'>
      <div className={`header1 ${status === false && isNotify ? 'false' : ''}`}>
        #คำสั่งซื้อ
      </div>
      {pickupType === 'FULL' ? (
        <div
          className={`header3 ${status === false && isNotify ? 'false' : ''}`}
        >
          พาเลท
        </div>
      ) : (
        <div
          className={`header3 ${status === false && isNotify ? 'false' : ''}`}
        >
          พาเลท shopping
        </div>
      )}
      <div className={`header3 ${status === false && isNotify ? 'false' : ''}`}>
        ตำแหน่งสินค้า
      </div>
      <div className={`header3 ${status === false && isNotify ? 'false' : ''}`}>
        SO item
      </div>
      <div className={`header2 ${status === false && isNotify ? 'false' : ''}`}>
        จำนวน
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
      <div className={`result3 ${status === false && isNotify ? 'false' : ''}`}>
        {itemName}
      </div>
      <div className={`result2 ${status === false && isNotify ? 'false' : ''}`}>
        {amount}
      </div>
    </div>
  );
};

export default TablePickUp;
