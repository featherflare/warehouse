import React, { useState } from 'react';
import ReceivePopupStage0 from '../component/ReceivePopup(Have Notification Order)/ReceivePopupStage0';
import ReceivePopupStage1 from '../component/ReceivePopup(Have Notification Order)/ReceivePopupStage1';
import ReceivePopupStage2 from '../component/ReceivePopup(Have Notification Order)/ReceivePopupStage2';
import ReceivePopupStage3 from '../component/ReceivePopup(Have Notification Order)/ReceivePopupStage3';
import Navbar from '../component/NavBar';
import '../css/Receive.css';

const Receive = ({ msg, isNotify }) => {
  const [
    {
      item_name,
      barcode,
      // stage,
      item_number,
      scanned_item_name,
      scanned_item_number,
      scanned_barcode,
      // error_type,
      // status,
      // stage,
    },
  ] = msg;
  const [stage, setStage] = useState(3);
  const [status, setStatus] = useState(true);
  const [error_type, setError_type] = useState('NO 2ND SCAN');
  const [stageNo, setStageNo] = useState(stage);
  const [hardware_id, setHardware_id] = useState('8000');
  console.log(stage);
  return (
    <div>
      <Navbar />
      {stageNo === 0 && <ReceivePopupStage0 isPopUp={isNotify} />}
      {stageNo === 1 && (
        <ReceivePopupStage1
          SKUName={item_name}
          SKUNumber={item_number}
          barcode={barcode}
          isPopUp={isNotify && hardware_id === '8000' ? true : false}
        />
      )}
      {stageNo === 2 && (
        <ReceivePopupStage2
          SKUName={item_name}
          SKUNumber={item_number}
          barcode={barcode}
          ScannedSKUName={scanned_item_name}
          ScannedSKUNumber={scanned_item_number}
          ScannedBarcode={scanned_barcode}
          status={status}
          isPopUp={isNotify}
        />
      )}
      {stage === 3 && (
        <ReceivePopupStage3
          SKUName={item_name}
          SKUNumber={item_number}
          barcode={barcode}
          status={status}
          isPopUp={isNotify}
          error={error_type}
        />
      )}
    </div>
  );
};

export default Receive;
