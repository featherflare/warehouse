import React, { useState, useEffect, useContext, useCallback } from 'react';
//import TablePutAway from '../component/TablePutAway';
import Layout from '../component/Layout';
import Navbar from '../component/NavBar';
import CalcRackLocation from '../component/CalcRackLocation';
import AlertNotification from '../context/Alert/DisplayAlert';
import { AlertContext } from '../context/Alert/ProviderAlert';
import TablePickUp from '../component/TablePickUp';

const PickUp = ({
  msg,
  description,
  isNotify,
  notiNavbarPickUp,
  notiNavbarLocation,
  hardware,
  modeNav,
  serverConnection,
}) => {
  const { dispatch } = useContext(AlertContext);
  const [des, setDes] = useState(description);
  const [
    {
      totalPickup,
      donePickup,
      orderNumber,
      pickupId,
      pickupType,
      itemName,
      location,
    },
  ] = des;
  const [{ mode, stage, status, current_location, error_type }] = msg;
  const [
    { row, floorRack, shelf, rackLocation, curLocation, curFloorRack },
  ] = CalcRackLocation(location, current_location);
  const [currentLocation, setCurrentLocation] = useState(curLocation);
  const [isCheckingZone, setIsCheckingZone] = useState(false);
  const [isOutGate, setIsOutGate] = useState(false);

  // use for if description change 'des' will change too.
  if (des !== description) {
    setDes(description);
  }

  // if curlocation change 'currentLocation' change too.
  // **curlocation --> variable from CalcRackLocation. I have no idea about variable name. if you thought isn't ok, will change later.
  // **currentLocation --> variable inside of this function.
  if (currentLocation !== curLocation) {
    setCurrentLocation(curLocation);
  }

  const ActionNotification = useCallback(
    (status) => {
      if (status === 'ERROR_PALLET_WEIGHT') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'INCORRECT2',
            message:
              'น้ำหนักของพาเลทไม่ถูกต้อง กรุณานำพาเลทออกไปวางยังโซนตรวจสอบ',
          },
        });
      } else if (status === 'ERROR_WRONG_PALLET') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'INCORRECT',
            message: 'กรุณาหยิบให้ถูกพาเลท',
          },
        });
      } else if (status === 'CORRECT_PALLET_WEIGHT') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'CORRECT',
            message: 'น้ำหนักพาเลทถูกต้อง กรุณานำพาเลทออกนอกคลังสินค้า',
          },
        });
      } else if (status === 'DONE') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'CORRECT',
            message: 'ยินดีด้วย! คุณทำงานของวันนี้เสร็จหมดแล้ว',
          },
        });
      } else if (status === 'COMPLETE') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'CORRECT',
            message: 'นำออกพาเลทเรียบร้อย กรุณาทำงานต่อไป',
          },
        });
      } else if (status === 'WRONG_DESTINATION') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'INCORRECT',
            message: 'กรุณาไปให้ถูกตำแหน่ง',
          },
        });
      } else if (status === 'WEIGHTING') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'CORRECT',
            message: 'พาเลทถูกต้อง กรุณาชั่งน้ำหนักพาเลท',
          },
        });
      } else if (status === 'REJECT') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'INCORRECT2',
            message: 'พาเลทไม่ถูกต้อง กรุณานำพาเลทออกไปวางยังโซนตรวจสอบ',
          },
        });
      }
    },
    [dispatch]
  );

  // To call ActionNotification when props changed.
  useEffect(() => {
    if (stage === 2 && isNotify && !status && error_type === 'PALLET') {
      ActionNotification('REJECT');
      setIsCheckingZone(true);
    } else if (stage === 2 && isNotify && !status && error_type === 'HARDWARE') {
      ActionNotification('WRONG_DESTINATION');
    } else if (stage === 2 && isNotify && status) {
      ActionNotification('WEIGHTING');
    } else if (stage === 3 && isNotify && !status && error_type === 'AMOUNT') {
      ActionNotification('ERROR_PALLET_WEIGHT');
      setIsCheckingZone(true);
    } else if (stage === 3 && isNotify && !status && (['PALLET', 'HARDWARE'].includes(error_type))) {
      ActionNotification('ERROR_WRONG_PALLET');
    } else if (stage === 3 && isNotify && status) {
      ActionNotification('CORRECT_PALLET_WEIGHT');
      setIsOutGate(true);
    } else if (stage === 4 && isNotify && status) {
      if (totalPickup - donePickup === 0) {
        ActionNotification('DONE');
        setIsOutGate(false);
      } else {
        ActionNotification('COMPLETE');
        setIsOutGate(false);
      }
    } else if (
      stage !== 0 &&
      stage !== 1 &&
      !([rackLocation].includes(currentLocation) && floorRack === curFloorRack) && error_type === 'LOCATION'
    ) {
      console.log('wrong des');
      ActionNotification('WRONG_DESTINATION');
    }
  }, [mode, stage, isNotify, status, msg, ActionNotification]);

  return (
    <div className='bg'>
      <Navbar
        mode={modeNav}
        notiNavbarPickUp={notiNavbarPickUp}
        notiNavbarLocation={notiNavbarLocation}
        hardware={hardware}
        serverConnection={serverConnection}
      />
      <TablePickUp
        itemName={itemName}
        rowStr={row}
        floorRackStr={floorRack}
        shelfStr={shelf}
        isNotify={isNotify}
        status={status}
        totalPickup={totalPickup}
        donePickup={donePickup}
        orderNumber={orderNumber}
        pickupType={pickupType}
      />
      <Layout
        rackLocation={rackLocation}
        floorRack={floorRack}
        currentLocation={currentLocation}
        isCheckingZone={isCheckingZone}
        isOutGate={isOutGate}
      />
      {mode === 3 && isNotify && (
        <AlertNotification mode={mode} stage={stage} />
      )}
    </div>
  );
};

export default PickUp;
