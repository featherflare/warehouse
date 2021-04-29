/* 
ProviderNotification is 'createContext' and set the initial state by using 'useReducer'.
After that will share data to whole project.

Updated - 09/02/2021 - Aum
*/

import React, { useReducer, createContext } from 'react';
import ReducerAlert from './ReducerAlert'

export const AlertContext = createContext();

const ProviderAlert = (props) => {
  const initialState = { id: "", type: "", message: "" };

  const [state, dispatch] = useReducer(ReducerAlert, initialState);

  return (
    <AlertContext.Provider
      value={{ alertState: state, dispatch }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default ProviderAlert;
