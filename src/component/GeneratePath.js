/*
This function is generate path by custom data.
Path can be generate wherever starting point to destination.
Updated 15-04-2021 - Aum
*/
import React from 'react';

const GeneratePath = ({ destination, currentLocation, isOutGate, isCheckingZone }) => {
  // For generate path wherever to go to fix location that choose by server
  // So, this variable below to collect data from starting point.
  const rowPathLocation = [
    435,
    600, // for row c,d and checking zone
    768,
    934,
    1100,
    1019 // out gate
  ];

  const upperWalkWay = 'V90';
  const lowerWalkWay = 'V550';
  const checkingPoint = '565';
  const outGate = '650';

  // if don't have current location, it will be generating from lift.
  const startingFromInGate = 'M435,650 V550';

  // ----------------- end of starting variable --------------------------

  // This variable below are collect data to generate path to destination.
  // acp = allColumnPosition Y-axis
  const acp = [
    511,
    476,
    441,
    406,
    371,
    336,
    301,
    266,
    231,
    196,
    161,
    126
  ]
  
  // jcp = jColumnPosition Y-axis
  const jcp = [
    616,
    581,
    546,
    511,
    476,
    441,
    406,
    371,
    336,
    301,
    266,
    231,
    196,
    161,
    126
  ];

  // -------------------- end of destination variable ----------------------

  // destination = "X-XX"
  // This variable below is use for generate path for destinating point only.
  var rowDes = destination.slice(0, 1);
  var columnDes = parseInt(destination.slice(2, 4), 10);
  var aisleDes = '';
  var columnPathDes= '';

  // Current Location X-XX
  // This variable below is use for generate path for starting point only.
  if (currentLocation) {
    var rowCurrent = currentLocation.slice(0, 1);
    var columnCurrent = parseInt(currentLocation.slice(2, 4), 10);
    var startingRowPath = '';
    var startingColumnPath = '';
    var startingAislePath = '';
    var endingColumnPath = '';
    var distance = '';
  }

  var path = '';
  var sameAisle = false;
  // -----------------------------------------------------------------------------------

  // generate aisle path to destination.
  if (isOutGate) {
    aisleDes = rowPathLocation[5];
    columnPathDes = outGate;
  } else if (isCheckingZone) {
    aisleDes = rowPathLocation[1];
    columnPathDes = checkingPoint;
  } else {
    if (['A', 'B'].includes(rowDes)) {
      aisleDes = rowPathLocation[0];
    } else if (['C', 'D'].includes(rowDes)) {
      aisleDes = rowPathLocation[1];
    } else if (['E', 'F'].includes(rowDes)) {
      aisleDes = rowPathLocation[2];
    } else if (['G', 'H'].includes(rowDes)) {
      aisleDes = rowPathLocation[3];
    } else if (['I', 'J'].includes(rowDes)) {
      aisleDes = rowPathLocation[4];
    }

    //find column path to destination.
    if (['J'].includes(rowDes)) {
      columnPathDes = jcp[columnDes - 1];
    } else {
      columnPathDes = acp[columnDes - 1];
    }

    if (['A', 'C', 'E', 'G', 'I'].includes(rowDes)) {
      var leftOrRightDes = 'h-20';
    } else {
      var leftOrRightDes = 'h20';
    }
  }
  
  // ---------------- Find starting point -----------------------
  // Find starting row point
  if (currentLocation) {
    // Find Starting row point
    if (rowCurrent === 'A') {
      let start = rowPathLocation[0] - 20;
      startingRowPath = `${start}`;
    } else if (rowCurrent === 'B') {
      let start = rowPathLocation[0] + 20;
      startingRowPath = `${start}`;
    } else if (rowCurrent === 'C') {
      let start = rowPathLocation[1] - 20;
      startingRowPath = `${start}`;
    } else if (rowCurrent === 'D') {
      let start = rowPathLocation[1] + 20;
      startingRowPath = `${start}`;
    } else if (rowCurrent === 'E') {
      let start = rowPathLocation[2] - 20;
      startingRowPath = `${start}`;
    } else if (rowCurrent === 'F') {
      let start = rowPathLocation[2] + 20;
      startingRowPath = `${start}`;
    } else if (rowCurrent === 'G') {
      let start = rowPathLocation[3] - 20;
      startingRowPath = `${start}`;
    } else if (rowCurrent === 'H') {
      let start = rowPathLocation[3] + 20;
      startingRowPath = `${start}`;
    } else if (rowCurrent === 'I') {
      let start = rowPathLocation[4] - 20;
      startingRowPath = `${start}`;
    } else if (rowCurrent === 'J') {
      let start = rowPathLocation[4] + 20;
      startingRowPath = `${start}`;
    }

    // find a starting column point.
    if (rowCurrent === 'J') {
      startingColumnPath = jcp[columnCurrent - 1];
    } else {
      startingColumnPath = acp[columnCurrent - 1];
    }
    
    // move line to center of aisle
    if (['A', 'C', 'E', 'G', 'I'].includes(rowCurrent)) {
      var leftOrRightCurrent = 'h20';
    } else {
      var leftOrRightCurrent = 'h-20';
    }

    // move line to upper or lower
    if (columnCurrent <= 6 && columnDes <= 6) {
      startingAislePath = lowerWalkWay;
    } else if (columnCurrent <= 6 && columnDes >= 6) {
      startingAislePath = upperWalkWay;
    } else if (columnCurrent >= 6 && columnDes <= 6) {
      startingAislePath = lowerWalkWay;
    } else if (columnCurrent >= 6 && columnDes >= 6) {
      startingAislePath = upperWalkWay;
    } else if (isOutGate) {
      startingAislePath = lowerWalkWay;
    }

    // ------------------ End of find starting point -----------------------
    // check same aisle or same row
    if ((['A', 'B'].includes(rowDes) && ['A', 'B'].includes(rowCurrent)) ||
    (['C', 'D'].includes(rowDes) && ['C', 'D'].includes(rowCurrent)) ||
    (['E', 'F'].includes(rowDes) && ['E', 'F'].includes(rowCurrent)) ||
    (['G', 'H'].includes(rowDes) && ['G', 'H'].includes(rowCurrent)) ||
    (['I', 'J'].includes(rowDes) && ['I', 'J'].includes(rowCurrent))) {
      sameAisle = true;
    } else {
      sameAisle = false;
    }

    // ------- Calculate path if starting point and ending point are same row ------------
    if (sameAisle) {
      // same aisle
      // find column path to ending point.
      if (rowCurrent === 'J' || rowDes === 'J') {
        endingColumnPath = jcp[columnDes - 1];
        distance = endingColumnPath - startingColumnPath;
      } else {
        endingColumnPath = acp[columnDes - 1];
        distance = endingColumnPath - startingColumnPath;
      } 
      path = `M${startingRowPath},${startingColumnPath} ${leftOrRightCurrent} v${distance} ${leftOrRightDes}`;
    } else {
      // from any to any
      path = `M${startingRowPath},${startingColumnPath} ${leftOrRightCurrent} ${startingAislePath} H${aisleDes} V${columnPathDes} ${leftOrRightDes}`;
    }
  } else if (isCheckingZone) {
    path = `${startingFromInGate} H${aisleDes} V${columnPathDes}`;
  } else {
    // if don't have value in currentLocation, the path will starting from in gate.
    // path from in gate.
    path = `${startingFromInGate} H${aisleDes} V${columnPathDes} ${leftOrRightDes}`;
  }

  console.log(path)
  return (
    <svg>
      <path
        id='Path'
        data-name='Path'
        className='cls-14'
        d={path}
        transform='translate(0 0)'
      />
    </svg>
  );
};

export default GeneratePath;
