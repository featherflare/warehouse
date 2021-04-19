/*
App.js is include every section together! for display to user.

@ WEBSOCKET - ReconnectingWebSocket
WebSocket can automatic reconnect to server

@ CALCPAYLOAD
CalcPayload use when receive payload from server.

@ HANDLEMSG 
HandleMsg is to setMsgPutaway, setMsgPickup, setMsgLocationTransfer.

@ HANDLEDESCRIPTION
is to hold data such as: item_number, location until end process.

@ Action Notification
Action Notification will call displayNotification in case of
1. server connection lost / server back online
2. hardware device lost connection to server / back online

@ USECUSTOMEVENTLISTENER
to detect event from 3 event.
1. 'SEND_PAYLOAD' event.
2. 'CHANGE_MODE_AFTER_ERROR' event.
3. 'CHANGE_MODE_FROM_SELECT_MODE' event.
4. 'CHANGE_MODE_FROM_NAVBAR' event.

LEFT
- ADD LOGIN/TOKEN
- ADD ACTION NOTIFICATION ABOUT LOGIN

Updated - 15/04/64 - Aum
*/

import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import SelectMode from './screen/SelectMode';
import Login from './screen/LogIn';
import Putaway from './screen/PutAway';
import PickUp from './screen/PickUp';
import { NotificationContext } from './context/Notification/ProviderNotification';
import DisplayNotification from './context/Notification/DisplayNotification';
import { useCustomEventListener } from 'react-custom-events';
import CalcPayload from './component/CalcPayload';
import ReconnectingWebSocket from 'reconnecting-websocket';


// import css
import './css/App.css';

function App() {
  //------------------- THIS CODE BELOW IS MOCK UP CODE FOR PUT-AWAY MODE (MODE 2) ------------------
  // DESCRIPTION
  // Stage 0: including before putaway and taking putaway into rack.
  // Stage 1: verifying location that use RFID tag at pallet and rack.
  // Stage 2: verifying after took putaway into rack using RFID tag at pallet.

  // HOW TO USE
  // Change defaultMsg in line 108 to m2s0, m2s1, m2s2 or whatever that you want to test.

  const m2s0 = [
    {
      mode: 2,
      stage: 0,
      is_notify: false,
      status: false,
      data: [
        //This stage care about of data only.
        {
          location: '1021140207',
          item_number: '1010204003',
          item_name:
            'RPM-20-W Rotary Piston Meter M-bus Wiring Electronic Water Meter Size 3/4',
        },
      ],
    },
  ];

  const m2s1 = [
    {
      mode: 2,
      stage: 1,
      is_notify: true,
      status: false, // Change this status only to test alert popup.
      current_location: '1021140107', // if true, please change current_location to the same location in m1s0.
    },
  ];

  const m2s2 = [
    {
      mode: 3,
      stage: 1,
      is_notify: true,
      status: false, // Change this status only to test alert popup.
      current_location: '1021140307', // if true, please change current_location to the same location in m1s0.
    },
  ];
  //-------------------- END OF MOCK UP CODE FOR PUT-AWAY MODE (MODE 2) --------------------------

  const defaultMsg = [
    {
      mode: '',
      stage: '',
      is_notify: '',
      status: '',
    },
  ];

  const defaultPutaway = [
    {
      itemNumber: '',
      itemName: 'กรุณาแสกน RFID Tag พาเลทถัดไป',
      location: null,
    }
  ];

  const defaultLocationTransfer = [
    {
      total_location_transfer: null,
      done_location_transfer: null,
      source: '',
      destination: null
    }
  ];

  const defaultPickup = [
    {
      totalPickup: null,
      donePickup: null,
      orderNumber: '',
      pickupId: '',
      pickupType: '',
      itemName: '',
      location: null,
    }
  ];

  //itemDescription is use for hold message about data only.
  const { dispatch } = useContext(NotificationContext);
  const [itemDescription, setItemDescription] = useState(defaultPutaway);
  const [msgFromServer, setMsgFromServer] = useState(defaultMsg);
  const [msgPutaway, setMsgPutaway] = useState(defaultMsg);
  const [msgPickup, setMsgPickup] = useState(defaultMsg);
  const [msgLocationTransfer, setMsgLocationTransfer] = useState(defaultMsg);
  const [msgSelectMode, setMsgSelectMode] = useState(defaultMsg);
  const [isNotify, setIsNotify] = useState(true);
  const [hardwareStatus, setHardwareStatus] = useState(false);
  const [mode, setMode] = useState(0);
  const [serverConnectionStatus, setServerConnectionStatus] = useState(true);
  const [lastServerConnectionStatus, setLastServerConnectionStatus] = useState(serverConnectionStatus);

  // create reference of websocket
  const ws = useRef(null);

  // useEffect(() => {
  //   const url = 'ws://192.168.0.105:8000'; // ws://<ip>:<port>/ws/mode/<hardware_id>/  ws://10.25.247.97:8000/ws/mode/sw0001/ --> link ตอนเชื่อมกับ server จริง
  //   ws.current = new W3CWebSocket(url);

  //   ws.current.onopen = () => {
  //     console.log('WebSocket Client Connected');
  //     setServerConnectionStatus(true);
  //   };

  //   ws.current.onerror = () => {
  //     console.log('Connection Error');
  //     setServerConnectionStatus(false);
  //   };

  //   ws.current.onmessage = (message) => {
  //     const dataFromServer = JSON.parse(message.data);
  //     setMsgFromServer(CalcPayload(dataFromServer));
  //     setIsNotify(dataFromServer.is_notify);
  //   };

  //   return (ws.current.onclose = () => {
  //     console.log('echo-protocol Client Closed');
  //     setServerConnectionStatus(false);
  //   });
  // }, []);

  useEffect(() => {
    const url = 'ws://192.168.0.105:8000'
    ws.current = new ReconnectingWebSocket(url);
 
    ws.current.addEventListener('open', () => {
      console.log('WebSocket Client Connected');
      setServerConnectionStatus(true);
    });

    ws.current.addEventListener('message', (message) => {
      const dataFromServer = JSON.parse(message.data);
      setMsgFromServer(CalcPayload(dataFromServer));
      setIsNotify(dataFromServer.is_notify);
    });

    ws.current.addEventListener('error', () => {
      console.log('Connection Error');
      setServerConnectionStatus(false);
    });

    return (ws.current.addEventListener('close', () => {
      console.log('echo-protocol Client Closed');
      setServerConnectionStatus(false);
    }));
  }, []);

  // Event listener
  useCustomEventListener('SEND_PAYLOAD', (payload) => {
    ws.current.send(JSON.stringify(payload));
  });

  useCustomEventListener('CHANGE_MODE_AFTER_ERROR', (payload) => {
    if (payload === 0) {
      setMode(0); 
    }
  });

  useCustomEventListener('CHANGE_MODE_FROM_SELECT_MODE', (payload) => {
    setMode(payload);
    if (payload === 2) {
      setItemDescription(defaultPutaway);
    } else if (payload === 3) {
      setItemDescription(defaultPickup);
    } else if (payload === 4) {
      setItemDescription(defaultLocationTransfer);
    }
  });

  useCustomEventListener('CHANGE_MODE_FROM_NAVBAR', (payload) => {
    if (payload === 0) {
      setMode(0);
    }
  });

  // HandleHardwareStatus is use to tell user that connection between hardware and
  // server is lose connection or not?
  const HandleHardwareStatus = () => {
    const [{ hardware_status }] = msgFromServer;
    setHardwareStatus(hardware_status);
  };

  // handleDescription is use for hold a data inside data field (data is array)
  // the cause of if has new message from server sent to front-end, every part
  // is update by useState. Then to solve this problem to create a new variable
  // to hold this payload and send them to mode that we want to use.
  const HandleDescription = () => {
    const [{ mode, stage, status }] = msgFromServer;
    if (mode === 2 && stage === 1) {
      const [{ item_number, item_name, location }] = msgFromServer;
      let msg = [
        {
          itemNumber: item_number,
          itemName: item_name,
          location: location,
        },
      ];
      setItemDescription(msg);
    } else if (mode === 2 && stage === 3 && status) {
      setItemDescription(defaultPutaway);
    } else if (mode === 3 && (stage === 0 || stage === 4)) {
      const [
        {
          total_pickup,
          done_pickup,
          order_number,
          pickup_id,
          pickup_type,
          item_name,
          location,
        },
      ] = msgFromServer;
      
      if (stage === 4 && total_pickup - done_pickup === 0) {
        setItemDescription(defaultPickup);
      } else {
        let msg = [
          {
            totalPickup: total_pickup,
            donePickup: done_pickup,
            orderNumber: order_number,
            pickupId: pickup_id,
            pickupType: pickup_type,
            itemName: item_name,
            location: location,
          },
        ];
        setItemDescription(msg);
      }
    } else if (mode === 4 && (stage === 0 || stage === 4)) {
      const [{ total_location_transfer, done_location_transfer, source, destination }] = msgFromServer;
      if (stage === 4 && total_location_transfer - done_location_transfer === 0) {
        setItemDescription(defaultLocationTransfer);
      } else {
        let msg = [
          {
            total_location_transfer: total_location_transfer,
            done_location_transfer: done_location_transfer,
            source: source,
            destination: destination
          }
        ];
        setItemDescription(msg);
      }
    }

    if (((mode === 2 || mode === 3 || mode === 4) && stage === 0) || mode === 5) {
      HandleHardwareStatus();
    }
  }

  const HandleMsg = () => {
    const [{ mode }] = msgFromServer;
    if (mode === 0) {
      setMsgSelectMode(msgFromServer);
    } else if (mode === 2) {
      setMsgPutaway(msgFromServer);
    } else if (mode === 3) {
      setMsgPickup(msgFromServer);
    } else if (mode === 4) {
      setMsgLocationTransfer(msgFromServer);
    } 
  }

  const ActionNotification = useCallback(
    (status) => {
      if (status === 'HW_LOST') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'INCORRECT',
            message: 'ขาดการเชื่อมต่อกับอุปกรณ์',
          },
        });
      } else if (status === 'HW_ONLINE') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'CORRECT',
            message: 'อุปกรณ์กลับมาออนไลน์',
          },
        });
      } else if (status === 'SERVER_LOST') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'INCORRECT',
            message: 'ขาดการเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ต',
          },
        });
      } else if (status === 'SERVER_BACK_ONLINE') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'CORRECT',
            message: 'ระบบกลับมาออนไลน์',
          },
        });
      }
    },
    [dispatch]
  );

  // useEffect for re-update itemDescription to hold the data.
  useEffect(() => {
    HandleDescription();
    HandleMsg();
  }, [msgFromServer]);

  useEffect(() => {
    if (hardwareStatus) {
      ActionNotification('HW_ONLINE');
      // setIsAlert(true);
    } else {
      ActionNotification('HW_LOST');
      // setIsAlert(true);
    }
  }, [hardwareStatus]);

  useEffect(() => {

    if (!lastServerConnectionStatus && serverConnectionStatus) {
      ActionNotification('SERVER_BACK_ONLINE');
      setLastServerConnectionStatus(true);
    } else if (lastServerConnectionStatus && !serverConnectionStatus) {
      ActionNotification('SERVER_LOST');
      setLastServerConnectionStatus(false);
    } 
  }, [serverConnectionStatus, lastServerConnectionStatus]);

  return (
      <Router>
        <Switch>
          <Route path='/'>
            {/* <Login /> */}
            {/* Single Page Web application */}
            {/* <SelectMode msg={msgSelectMode} /> */}
            {/* {(
              <Putaway
                msg={msgPutaway}
                description={itemDescription} // description field is use for item_number, item_name, location only.
                isNotify={isNotify}
              />
            )} */}
            {(
              <PickUp
                msg={msgPickup}
                description={itemDescription}
                isNotify={isNotify}
              />
            )}
            {(
              <div className={'notification-wrapper'}>
                <DisplayNotification />
              </div>
            )}
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
