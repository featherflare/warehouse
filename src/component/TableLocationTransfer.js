/*
TableLocationTransfer is use to display an information - SKU Name, location.
They display on top of display.
*/

import React from 'react';
import '../css/TablePickUp.css';

const TableLocationTransfer = ({
  SKUName,
  rowStr,
  floorRackStr,
  shelfStr,
  rowStrNew,
  floorRackStrNew,
  shelfStrNew,
}) => {
  const rackLocation = `${rowStr}-${shelfStr}/${floorRackStr}`;
  const rackLocationNew = `${rowStrNew}-${shelfStrNew}/${floorRackStrNew}`;

  return (
    <div className='container'>
      <div className='header1'>SKU Name</div>
      <div className='header2'>From Location</div>
      <div className='header3'>Go to Location</div>
      <div className='result1'>{SKUName}</div>
      <div className='result2'>{rackLocation}</div>
      <div className='result3'>{rackLocationNew}</div>
    </div>
  );
};

export default TableLocationTransfer;
