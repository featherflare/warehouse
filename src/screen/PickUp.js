import React, { useState, useEffect, useContext, useCallback } from 'react';
//import TablePutAway from '../component/TablePutAway';
import Layout from '../component/Layout';
import Navbar from '../component/NavBar';
import CalcRackLocation from '../component/CalcRackLocation';
import RackPopup from '../component/RackPopup';
import DisplayNotification from '../context/Notification/DisplayNotification';
import { NotificationContext } from '../context/Notification/ProviderNotification';
import TablePickUp from '../component/TablePickUp';

const PickUp = ({ msg, description, isNotify }) => {
  const { dispatch } = useContext(NotificationContext);
  const [des, setDes] = useState(description);
  const [{ totalPickup, donePickup, orderNumber, pickupId, pickupType, itemName, location, amount }] = des;
  const [{ mode, stage, status, current_location, error_type }] = msg;
  const [{ row, floorRack, shelf, rackLocation, curLocation, curFloorRack }] = CalcRackLocation(location, current_location);
  const [isPopUp, setIsPopUp] = useState(location ? false : true);
  const [currentLocation, setCurrentLocation] = useState(curLocation);

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
            type: 'INCORRECT',
            message: 'น้ำหนักของพาเลทไม่ถูกต้อง กรุณานำพาเลทออกไปวางยังโซนตรวจสอบ',
          },
        });
      } else if (status === 'ERROR_WRONG_PALLET') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'INCORRECT',
            message: 'พาเลทไม่ถูกต้อง กรุณานำพาเลทออกไปวางยังโซนตรวจสอบ',
          },
        });
      } else if (status === 'CORRECT_PALLET_WEIGHT') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'CORRECT', 
            message: 'น้ำหนักพาเลทถูกต้อง กรุณานำไปวางยังโซน Special',
          },
        });
      } else if (status === 'START_SHOPPING_PALLET') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'NOTIFY', 
            message: 'เริ่มต้นการทำงานแบบ Shopping pallet',
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
            message: 'นำออกพาเลทเรียบร้อย',
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
      }
    },
    [dispatch]
  );

  // To call ActionNotification when props changed.
  useEffect(() => {
    console.log('in useeffect')
    console.log(stage === 4, isNotify, status)
    if (stage === 2 && isNotify && !status && error_type === 'PALLET') {
      console.log('Action 1')
      ActionNotification('ERROR_WRONG_PALLET');
    } else if (stage === 3 && isNotify && !status && error_type === 'AMOUNT') {
      console.log('Action 2')
      ActionNotification('ERROR_PALLET_WEIGHT');
    } else if (stage === 3 && isNotify && status) {
      console.log('Action 3')
      ActionNotification('CORRECT_PALLET_WEIGHT');
      setIsPopUp(false);
    } else if (stage === 4 && isNotify && status) {
      console.log('Action 4 outer')
      if ((totalPickup - donePickup) === 0) {
        console.log('Action 4.1')
        ActionNotification('DONE');
      } else {
        console.log('Action 4.2')
        ActionNotification('COMPLETE');
        console.log("Action 4.2.1",pickupType === 'SHOPPING')
        if(pickupType === 'SHOPPING') {
          console.log('In Action 4.2.1')
          setTimeout(() => {
            ActionNotification('START_SHOPPING_PALLET');
            setIsPopUp(true);
          }, 6000);
        }
      }
    } else if ((stage === 0 || stage === 4) && pickupType === 'SHOPPING') {
      console.log('Action 5')
      ActionNotification('START_SHOPPING_PALLET');
    } else if (stage !== 0 && stage !== 1 && !([rackLocation].includes(currentLocation) && floorRack == curFloorRack)) {
      ActionNotification('WRONG_DESTINATION');
    }
  }, [mode, stage, isNotify, status, msg, pickupType, ActionNotification]);

  console.log(msg)
 // table pickup ต้องมี amount
    return (
        <div className='bg'>
          <Navbar />
          <TablePickUp itemName={itemName}
            rowStr={row}
            floorRackStr={floorRack}
            shelfStr={shelf}
            isNotify={isNotify}
            status={status} 
            totalPickup={totalPickup} 
            donePickup={donePickup} 
            orderNumber={orderNumber} 
            pickupType={pickupType}
            pickupAmount={amount}/>
          <RackPopup row={row} floorRack={floorRack} isPopUp={isPopUp}></RackPopup>
          <Layout rackLocation={rackLocation} floorRack={floorRack} currentLocation={currentLocation}/>
          {isNotify && (
            <div className={'notification-wrapper'}>
              <DisplayNotification />
            </div>
          )}
        </div>
      );
}

export default PickUp;
