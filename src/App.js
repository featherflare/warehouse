/*
App.js is use WebSocket to connect to server (but now using localhost) and wait
to recieve message when server send it!
DONE
- In this function might be a single page web application.
- When mode changed, the page will be change too!
- If message from server change, all component will change too!
- If action need to send to server, useCustomEventListener to trigger events and data.
<<<<<< PAYLOAD @ WebSocket >>>>>>
Payload divided into 2 groups.
1. Group 1 - mode, is_notify, status, etc.
2. Group 2 - inside data - item_number, item_name, location, etc. 
**Group 2 is very important to do the process in the end. So, we create a itemDescription
to hold these data only by using useState.
Next
1. control mode
Updated - 06/04/64 - Aum
*/

import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import SelectMode from './screen/SelectMode';
import Login from './screen/LogIn';
import Putaway from './screen/PutAway';
import Receive from './screen/Receive';
import PickUp from './screen/PickUp';
import ProviderNotification from './context/Notification/ProviderNotification';
import { useCustomEventListener } from 'react-custom-events';
import CalcPayload from './component/CalcPayload';

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

  const defaultDescription = [
    {
      itemNumber: '',
      itemName: 'กรุณาแสกน RFID Tag พาเลทถัดไป',
      location: null,
    },
  ];

  //itemDescription is use for hold message about data only.
  const [itemDescription, setItemDescription] = useState(defaultDescription);
  // const [isGoToPutaway, setIsGoToPutaway] = useState(false);
  // const [isReceive, setIsReceive] = useState(false);
  const [msgFromServer, setMsgFromServer] = useState(defaultMsg);
  const [isNotify, setIsNotify] = useState(true);
  const [{ mode }] = msgFromServer;
  // const [msgDescription, setTestData] = useState('');

  // create reference of websocket
  const ws = useRef(null);

  useEffect(() => {
    const url = 'ws://10.25.251.177:8000/ws/mode/sw0001/'; // ws://<ip>:<port>/ws/mode/<hardware_id>/  ws://10.25.247.97:8000/ws/mode/sw0001/ --> link ตอนเชื่อมกับ server จริง
    ws.current = new W3CWebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    ws.current.onerror = () => {
      console.log('Connection Error');
    };

    ws.current.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      setMsgFromServer(CalcPayload(dataFromServer));
      setIsNotify(dataFromServer.is_notify);
      // setTestData(dataFromServer.data);
    };

    return (ws.current.onclose = () => {
      console.log('echo-protocol Client Closed');
    });
  }, []);

  // handle mode if select mode is finishing.
  // const handleMode = (currentMode) => {
  //   const { mode } = msgFromServer;
  //   console.log(mode)
  //   console.log('handle mode')
  //   if (mode === 1) {
  //     setIsReceive(true);
  //   }
  // };

  useCustomEventListener('SEND_PAYLOAD', (payload) => {
    ws.current.send(JSON.stringify(payload));
  });

  // handleDescription is use for hold a data inside data field (data is array)
  // the cause of if has new message from server sent to front-end, every part
  // is update by useState. Then to solve this problem to create a new variable
  // to hold this payload and send them to mode that we want to use.
  const HandleDescription = () => {
    const [{ mode, stage, status }] = msgFromServer;
    if (mode === 1 && stage === 3) {
      const [{ item_number, item_name }] = msgFromServer;
      let msg = [
        {
          itemNumber: item_number,
          itemName: item_name,
        },
      ];
      setItemDescription(msg);
    } else if (mode === 2 && stage === 0) {
      const [{ item_number, item_name, location }] = msgFromServer;
      let msg = [
        {
          itemNumber: item_number,
          itemName: item_name,
          location: location,
        },
      ];
      setItemDescription(msg);
    } else if (mode === 2 && stage === 2 && status) {
      setItemDescription(defaultDescription);
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
      if (pickup_type === 'FULL') {
        let msg = [
          {
            totalPickup: total_pickup,
            donePickup: done_pickup,
            orderNumber: order_number,
            pickupId: pickup_id,
            pickupType: pickup_type, // if shopping pallet, pickupType = 'SHOPPING'
            itemName: item_name,
            location: location,
          },
        ];
        setItemDescription(msg);
      } else if (pickup_type === 'SHOPPING') {
        const [{ amount }] = msgFromServer;
        let msg = [
          {
            totalPickup: total_pickup,
            donePickup: done_pickup,
            orderNumber: order_number,
            pickupId: pickup_id,
            pickupType: pickup_type, // if shopping pallet, pickupType = 'SHOPPING'
            itemName: item_name,
            location: location,
            amount: amount,
          },
        ];
        setItemDescription(msg);
      } else if (stage === 4 && total_pickup - done_pickup === 0) {
        setItemDescription(defaultDescription);
      }
    }
  };

  // useEffect for re-update itemDescription to hold the data.
  useEffect(() => {
    // handleMode();
    HandleDescription();
  }, [msgFromServer]);

  console.log(itemDescription);
  // console.log(msgFromServer.data)
  return (
    <ProviderNotification>
      <Router>
        <Switch>
          <Route path='/'>
            {/* <Login /> */}
            {/* <SelectMode /> */}
            {/* Single Page Web application */}
            {/* <Receive
                msg={msgFromServer}
                description={itemDescription}
                isNotify={isNotify}
              /> */}
            {/* {mode === 1 && (
              <Receive
                msg={msgFromServer}
                description={itemDescription}
                isNotify={isNotify}
              />
            )} */}
            {
              <Putaway
                msg={msgFromServer}
                description={itemDescription} // description field is use for item_number, item_name, location only.
                isNotify={isNotify}
              />
            }
            {/* {mode === 3 && (
              <PickUp
                msg={msgFromServer}
                description={itemDescription}
                isNotify={isNotify}
              />
            )} */}
          </Route>
        </Switch>
      </Router>
    </ProviderNotification>
  );
}

export default App;
