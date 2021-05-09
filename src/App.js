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

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import SelectMode from './screen/SelectMode';
import Login from './screen/LogIn';
import Putaway from './screen/PutAway';
import PickUp from './screen/PickUp';
import RegisterHardwareId from './screen/RegisterHardwareId'
import SuperviserLocation from './screen/SuperviserLocation';
import { NotificationContext } from './context/Notification/ProviderNotification';
import DisplayNotification from './context/Notification/DisplayNotification';
import { emitCustomEvent, useCustomEventListener } from 'react-custom-events';
import CalcPayload from './component/CalcPayload';
import ReconnectingWebSocket from 'reconnecting-websocket';
import useToken from './component/Hooks/useToken';
import useTicket from './component/Hooks/useTicket'
import useHardwareId from './component/Hooks/useHardwareId'

// import css
import './css/App.css';
import LocationTransfer from './screen/LocationTransfer';

function App() {
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
      itemName: 'กรุณาสแกน RFID Tag พาเลทถัดไป',
      location: null,
    },
  ];

  const defaultLocationTransfer = [
    {
      total_location_transfer: null,
      done_location_transfer: null,
      source: '',
      destination: null,
    },
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
    },
  ];

  //itemDescription is use for hold message about data only.
  const { dispatch } = useContext(NotificationContext);
  const [itemDescription, setItemDescription] = useState(defaultPutaway);
  const [msgFromServer, setMsgFromServer] = useState(defaultMsg);
  const [msgPutaway, setMsgPutaway] = useState(defaultMsg);
  const [msgPickup, setMsgPickup] = useState(defaultMsg);
  const [msgLocationTransfer, setMsgLocationTransfer] = useState(defaultMsg);
  const [msgSelectMode, setMsgSelectMode] = useState(defaultMsg);
  const [isNotify, setIsNotify] = useState(false);
  const [hardwareStatus, setHardwareStatus] = useState(false);
  const [mode, setMode] = useState(0);
  const [stage, setStage] = useState(0);
  const [serverConnectionStatus, setServerConnectionStatus] = useState(true);
  const [lastServerConnectionStatus, setLastServerConnectionStatus] = useState(
    serverConnectionStatus
  );
  const [notiNavbarPickUp, setNotiNavbarPickUp] = useState(false);
  const [notiNavbarLocation, setNotiNavbarLocation] = useState(false);

  const { token, setToken } = useToken();
  const { ticket, setTicket } = useTicket();
  const { hardwareId, setHardwareId } = useHardwareId();

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
    const url = `ws://172.20.10.7:8000/ws/mode/sw${hardwareId}/${ticket}/`;
    ws.current = new ReconnectingWebSocket(url);

    ws.current.addEventListener('open', () => {
      console.log('WebSocket Client Connected');
      setServerConnectionStatus(true);
    });

    ws.current.addEventListener('message', (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log(dataFromServer);
      setMsgFromServer(CalcPayload(dataFromServer));
    });

    ws.current.addEventListener('error', () => {
      console.log('Connection Error');
      setServerConnectionStatus(false);
    });

    return ws.current.addEventListener('close', () => {
      console.log('echo-protocol Client Closed');
      setServerConnectionStatus(false);
    });
  }, []);

  // Event listener
  useCustomEventListener('SEND_PAYLOAD', (payload) => {
    ws.current.send(JSON.stringify(payload));
    console.log(JSON.stringify(payload));
  });

  useCustomEventListener('CHANGE_MODE_AFTER_ERROR', (payload) => {
    if (payload === 0) {
      setMode(0);
      setMsgPutaway(defaultMsg);
      setMsgPickup(defaultMsg);
      setMsgLocationTransfer(defaultMsg);
      setItemDescription(defaultPutaway);
    }
  });

  useCustomEventListener('CHANGE_MODE_FROM_SELECT_MODE', (mode) => {
    setMode(mode);
    if (mode === 2) {
      setItemDescription(defaultPutaway);
    } else if (mode === 3) {
      setItemDescription(defaultPickup);
      setNotiNavbarPickUp(false);
    } else if (mode === 4) {
      setItemDescription(defaultLocationTransfer);
      setNotiNavbarLocation(false);
    }
  });

  useCustomEventListener('CHANGE_MODE_FROM_NAVBAR', (mode) => {
    console.log(mode);
    if (mode === 0) {
      setMode(0);
    }
  });

  // HandleHardwareStatus is use to tell user that connection between hardware and
  // server is lose connection or not?
  const HandleHardwareStatus = () => {
    const [{ hardware_status }] = msgFromServer;
    setHardwareStatus(hardware_status);
    console.log('updated hw_status: ', hardwareStatus);
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
    } else if (mode === 4 && (stage === 0 || (stage === 4 && status))) {
      const [
        {
          total_location_transfer,
          done_location_transfer,
          source,
          destination,
        },
      ] = msgFromServer;
      if (
        stage === 4 &&
        total_location_transfer - done_location_transfer === 0
      ) {
        setItemDescription(defaultLocationTransfer);
      } else {
        let msg = [
          {
            total_location_transfer: total_location_transfer,
            done_location_transfer: done_location_transfer,
            source: source,
            destination: destination,
          },
        ];
        setItemDescription(msg);
      }
    }

    if ((mode === 0 & stage === 0) || ((mode === 2 && stage === 0) || (mode === 3 && stage === 0) || (mode === 4 && stage === 0)) ||
      mode === 5
    ) {
      console.log('update hardware status');
      HandleHardwareStatus();
    }
  };

  const HandleMsg = () => {
    const [{ mode, stage, is_notify }] = msgFromServer;
    if (mode === 0) {
      setMsgSelectMode(msgFromServer);
      setMode(mode);
      setStage(stage);
    } else if (mode === 2) {
      setMsgPutaway(msgFromServer);
      setMode(mode);
      setStage(stage);
      setIsNotify(is_notify);
    } else if (mode === 3 && stage !== 1) {
      setMsgPickup(msgFromServer);
      setMode(mode);
      setStage(stage);
      setIsNotify(is_notify);
    } else if (mode === 4 && stage !== 1) {
      setMsgLocationTransfer(msgFromServer);
      setMode(mode);
      setStage(stage);
      setIsNotify(is_notify);
    }
  };

  const ActionNotification = useCallback(
    (status) => {
      if (status === 'HW_LOST') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'POPUP_INCORRECT',
            message: 'ขาดการเชื่อมต่อกับอุปกรณ์',
          },
        });
      } else if (status === 'HW_ONLINE') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'POPUP_CORRECT',
            message: 'อุปกรณ์กลับมาออนไลน์',
          },
        });
      } else if (status === 'SERVER_LOST') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'POPUP_INCORRECT',
            message:
              'ขาดการเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ต',
          },
        });
      } else if (status === 'SERVER_BACK_ONLINE') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'POPUP_CORRECT',
            message: 'ระบบกลับมาออนไลน์',
          },
        });
      } else if (status === 'NEW_ORDER_PICK_UP') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'POPUP',
            message: 'มีออเดอร์ใหม่เข้ามาในPickup',
          },
        });
      } else if (status === 'NEW_ORDER_LOCATION_TRANSFER') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'POPUP',
            message: 'มีออเดอร์ใหม่เข้ามาในLocation Transfer',
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
    if (ticket) {
      if (hardwareStatus) {
        ActionNotification('HW_ONLINE');
        setHardwareStatus(true);
        // setIsAlert(true);
      } else {
        ActionNotification('HW_LOST');
        setHardwareStatus(false);
        // setIsAlert(true);
      }
    }
  }, [hardwareStatus]);

  useEffect(() => {
    if (ticket) {
      if (!lastServerConnectionStatus && serverConnectionStatus) {
        ActionNotification('SERVER_BACK_ONLINE');
        setLastServerConnectionStatus(true);
      } else if (lastServerConnectionStatus && !serverConnectionStatus) {
        ActionNotification('SERVER_LOST');
        setLastServerConnectionStatus(false);
        setHardwareStatus(false);
      }
    }
  }, [serverConnectionStatus, lastServerConnectionStatus]);

  useEffect(() => {
    const [{ mode, stage }] = msgFromServer;
    if (mode === 3 && stage === 1 && !isNotify) {
      ActionNotification('NEW_ORDER_PICK_UP');
      setNotiNavbarPickUp(true);
      console.log('pickupnoti');
    } else if (mode === 4 && stage === 1 && !isNotify) {
      ActionNotification('NEW_ORDER_LOCATION_TRANSFER');
      setNotiNavbarLocation(true);
    }
  }, [msgFromServer]);
  console.log('app', mode);

  if (!token) {
    return <Login setToken={setToken} setTicket={setTicket}/>;
  }

  return (
    <Router>
      <Switch>
        <Route path='/'>
          {/* <Login /> */}
          {/* <SuperviserLocation/> */}
          {/* Single Page Web application */}
          <RegisterHardwareId/>
          {/* {mode === 0 && (
            <SelectMode
              msg={msgSelectMode}
              notiNavbarPickUp={notiNavbarPickUp}
              notiNavbarLocation={notiNavbarLocation}
              hardware={hardwareStatus}
              modeNav={mode}
              serverConnection={lastServerConnectionStatus}
            />
          )}
          {mode === 2 && (
            <Putaway
              msg={msgPutaway}
              description={itemDescription} // description field is use for item_number, item_name, location only.
              isNotify={isNotify}
              notiNavbarPickUp={notiNavbarPickUp}
              notiNavbarLocation={notiNavbarLocation}
              hardware={hardwareStatus}
              modeNav={mode}
              serverConnection={lastServerConnectionStatus}
            />
          )}
          {mode === 3 && (
            <PickUp
              msg={msgPickup}
              description={itemDescription}
              isNotify={isNotify}
              // ค่าสำหรับส่งเข้าไปใน Navbar
              notiNavbarPickUp={notiNavbarPickUp}
              notiNavbarLocation={notiNavbarLocation}
              hardware={hardwareStatus}
              modeNav={mode}
              serverConnection={lastServerConnectionStatus}
            />
          )}
          {mode === 4 && (
            <LocationTransfer
              msg={msgLocationTransfer}
              description={itemDescription}
              isNotify={isNotify}
              notiNavbarPickUp={notiNavbarPickUp}
              notiNavbarLocation={notiNavbarLocation}
              hardware={hardwareStatus}
              modeNav={mode}
              serverConnection={lastServerConnectionStatus}
            />
          )}
          {<DisplayNotification mode={mode} stage={stage} />} */}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
