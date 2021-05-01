/*
TablePutaway is use to display an information - SKU Name, location nubmer.
They display on top of display.

- DISPLAY RED TABLE WHEN STATUS FALSE.
- DISPLAY NORMAL COLOR WHEN STATUS TRUE AND NOTHING TO SHOW.
- SHOW THAI LANGUAUGE ABOUT LOCATION MESSAGE - โซนตรวจสอบ, ทางเข้า, -/-

Updated - 15/04/2021 - Aum
*/

import React, { useState } from 'react';
import '../css/TablePutAway.css';

const TablePutAway = ({
  SKUName,
  rowStr,
  floorRackStr,
  shelfStr,
  isNotify,
  status,
  isInGate,
  isCheckingZone
}) => {
  let rackLocation = null;
  if (typeof (rowStr, floorRackStr, shelfStr) === 'undefined' || (!isInGate && (rowStr, floorRackStr, shelfStr) === null)) {
    rackLocation = `-/-`;
  } else if (isInGate) {
    rackLocation = 'ทางเข้า'
  } else if (isCheckingZone) {
    rackLocation = 'โซนตรวจสอบ'
  } else if ((rowStr, floorRackStr, shelfStr) !== null) {
    rackLocation = `${rowStr}-${shelfStr}/${floorRackStr}`;
  } 

  return (
    <div className='container-table'>
      <div className={`header1 ${status === false && isNotify ? 'false' : ''}`}>
        ตำแหน่งจัดเก็บ
      </div>
      <div className={`header2 ${status === false && isNotify ? 'false' : ''}`}>
        SO Item
      </div>
      <div className={`result1 ${status === false && isNotify ? 'false' : ''}`}>
        {rackLocation}
      </div>
      <div className={`result2 ${status === false && isNotify ? 'false' : ''}`}>
        {SKUName}
      </div>
    </div>
  );
};

export default TablePutAway;