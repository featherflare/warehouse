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
import Loading from './screen/Loading';
import Test from './screen/test';
import RegisterHardwareId from './screen/RegisterHardwareId';
import SuperviserLocation from './screen/SuperviserLocation';
import { NotificationContext } from './context/Notification/ProviderNotification';
import DisplayNotification from './context/Notification/DisplayNotification';
import { emitCustomEvent, useCustomEventListener } from 'react-custom-events';
import CalcPayload from './component/CalcPayload';
import ReconnectingWebSocket from 'reconnecting-websocket';
import useToken from './component/Hooks/useToken';
import useTicket from './component/Hooks/useTicket';
import useHardwareId from './component/Hooks/useHardwareId';
import axios from 'axios';

// import css
import './css/App.css';
import LocationTransfer from './screen/LocationTransfer';
import useProfile from './component/Hooks/useProfile';

let interval = null;
async function requestTicket(token, hardwareId) {
  return axios({
    method: 'post',
    url: 'http://192.168.1.69:8000/auth/hardware-ticket/',
    data: {
      hardware_id: hardwareId,
    },
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((data) => data.data)
    .catch((err) => {
      console.log(err);
      clearInterval(interval);
      emitCustomEvent('HW_READY', false);
      emitCustomEvent('CLOSE_LOADING');
      alert(`ไม่พบอุปกรณ์ฮาร์ดแวร์ กรุณาเปลี่ยนอุปกรณ์`);
    });
}

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
  const [isSuperuser, setIsSuperuser] = useState(false);

  const { token, setToken } = useToken();
  const { ticket, setTicket } = useTicket();
  const { hardwareId, setHardwareId } = useHardwareId();
  const { profile, setProfile } = useProfile();
  const [isHardwareReady, setIsHardwareReady] = useState(false);
  const [closeLoading, setCloseLoading] = useState(false);
  const [isMainPage, setIsMainPage] = useState(false);

  // create reference of websocket
  const ws = useRef(null);

  useEffect(() => {
    if (ticket) {
      console.log('กำลังสร้างการเชื่อมต่อ');
      const url = `ws://192.168.1.69:8000/ws/mode/sw${hardwareId}/${ticket}/`; // ws://<ip>:<port>/ws/mode/<hardware_id>/  ws://10.25.247.97:8000/ws/mode/sw0001/ --> link ตอนเชื่อมกับ server จริง
      ws.current = new W3CWebSocket(url);

      ws.current.onopen = () => {
        console.log('WebSocket Client Connected');
        setServerConnectionStatus(true);
      };

      ws.current.onerror = () => {
        console.log('Connection Error');
        let store = {};
        store['ticket'] = '';
        setTicket(store);
        setServerConnectionStatus(false);
      };

      ws.current.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        setMsgFromServer(CalcPayload(dataFromServer));
        setIsNotify(dataFromServer.is_notify);
      };

      return (ws.current.onclose = () => {
        console.log('echo-protocol Client Closed');
        let store = {};
        store['ticket'] = '';
        setTicket(store);
        setServerConnectionStatus(false);
      });
    } else {
      console.log('ปิดการเชื่อมต่อ');
    }
  }, [ticket, hardwareId]);

  // Event listener
  useCustomEventListener('SEND_PAYLOAD', (payload) => {
    ws.current.send(JSON.stringify(payload));
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
    if (mode === 0) {
      setMode(0);
    }
  });

  useCustomEventListener('CUT_CONNECTION', () => {
    ws.current.close();
    setToken('');
    setProfile({ profile: '' });
    setHardwareId('');
    setTicket('');
    localStorage.clear();
    sessionStorage.clear();
    setCloseLoading(false);
    setServerConnectionStatus(false);
  });

  useCustomEventListener('SUPERUSER', () => {
    setIsSuperuser(true);
  });

  useCustomEventListener('HW_READY', (payload) => {
    if (payload) {
      setIsHardwareReady(true);
    } else {
      setIsHardwareReady(false);
    }
  });

  useCustomEventListener('OFF_WS', (payload) => {
    if (ticket) {
      ws.current.close();
      setTicket('');
    }
  });

  useCustomEventListener('CLOSE_LOADING', (payload) => {
    if (isHardwareReady) {
      setCloseLoading(true);
    }
    if (payload) {
      setCloseLoading(true);
    }
  });

  useCustomEventListener('SESSION_TIMEOUT', () => {
    ws.current.close();
    setToken('');
    setProfile({ profile: '' });
    setHardwareId('');
    setTicket('');
    sessionStorage.clear();
    localStorage.clear();
    setIsHardwareReady(false);
    setCloseLoading(false);
    setIsSuperuser(false);
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

    if (
      (mode === 0) & (stage === 0) ||
      (mode === 2 && stage === 0) ||
      (mode === 3 && stage === 0) ||
      (mode === 4 && stage === 0) ||
      mode === 5
    ) {
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

  const getTicket = async () => {
    try {
      const { ticket, is_ready } = await requestTicket(token, hardwareId);
      if (ticket && is_ready) {
        let store = {};
        store['ticket'] = ticket;
        setTicket(store);
        setIsHardwareReady(true);
        clearInterval(interval);
        setCloseLoading(true);
      } else if (!is_ready) {
        clearInterval(interval);
        setIsHardwareReady(false);
        setCloseLoading(true);
        alert(
          `อุปกรณ์ฮาร์ดแวร์หมายเลข: ${hardwareId} อาจไม่พร้อมใช้งาน กรุณาเปลี่ยนอุปกรณ์`
        );
      }
    } catch (error) {
      console.log(error);
      clearInterval(interval);
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
      } else {
        ActionNotification('HW_LOST');
        setHardwareStatus(false);
      }
    }
  }, [hardwareStatus, hardwareId]);

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
  }, [serverConnectionStatus, lastServerConnectionStatus, hardwareId]);

  useEffect(() => {
    if (ticket) {
      const [{ mode, stage }] = msgFromServer;
      if (mode === 3 && stage === 1 && !isNotify) {
        ActionNotification('NEW_ORDER_PICK_UP');
        setNotiNavbarPickUp(true);
      } else if (mode === 4 && stage === 1 && !isNotify) {
        ActionNotification('NEW_ORDER_LOCATION_TRANSFER');
        setNotiNavbarLocation(true);
      }
    }
  }, [msgFromServer]);

  // To request ticket if token and hardware id are founded.
  useEffect(() => {
    if (token && hardwareId && !isSuperuser) {
      try {
        interval = setInterval(() => {
          getTicket();
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    if (token && ticket) {
      setIsMainPage(true);
    } else {
      setIsMainPage(false);
    }
  }, [ticket, token]);

  // if don't have ticket or ticket was deleted by web socket, request again.
  // useEffect(() => {
  //   if (!ticket) {
  //     interval = setInterval(() => {
  //       getTicket();
  //     }, 1500);
  //   }
  // }, [ticket]);

  // if token not found and user have to login.
  if (!token && !isSuperuser) {
    return (
      <Login
        token={token}
        setToken={setToken}
        ticket={ticket}
        setTicket={setTicket}
        hardwareId={hardwareId}
        setHardwareId={setHardwareId}
        isHardwareReady={isHardwareReady}
        setProfile={setProfile}
      />
    );
  }

  // if Hardware id not found
  if (token && !hardwareId && !ticket && !isSuperuser) {
    if (!isHardwareReady) {
      return (
        <RegisterHardwareId
          ticket={ticket}
          setTicket={setTicket}
          hardwareId={hardwareId}
          setHardwareId={setHardwareId}
        />
      );
    }
  }

  // if user is superuser
  if (token && isSuperuser) {
    return (
      <SuperviserLocation
        token={token}
        setToken={setToken}
        setCloseLoading={setCloseLoading}
        setIsSuperuser={setIsSuperuser}
      />
    );
  }

  return (
    <Router>
      <Switch>
        <Route path='/'>
          <Test />
          {/* Single Page Web application */}
          {!closeLoading && <Loading />}
          {((token && !ticket && !isHardwareReady && closeLoading) ||
            mode === 6) && (
            <RegisterHardwareId
              ticket={ticket}
              setTicket={setTicket}
              hardwareId={hardwareId}
              setHardwareId={setHardwareId}
            />
          )}
          {isMainPage && mode === 0 && (
            <SelectMode
              msg={msgSelectMode}
              notiNavbarPickUp={notiNavbarPickUp}
              notiNavbarLocation={notiNavbarLocation}
              hardware={hardwareStatus}
              modeNav={mode}
              serverConnection={lastServerConnectionStatus}
              profile={profile}
            />
          )}
          {isMainPage && mode === 2 && (
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
          {isMainPage && mode === 3 && (
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
          {isMainPage && mode === 4 && (
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
          {isMainPage && <DisplayNotification mode={mode} stage={stage} />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
