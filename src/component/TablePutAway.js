/*
TablePutaway is use to display an information - SKU Name, location nubmer.
They display on top of display.

left
- Change the header - get rid of the 'Pallet' header.
- Increase width of 'SKU Name' header.
- Decrease width of 'Location' header.

Updated - 09/02/2021 - Aum
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
}) => {
  const [check, setCheck] = useState();
  let rackLocation = null;
  if (typeof (rowStr, floorRackStr, shelfStr) === 'undefined') {
    rackLocation = `-/-`;
  } else {
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
