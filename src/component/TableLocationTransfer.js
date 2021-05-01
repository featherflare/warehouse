/*
TableLocationTransfer is use to display an information - SKU Name, location.
They display on top of display.
*/

import React, { useState } from 'react';
import { useCustomEventListener } from 'react-custom-events';
import '../css/TablePickUp.css';

const TableLocationTransfer = ({
  rowStr,
  floorRackStr,
  shelfStr,
  rowStrNew,
  floorRackStrNew,
  isNotify,
  shelfStrNew,
  status,
  isCheckingZone,
  command,
}) => {
  let rackLocation = null;

  if (typeof (rowStr, floorRackStr, shelfStr) === 'undefined') {
    rackLocation = `-/-`;
  } else {
    rackLocation = `${rowStr}-${shelfStr}/${floorRackStr}`;
  }

  let rackLocationNew = null;
  if (
    typeof (rowStrNew, floorRackStrNew, shelfStrNew) === 'undefined' &&
    !isCheckingZone
  ) {
    rackLocationNew = `-/-`;
  } else if (isCheckingZone) {
    rackLocationNew = 'โซนตรวจสอบ';
  } else {
    rackLocationNew = `${rowStrNew}-${shelfStrNew}/${floorRackStrNew}`;
  }

  return (
    <div className='container-location'>
      <div className={`header1 ${status === false && isNotify ? 'false' : ''}`}>
        คำสั่งการทำงาน
      </div>
      <div
        className={`header3-location ${
          status === false && isNotify ? 'false' : ''
        }`}
      >
        ตำแหน่งเดิม
      </div>
      <div
        className={`header2-pickup ${
          status === false && isNotify ? 'false' : ''
        }`}
      >
        ตำแหน่งใหม่
      </div>
      <div
        className={`result1-location ${
          status === false && isNotify ? 'false' : ''
        }`}
      >
        {command}
      </div>
      <div className={`result3 ${status === false && isNotify ? 'false' : ''}`}>
        {rackLocation}
      </div>
      <div className={`result2 ${status === false && isNotify ? 'false' : ''}`}>
        {rackLocationNew}
      </div>
    </div>
  );
};

export default TableLocationTransfer;
