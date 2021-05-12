import React, { useState } from 'react';
import ReceivePopup0 from '../component/ReceivePopup0';
import ReceivePopup1 from '../component/ReceivePopup1';
import Navbar from '../component/NavBar';

import '../css/Receive.css';

const Receive = ({ msg, description, isNotify }) => {
  const [des, setDes] = useState(description);
  const [{ itemName, itemNumber }] = des;
  const [{ mode, stage, status, error_type }] = msg;

  // use for if description change 'des' will change too.
  if (des !== description) {
    setDes(description);
  }

  return (
    <div className='bg0'>
      <Navbar />
      {stage !== 3 && <ReceivePopup0 />}
      {stage === 3 && (
        <ReceivePopup1
          SKUName={itemName}
          SKUNumber={itemNumber}
          status={status}
          isPopUp={isNotify}
          error={error_type}
          msg={msg}
        />
      )}
    </div>
  );
};

export default Receive;
