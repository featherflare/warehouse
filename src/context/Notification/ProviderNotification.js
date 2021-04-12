/* 
ProviderNotification is 'createContext' and set the initial state by using 'useReducer'.
After that will share data to whole project.

Updated - 09/02/2021 - Aum
*/

import React, { useReducer, createContext } from 'react';
import ReducerNotification from './ReducerNotification'

export const NotificationContext = createContext();

const ProviderNotification = (props) => {
  const initialState = { id: "", type: "", message: "" };

  const [state, dispatch] = useReducer(ReducerNotification, initialState);

  return (
    <NotificationContext.Provider
      value={{ notificationState: state, dispatch }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default ProviderNotification;
