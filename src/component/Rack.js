/*
This function is to plot rack only in type of svg.

----- data variable -----
- Extract RackData to id, dataName, width, height and transform.
- Recieve the destination from rackLocation in layout.js.

DONE
- Change block color to red, green or blink.

Then return plotting rack.

Updated 07-04-2021 - Aum
*/

import React from 'react';
import '../css/Layout.css';

const Rack = ({ id, dataName, width, height, transform, destination, currentLocation }) => {
  var clsName = '';
  if (!(typeof(destination) === 'undefined')) {
    if (destination === id && !(destination === id && currentLocation === id)) {
      clsName = 'blink';
    } else if (currentLocation === id && !(destination === id && currentLocation === id)) {
      clsName = 'wrong'; 
    } else if (destination === id && currentLocation === id) {
      clsName = 'correct'; // if current location is same as destination, block will change to green.
    } else {
      clsName = 'cls-6';
    }
  } else {
    clsName = 'cls-6';
  }

  return (
    <svg>
      <rect
        id={id}
        data-name={dataName}
        className={clsName}
        width={width}
        height={height}
        transform={transform}
      />
    </svg>
  );
};

export default Rack;
