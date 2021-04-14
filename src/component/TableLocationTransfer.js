/*
TableLocationTransfer is use to display an information - SKU Name, location.
They display on top of display.
*/

import React from 'react';
import '../css/TablePickUp.css';

const TableLocationTransfer = ({
  itemName,
  rowStr,
  floorRackStr,
  shelfStr,
  rowStrNew,
  floorRackStrNew,
  isNotify,
  shelfStrNew,
  status,
}) => {
  const rackLocation = `${rowStr}-${shelfStr}/${floorRackStr}`;
  const rackLocationNew = `${rowStrNew}-${shelfStrNew}/${floorRackStrNew}`;

  return (
    <div className='container-location'>
      <div className={`header1 ${status === false && isNotify ? 'false' : ''}`}>
        SO item
      </div>
      <div
        className={`header3-pickup ${
          status === false && isNotify ? 'false' : ''
        }`}
      >
        From Location
      </div>
      <div
        className={`header2-pickup ${
          status === false && isNotify ? 'false' : ''
        }`}
      >
        Go to Location
      </div>
      <div
        className={`result1-pickup ${
          status === false && isNotify ? 'false' : ''
        }`}
      >
        {itemName}
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
