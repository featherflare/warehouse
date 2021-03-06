/*
This function is display the put-away screen

@ Action Notification
Action Notification will call displayNotification in case of
1. correct / incorrect

WE THINK WE'VE DONE THIS SECTION.

updated 15-04-2021 - Aum
*/

import React, { useState, useEffect, useContext, useCallback } from 'react';
import TablePutAway from '../component/TablePutAway';
import Layout from '../component/Layout';
import Navbar from '../component/NavBar';
import CalcRackLocation from '../component/CalcRackLocation';
import AlertNotification from '../context/Alert/DisplayAlert';
import { AlertContext } from '../context/Alert/ProviderAlert';

// css
import '../css/PutAway.css';

const Putaway = ({
  msg,
  description,
  isNotify,
  notiNavbarPickUp,
  notiNavbarLocation,
  hardware,
  modeNav,
  serverConnection,
}) => {
  // dispatch will call from ProviderNotification.
  // It's use 'useContext' to share variable together.
  const { dispatch } = useContext(AlertContext);
  const [des, setDes] = useState(description);
  const [{ itemName, location }] = des;
  const [{ mode, stage, status, error_type, current_location }] = msg;
  const [
    { row, floorRack, shelf, rackLocation, curLocation, curFloorRack },
  ] = CalcRackLocation(location, current_location);
  const [currentLocation, setCurrentLocation] = useState(curLocation);
  const [isInGate, setIsInGate] = useState(false);
  const [isCheckingZone, setIsCheckingZone] = useState(false);

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

  // ActionNotification is use for add action "ADD_NOTIFICATION".
  // It's mean we want to display notification both type of them.
  const ActionNotification = useCallback(
    (status) => {
      if (status === 'PUT_PALLET_TO_RACK') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'CORRECT',
            message: 'กรุณาจัดเก็บพาเลทเข้าชั้นวาง',
          },
        });
      } else if (status === 'WRONG_FLOOR_RACK') {
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
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'CORRECT',
            message: 'จัดเก็บพาเลทเรียบร้อย',
          },
        });
      } else if (status === 'DONT_HAVE_PLACE') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'INCORRECT2',
            message: 'ไม่มีพื้นที่จัดเก็บ กรุณาวางไว้หน้าคลังสินค้า',
          },
        });
      } else if (status === 'WRONG_WEIGHT') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'INCORRECT2',
            message: 'น้ำหนักของพาเลทไม่ถูกต้อง กรุณานำพาเลทวางไว้โซนตรวจสอบ',
          },
        });
      } else if (status === 'CORRECT_PALLET') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'CORRECT',
            message: 'ตรวจสอบสินค้าถูกต้อง!',
          },
        });
      } else if (status === 'ALREADY') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'CORRECT',
            message: 'พาเลทผ่านการตรวจสอบแล้ว กรุณาจัดเก็บพาเลทเข้าชั้นวาง',
          },
        });
      } else if (status === 'UNVERIFY') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'INCORRECT2',
            message: 'พาเลทมีปัญหา กรุณานำพาเลทวางไว้โซนตรวจสอบ',
          },
        });
      } else if (status === 'NOT_EXIST') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'INCORRECT2',
            message: 'ไม่พบ TAG หมายเลขนี้ในระบบ \nกรุณานำพาเลทวางไว้โซนตรวจสอบ',
          },
        });
      } else if (status === 'NO_ITEM') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'INCORRECT2',
            message: 'พาเลทยังไม่ได้ลงทะเบียน กรุณานำพาเลทวางไว้โซนตรวจสอบ',
          },
        });
      } 
    },
    [dispatch]
  );

  // To call ActionNotification when props changed.
  useEffect(() => {
    if (stage === 1 && isNotify) {
      if (status) {
        setIsCheckingZone(false);
        setIsInGate(false);
        ActionNotification('CORRECT_PALLET');
      } else {
        if (error_type === 'AMOUNT') {
          setIsCheckingZone(true);
          ActionNotification('WRONG_WEIGHT');
        } else if (error_type === 'NO LOCATION') {
          setIsInGate(true);
          ActionNotification('DONT_HAVE_PLACE');
        } else if (error_type === 'ALREADY') {
          ActionNotification('ALREADY');
        } else if (error_type === 'UNVERIFY') {
          setIsCheckingZone(true);
          ActionNotification('UNVERIFY');
        } else if (error_type === 'NOT EXIST') {
          setIsCheckingZone(true);
          ActionNotification('NOT_EXIST');
        } else if (error_type === 'NO ITEM') {
          setIsCheckingZone(true);
          ActionNotification('NO_ITEM');
        }
      }
    } else if (stage !== 0 && stage !== 1 && isNotify && !status) {
      if (
        [rackLocation].includes(currentLocation) &&
        floorRack !== curFloorRack
      ) {
        ActionNotification('WRONG_FLOOR_RACK');
      } else {
        ActionNotification('WRONG_DESTINATION');
      }
    } else if (stage === 2 && isNotify && status) {
      ActionNotification('PUT_PALLET_TO_RACK');
    } else if (stage === 3 && isNotify && status) {
      ActionNotification('DONE');
      setCurrentLocation('');
    }
  }, [mode, stage, isNotify, status, ActionNotification]);

  return (
    <div className='bg'>
      <Navbar
        mode={modeNav}
        notiNavbarPickUp={notiNavbarPickUp}
        notiNavbarLocation={notiNavbarLocation}
        hardware={hardware}
        serverConnection={serverConnection}
      />
      <TablePutAway
        SKUName={itemName}
        rowStr={row}
        floorRackStr={floorRack}
        shelfStr={shelf}
        isNotify={isNotify}
        status={status}
        isInGate={isInGate}
        isCheckingZone={isCheckingZone}
        errorType={error_type}
      />
      <Layout
        rackLocation={rackLocation}
        floorRack={floorRack}
        currentLocation={currentLocation}
        isCheckingZone={isCheckingZone}
        isInGate={isInGate}
      />
      {mode === 2 && isNotify && (
        <AlertNotification mode={mode} stage={stage} />
      )}
    </div>
  );
};
export default Putaway;
