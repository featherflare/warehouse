import React, { useState, useEffect, useContext, useCallback } from 'react';
import TableLocationTransfer from '../component/TableLocationTransfer';
import Layout from '../component/Layout';
import Navbar from '../component/NavBar';
import CalcRackLocation from '../component/CalcRackLocation';
import { NotificationContext } from '../context/Notification/ProviderNotification';

// css
import '../css/PutAway.css';

const LocationTransfer = ({ msg, description, isNotify }) => {
  // dispatch will call from ProviderNotification.
  // It's use 'useContext' to share variable together.
  const { dispatch } = useContext(NotificationContext);
  const [des, setDes] = useState(description);
  const [{ total_location_transfer, done_location_transfer, source, destination }] = des;
  const [{ mode, stage, status, error_type, current_location }] = msg;
  const [{ rowA, floorRackA, shelfA, rackLocationA, rowB, floorRackB, shelfB, rackLocationB, curLocation, curFloorRack }] = CalcRackLocation(source, current_location, destination);
  const [currentLocation, setCurrentLocation] = useState(curLocation);
  const [isCheckingZone, setIsCheckingZone] = useState(false);
  const [sourceOrDes, setSourceOrDes] = useState('');
  const [floorRack, setFloorRack] = useState('');
  const [isLocationTransfer, setIsLocationTransfer] = useState(false);
  const [command, setCommand] = useState('-')
  
  // use for if description change 'des' will change too.
  if (des !== description) {
    setDes(description);
  }

  // if curlocation change 'currentLocation' change too.
  // **curlocation --> variable from CalcRackLocation. I have no idea about variable name. if you thought isn't ok, will change later.
  // **currentLocation --> variable inside of this function.
  if (stage !== 0 && stage !== 4 && currentLocation !== curLocation) {
    setCurrentLocation(curLocation);
  }

  if (stage === 0 && (sourceOrDes !== rackLocationA || floorRack !== floorRackA)) {
    setSourceOrDes(rackLocationA)
    setFloorRack(floorRackA)
  }

  // ActionNotification is use for add action "ADD_NOTIFICATION".
  // It's mean we want to display notification both type of them.
  const ActionNotification = useCallback(
    (status) => {
      if (status === 'MOVE_TO_DESTINATION') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'CORRECT',
            message: 'กรุณาย้ายพาเลทไปยังตำแหน่งใหม่',
          },
        });
        setCommand('กรุณาย้ายพาเลทไปยังตำแหน่งใหม่');
      } else if (status === 'WRONG_FLOOR_RACK') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'INCORRECT',
            message: 'กรุณาจัดเก็บพาเลทให้ถูกชั้นวาง',
          },
        });
        setCommand('กรุณาจัดเก็บพาเลทให้ถูกชั้นวาง');
      } else if (status === 'WRONG_DESTINATION') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'INCORRECT',
            message: 'กรุณาจัดเก็บพาเลทให้ถูกตำแหน่ง',
          },
        });
        setCommand('กรุณาจัดเก็บพาเลทให้ถูกตำแหน่ง');
      } else if (status === 'COMPLETE') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'CORRECT',
            message: 'จัดเก็บพาเลทเรียบร้อย',
          },
        });
        setCommand('จัดเก็บพาเลทเรียบร้อย กรุณาทำงานต่อไป');
      } else if (status === 'WRONG_PALLET') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'INCORRECT2',
            message: 'พาเลทไม่ถูกต้อง กรุณานำพาเลทวางไว้โซนตรวจสอบ',
          },
        });
        setCommand('พาเลทไม่ถูกต้อง กรุณานำพาเลทวางไว้โซนตรวจสอบ');
      } else if (status === 'WRONG_WEIGHT') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'INCORRECT2',
            message: 'น้ำหนักของพาเลทไม่ถูกต้อง กรุณานำพาเลทวางไว้โซนตรวจสอบ',
          },
        });
        setCommand('น้ำหนักของพาเลทไม่ถูกต้อง กรุณานำพาเลทวางไว้โซนตรวจสอบ');
      } else if (status === 'WRONG_SOURCE_FLOOR_RACK') {
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
              type: 'INCORRECT',
              message: 'กรุณาหยิบพาเลทให้ถูกชั้นวาง',
            },
        });
        setCommand('กรุณาหยิบพาเลทให้ถูกชั้นวาง');
      } else if (status === 'WRONG_SOURCE') {
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
              type: 'INCORRECT',
              message: 'กรุณาหยิบพาเลทให้ถูกตำแหน่ง',
            },
        });
        setCommand('กรุณาหยิบพาเลทให้ถูกตำแหน่ง');
      } else if (status === 'CORRECT_PALLET_AND_LOCATION') {
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
              type: 'CORRECT',
              message: 'กรุณาจัดเก็บพาเลทเข้าชั้นวาง',
            },
        });
        setCommand('กรุณาจัดเก็บพาเลทเข้าชั้นวาง');
      } else if (status === 'PICK_WRONG_PALLET') {
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
              type: 'INCORRECT',
              message: 'กรุณาหยิบให้ถูกพาเลท',
            },
        });
        setCommand('กรุณาหยิบให้ถูกพาเลท');
      } else if (status === 'PUT_PALLET_TO_RACK') {
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
              type: 'CORRECT',
              message: 'กรุณาจัดเก็บพาเลทเข้าชั้นวาง',
            },
        });
        setCommand('กรุณาจัดเก็บพาเลทเข้าชั้นวาง');
      } else if (status === 'DONE') {
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
              type: 'CORRECT',
              message: 'ยินดีด้วย คุณทำงานของวันนี้เสร็จแล้ว',
            },
        });
        setCommand('-')
      }
    },
    [dispatch]
  );

  // To call ActionNotification when props changed.
  useEffect(() => {
    if (stage === 2 && isNotify) {
        if (status) {
            ActionNotification('MOVE_TO_DESTINATION');
            setCurrentLocation(rackLocationA);
            setSourceOrDes(rackLocationB);
            setFloorRack(floorRackB);
            setIsLocationTransfer(true);
        } else if (!status && error_type === 'AMOUNT') {
            ActionNotification('WRONG_WEIGHT');
            setIsCheckingZone(true);
        } else if (!status && error_type === 'PALLET') {
            ActionNotification('WRONG_PALLET');
            setIsCheckingZone(true);
        } else if (!status && [rackLocationA].includes(currentLocation) && floorRackA !== curFloorRack) {
            ActionNotification('WRONG_SOURCE_FLOOR_RACK');
        } else if (!status && ![rackLocationA].includes(currentLocation)) {
            ActionNotification('WRONG_SOURCE');
        }
    } else if (stage === 3 && isNotify) {
        if (status) {
            ActionNotification('CORRECT_PALLET_AND_LOCATION');
            setIsLocationTransfer(false);
        } else if (!status && error_type === 'PALLET') {
            ActionNotification('PICK_WRONG_PALLET');
            setIsLocationTransfer(false);
        } else {
            if ([rackLocationB].includes(currentLocation) && floorRackB === curFloorRack) {
                ActionNotification('PUT_PALLET_TO_RACK');
                setIsLocationTransfer(false);
            } else if ([rackLocationB].includes(currentLocation) && !(floorRackB === curFloorRack)) {
                ActionNotification('WRONG_FLOOR_RACK');
                setIsLocationTransfer(false);
            } else {
                ActionNotification('WRONG_DESTINATION');
                setIsLocationTransfer(false);
            }
        }
    } else if (stage === 4 && isNotify && status) {
        ActionNotification('COMPLETE');
        setSourceOrDes(rackLocationA);
        setCurrentLocation('');
        setIsLocationTransfer(false);
        setFloorRack(floorRackA);
        if (total_location_transfer - done_location_transfer === 0 ) {
            setTimeout(() => {
                ActionNotification('DONE');
            }, 6000)
        } 
    } else if (stage === 4 && isNotify && !status) {
        if ([rackLocationB].includes(currentLocation) && !(floorRackB === curFloorRack)) {
            ActionNotification('WRONG_FLOOR_RACK');
        } else {
            ActionNotification('WRONG_DESTINATION');
            setCurrentLocation(curLocation);
        }
    }

    if (stage === 0 || (stage === 4 && status)) {
      setCommand('กรุณาไปหยิบพาเลทตามตำแหน่งที่ระบุ');
    }

  }, [mode, stage, isNotify, status, ActionNotification]);

  return (
    <div className='bg'>
      <Navbar />
      <TableLocationTransfer 
        rowStr={rowA}
        floorRackStr={floorRackA}
        shelfStr={shelfA}
        rowStrNew={rowB}
        floorRackStrNew={floorRackB}
        shelfStrNew={shelfB}
        isNotify={isNotify}
        status={status}
        isCheckingZone={isCheckingZone}
        command={command}
      />
      <Layout
        rackLocation={sourceOrDes}
        floorRack={floorRack}
        currentLocation={currentLocation}
        isCheckingZone={isCheckingZone}
        isLocationTransfer={isLocationTransfer}
      />
    </div>
  );
};
export default LocationTransfer;

