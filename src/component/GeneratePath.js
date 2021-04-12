/*
This function is generate path by custom data.
Path can be generate wherever starting point to destination.
Updated 04-03-2021 - Aum
*/
import React from 'react';

const GeneratePath = ({ destination, currentLocation }) => {
  // For generate path wherever to go to fix location that choose by server
  // So, this variable below to collect data from starting point.
  const rowStartingPoint = [
    2865,
    2895,
    3010,
    3042,
    3157,
    3189,
    3302,
    3336,
    3447.5,
    3483,
    3595.5,
    3628,
    3740.5,
    3773,
    3888,
    3921.5,
  ];

  // csplu = columnStartingPointForLeftSideAndUpper
  const csplu = [
    1320,
    1300,
    1280,
    1260,
    1242,
    1222,
    1202,
    1185,
    1162,
    1145,
    1125,
    1105,
    1085,
    1065,
    1045,
    1025,
  ];

  // cspll = columnStartingPointForLeftSideAndLower
  const cspll = [
    1390,
    1407,
    1430,
    1447,
    1470,
    1487,
    1510,
    1527,
    1550,
    1567,
    1587,
    1606,
    1625,
    1625,
    1645,
  ];

  // cspru = columnStartingPointForRightSideAndUpper
  const cspru = [1300, 1280, 1260, 1242, 1222, 1202, 1125, 1105, 1045, 1025];

  // csprl = columnStartingPointForRightSideAndLower
  const csprl = [1390, 1407, 1430, 1447, 1510, 1527, 1625, 1645];

  // cspsru = columnStartingPointSpecialForRightSideAndUpper (For L16 only)
  const cspsru = [1320, 1300, 1222, 1202, 1145, 1125, 1085, 1065];

  // cspsrl = columnStartingPointSpecialForRightSideAndLower (For R11 only)
  const cspsrl = [1337, 1357, 1430, 1447, 1510, 1527, 1587, 1606];

  const rowPathLocation = [
    'L2880,1354.189',
    'L3026,1354.189',
    'L3173,1354.189',
    'L3319,1354.189',
    'L3465.25,1354.189',
    'L3611.75,1354.189',
    'L3756.75,1354.189',
    'L3904.75,1354.189',
  ];
  const middleWalkWay = 'V1354.189';

  // if don't have current location, it will be generating from lift.
  const startingFromLift = 'M2974.562,1584.538 h-79.11 V1354.189';

  // ----------------- end of starting variable --------------------------

  // This variable below are collect data to generate path to destination.
  // cdlu = columnDestinationLeftSideAndUpper
  const cdlu = [
    -35.5,
    -52.5,
    -72.5,
    -92.5,
    -110.5,
    -130.5,
    -150.5,
    -170.5,
    -190.5,
    -210.5,
    -230.5,
    -250.5,
    -270.5,
    -290.5,
    -310.5,
    -330.5,
  ];

  // cdru = columnDestinationRightSideAndUpper
  const cdru = [
    -52.5,
    -72.5,
    -92.5,
    -110.5,
    -130.5,
    -150.5,
    -230.5,
    -250.5,
    -310.5,
    -330.5,
  ];

  // cdll = columnDestinationLeftSideAndLower
  const cdll = [
    35.5,
    52.5,
    72.5,
    92.5,
    113.5,
    133.5,
    153.5,
    173.5,
    193.5,
    212.5,
    232.5,
    250.5,
    270.5,
    290.5,
  ];

  // cdrl = columnDestinationRightSideAndLower
  const cdrl = [35.5, 52.5, 72.5, 92.5, 153.5, 173.5, 270.5, 290.5];

  // sdru = specialDestinationRightSideAndUpper (L16 only)
  const sdru = [-35.5, -52.5, -130.5, -150.5, -210.5, -230.5, -270.5, -290.5];

  // sdrl = specialDestinationRightSideAndUpper (R11 only)
  const sdrl = [-15.5, 3.5, 72.5, 92.5, 153.5, 173.5, 232.5, 250.5];
  // -------------------- end of destination variable ----------------------

  // destination = "XXXXXX-XX"
  // This variable below is use for generate path for destinating point only.
  var rowDestination = destination.slice(0, 6);
  var shelfDestination = destination.slice(7, 9);
  var upperOrLowerRackDestination = destination.slice(3, 4);
  var columnIntDestination = parseInt(shelfDestination, 10);
  var aislePathDestination = '';
  var columnPathDestination = '';

  // Current Location XXXXXXXXXX
  // This variable below is use for generate path for starting point only.
  if (currentLocation) {
    var rowCurrent = currentLocation.slice(0, 6);
    var shelfCurrent = currentLocation.slice(7, 9);
    var upperOrLowerRackCurrent = currentLocation.slice(3, 4);
    var columnIntCurrent = parseInt(shelfCurrent, 10);
    var rowIntCurrent = parseInt(rowCurrent.slice(4, 6));
    var startingRowPath = '';
    var startingColumnPath = '';
    var startingLeftOrRight = '';
    var endingColumnPath = '';
  }

  var path = '';
  var sameAisle = false;
  // -----------------------------------------------------------------------------------

  // generate path to ending point.
  if (['102101', '102102'].includes(rowDestination)) {
    aislePathDestination = rowPathLocation[0];
  } else if (['102103', '102104'].includes(rowDestination)) {
    aislePathDestination = rowPathLocation[1];
  } else if (['102105', '102106', '102201'].includes(rowDestination)) {
    aislePathDestination = rowPathLocation[2];
  } else if (
    ['102107', '102108', '102202', '102203'].includes(rowDestination)
  ) {
    aislePathDestination = rowPathLocation[3];
  } else if (
    ['102109', '102110', '102204', '102205'].includes(rowDestination)
  ) {
    aislePathDestination = rowPathLocation[4];
  } else if (
    ['102111', '102112', '102206', '102207'].includes(rowDestination)
  ) {
    aislePathDestination = rowPathLocation[5];
  } else if (
    ['102113', '102114', '102208', '102209'].includes(rowDestination)
  ) {
    aislePathDestination = rowPathLocation[6];
  } else if (
    ['102115', '102116', '102210', '102211'].includes(rowDestination)
  ) {
    aislePathDestination = rowPathLocation[7];
  }

  //find column path to ending point
  if (['102116', '102211'].includes(rowDestination)) {
    if (upperOrLowerRackDestination === '1') {
      columnPathDestination = sdru[columnIntDestination - 1];
      endingColumnPath = cspsru[columnIntDestination - 1];
    } else {
      columnPathDestination = sdrl[columnIntDestination - 1];
      endingColumnPath = cspsrl[columnIntDestination - 1];
    }
  } else {
    if (upperOrLowerRackDestination === '1') {
      // Check rack right side and upper
      if (
        [
          '102102',
          '102104',
          '102106',
          '102108',
          '102110',
          '102112',
          '102114',
        ].includes(rowDestination)
      ) {
        columnPathDestination = cdru[columnIntDestination - 1];
        endingColumnPath = cspru[columnIntDestination - 1];
      } else {
        columnPathDestination = cdlu[columnIntDestination - 1];
        endingColumnPath = csplu[columnIntDestination - 1];
      }
    } else {
      // Check rack right side and lower
      if (rowDestination === '102201') {
        if (columnIntDestination <= 4) {
          columnPathDestination = cdrl[columnIntDestination - 1];
          endingColumnPath = csprl[columnIntDestination - 1];
        } else {
          console.log("Don't have location that you want to go.");
        }
      } else if (
        ['102203', '102205', '102207', '102209'].includes(rowDestination)
      ) {
        columnPathDestination = cdrl[columnIntDestination - 1];
        endingColumnPath = csprl[columnIntDestination - 1];
      } else {
        columnPathDestination = cdll[columnIntDestination - 1];
        endingColumnPath = cspll[columnIntDestination - 1];
      }
    }
  }

  // ---------------- Find starting point -----------------------
  // Find starting row point
  if (currentLocation) {
    if (upperOrLowerRackCurrent === '1') {
      startingRowPath = `M${rowStartingPoint[rowIntCurrent - 1]}`;
    } else if (upperOrLowerRackCurrent === '2') {
      let rowIndexR = rowIntCurrent + 5;
      startingRowPath = `M${rowStartingPoint[rowIndexR - 1]}`;
    }

    // Find Starting column point
    if (['102116', '102211'].includes(rowCurrent)) {
      if (upperOrLowerRackCurrent === '1') {
        startingColumnPath = cspsru[columnIntCurrent - 1];
      } else {
        startingColumnPath = cspsrl[columnIntCurrent - 1];
      }
    } else {
      if (upperOrLowerRackCurrent === '1') {
        // Check rack right side and upper
        if (
          [
            '102102',
            '102104',
            '102106',
            '102108',
            '102110',
            '102112',
            '102114',
          ].includes(rowCurrent)
        ) {
          startingColumnPath = cspru[columnIntCurrent - 1];
        } else {
          startingColumnPath = csplu[columnIntCurrent - 1];
        }
      } else {
        // Check rack right side and lower
        if (rowCurrent === '102201') {
          if (columnIntCurrent <= 4) {
            startingColumnPath = csprl[columnIntCurrent - 1];
          } else {
            console.log('Rack column has 4 column.');
          }
        } else if (
          ['102203', '102205', '102207', '102209'].includes(rowCurrent)
        ) {
          startingColumnPath = csprl[columnIntCurrent - 1];
        } else {
          startingColumnPath = cspll[columnIntCurrent - 1];
        }
      }
    }

    // Check starting point is left side or right side
    if (
      [
        '102102',
        '102104',
        '102106',
        '102108',
        '102110',
        '102112',
        '102114',
        '102116',
        '102201',
        '102203',
        '102205',
        '102207',
        '102209',
        '102211',
      ].includes(rowCurrent)
    ) {
      startingLeftOrRight = 'h-15.3';
    } else {
      startingLeftOrRight = 'h15.3';
    }

    // ------------------ End of find starting point -----------------------

    // check same aisle or same row
    if (
      (['102101', '102102'].includes(rowCurrent) &&
        ['102201', '102202'].includes(rowDestination)) ||
      (['102103', '102104'].includes(rowCurrent) &&
        ['102103', '102104'].includes(rowDestination)) ||
      (['102105', '102106'].includes(rowCurrent) &&
        ['102105', '102106'].includes(rowDestination)) ||
      (['102107', '102108'].includes(rowCurrent) &&
        ['102107', '102108'].includes(rowDestination)) ||
      (['102109', '102110'].includes(rowCurrent) &&
        ['102109', '102110'].includes(rowDestination)) ||
      (['102111', '102112'].includes(rowCurrent) &&
        ['102111', '102112'].includes(rowDestination)) ||
      (['102113', '102114'].includes(rowCurrent) &&
        ['102113', '102114'].includes(rowDestination)) ||
      (['102115', '102116'].includes(rowCurrent) &&
        ['102115', '102116'].includes(rowDestination)) ||
      (['102202', '102203'].includes(rowCurrent) &&
        ['102202', '102203'].includes(rowDestination)) ||
      (['102204', '102205'].includes(rowCurrent) &&
        ['102204', '102205'].includes(rowDestination)) ||
      (['102206', '102207'].includes(rowCurrent) &&
        ['102206', '102207'].includes(rowDestination)) ||
      (['102208', '102209'].includes(rowCurrent) &&
        ['102208', '102209'].includes(rowDestination)) ||
      (['102210', '102211'].includes(rowCurrent) &&
        ['102210', '102211'].includes(rowDestination)) ||
      (rowCurrent === '102201' && rowDestination === '102201')
    ) {
      sameAisle = true;
    } else {
      sameAisle = false;
    }

    // ------- Calculate path if starting point and ending point are same row ------------
    if (sameAisle) {
      // same aisle
      let distance = endingColumnPath - startingColumnPath;
      path = `${startingRowPath},${startingColumnPath} ${startingLeftOrRight} v${distance}`;
    } else if (
      (['102105', '102106'].includes(rowCurrent) &&
        rowDestination === '102201') ||
      (['102107', '102108'].includes(rowCurrent) &&
        ['102202', '102203'].includes(rowDestination)) ||
      (['102109', '102110'].includes(rowCurrent) &&
        ['102204', '102205'].includes(rowDestination)) ||
      (['102111', '102112'].includes(rowCurrent) &&
        ['102206', '102207'].includes(rowDestination)) ||
      (['102113', '102114'].includes(rowCurrent) &&
        ['102208', '102209'].includes(rowDestination)) ||
      (['102115', '102116'].includes(rowCurrent) &&
        ['102210', '102211'].includes(rowDestination))
    ) {
      // opposite row
      path = `${startingRowPath},${startingColumnPath} ${startingLeftOrRight} ${middleWalkWay} v${columnPathDestination}`;
    } else {
      path = `${startingRowPath},${startingColumnPath} ${startingLeftOrRight} ${middleWalkWay} ${aislePathDestination} v${columnPathDestination}`;
    }

    // Check ending point is left or right side
    if (
      [
        '102102',
        '102104',
        '102106',
        '102108',
        '102110',
        '102112',
        '102114',
        '102116',
        '102201',
        '102203',
        '102205',
        '102207',
        '102209',
        '102211',
      ].includes(rowDestination)
    ) {
      path = `${path} h15.3`;
    } else {
      path = `${path} h-15.3`;
    }
  } else {
    // if don't have value in currentLocation, the path will starting from lift area.
    // check ending point is left or right side.
    if (
      [
        '102102',
        '102104',
        '102106',
        '102108',
        '102110',
        '102112',
        '102114',
        '102116',
        '102201',
        '102203',
        '102205',
        '102207',
        '102209',
        '102211',
      ].includes(rowDestination)
    ) {
      path = `${startingFromLift} ${middleWalkWay} ${aislePathDestination} v${columnPathDestination} h15.3`;
    } else {
      path = `${startingFromLift} ${middleWalkWay} ${aislePathDestination} v${columnPathDestination} h-15.3`;
    }
  }

  return (
    <svg>
      <path
        id='Path'
        data-name='Path'
        className='cls-14'
        d={path}
        transform='translate(-2731.969 -999.037)'
      />
    </svg>
  );
};

export default GeneratePath;
