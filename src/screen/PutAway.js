/*
This function is display the put-away screen
------ data variable ------
msg : contains mode, stage, status, current_location in type of object.
description : contains itemNumber, itemName, location.
isNotify : boolean varible. it's use when server want to show notification.
DONE
- display Navbar, Table put-away, layout, rack pop-up, and generate Path.
- clear the display after success the process put-away.
- alert message.
- change language to thai langauage.
LEFT
- Fix style of RackPopup.
- Fix alert can show every time when it called.
updated 06-04-2021 - Aum
*/

import React, { useState, useEffect, useContext, useCallback } from 'react';
import TablePutAway from '../component/TablePutAway';
import Layout from '../component/Layout';
import Navbar from '../component/NavBar';
import CalcRackLocation from '../component/CalcRackLocation';
import RackPopup from '../component/RackPopup';
import DisplayNotification from '../context/Notification/DisplayNotification';
import { NotificationContext } from '../context/Notification/ProviderNotification';

import '../css/PutAway.css';
const Putaway = ({ msg, description, isNotify }) => {
  // dispatch will call from ProviderNotification.
  // It's use 'useContext' to share variable together.
  const { dispatch } = useContext(NotificationContext);
  const [des, setDes] = useState(description);
  const [{ itemName, location }] = des;
  const [{ mode, stage, status, current_location }] = msg;
  const [
    { row, floorRack, shelf, curLocation, curFloorRack },
  ] = CalcRackLocation(location, current_location);
  const [isPopUp, setIsPopUp] = useState(location ? false : true);
  const [currentLocation, setCurrentLocation] = useState(curLocation);

  const rackLocation = '';
  const isOutGate = false;
  const isCheckingZone = true;

  // use for if description change 'des' will change too.
  if (des !== description) {
    setDes(description);
  }

  // if curlocation change 'currentLocation' change too.
  // **curlocation --> variable from CalcRackLocation. I have no idea about variable name. if you thought isn't ok, will change later.
  // **currentLocation --> variable inside of this function.
  // if (currentLocation !== curLocation) {
  //   setCurrentLocation(curLocation);
  // }

  // if (!currentLocation) {
  //   setCurrentLocation('J-01');
  // }

  // ActionNotification is use for add action "ADD_NOTIFICATION".
  // It's mean we want to display notification both type of them.
  const ActionNotification = useCallback(
    (status) => {
      if (status === 'PUT_PALLET_TO_RACK') {
        console.log('action1');
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'CORRECT',
            message: 'กรุณาจัดเก็บพาเลทเข้าชั้นวาง',
          },
        });
      } else if (status === 'WRONG_FLOOR_RACK') {
        console.log('action2');
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'INCORRECT',
            message: 'กรุณาจัดเก็บพาเลทให้ถูกชั้นวาง',
          },
        });
      } else if (status === 'WRONG_DESTINATION') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'INCORRECT',
            message: 'กรุณาจัดเก็บพาเลทให้ถูกตำแหน่ง',
          },
        });
      } else if (status === 'DONE') {
        console.log('action3');
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'CORRECT',
            message: 'จัดเก็บพาเลทเรียบร้อย',
          },
        });
      }
    },
    [dispatch]
  );

  // To call ActionNotification when props changed.
  useEffect(() => {
    if (stage === 1 && isNotify && status) {
      ActionNotification('PUT_PALLET_TO_RACK');
    } else if (stage !== 0 && isNotify && !status) {
      console.log('action2 outer useeffect');
      console.log(
        [rackLocation].includes(currentLocation),
        floorRack !== curFloorRack
      );
      if (
        [rackLocation].includes(currentLocation) &&
        floorRack !== curFloorRack
      ) {
        console.log('action2 inner useeffect');
        ActionNotification('WRONG_FLOOR_RACK');
      } else {
        ActionNotification('WRONG_DESTINATION');
      }
    } else if (
      stage === 2 &&
      isNotify &&
      status &&
      [rackLocation].includes(currentLocation)
    ) {
      ActionNotification('DONE');
      setIsPopUp(false);
      setCurrentLocation('');
    }
  }, [mode, stage, isNotify, status, ActionNotification, currentLocation]);

  console.log(currentLocation);
  return (
    <div className='bg'>
      <Navbar />
      <TablePutAway
        SKUName={itemName}
        rowStr={row}
        floorRackStr={floorRack}
        shelfStr={shelf}
        isNotify={isNotify}
        status={status}
      />
      <Layout
        rackLocation={rackLocation}
        floorRack={floorRack}
        currentLocation={currentLocation}
        isCheckingZone={isCheckingZone}
        isOutGate={isOutGate}
      />
      {mode === 2 && isNotify && (
        <div className={'notification-wrapper'}>
          <DisplayNotification />
        </div>
      )}
    </div>
  );
};
export default Putaway;
