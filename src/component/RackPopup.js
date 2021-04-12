import React from 'react';
import '../css/RackPopup.css';
/* 
This function is generating a layout of Rack by condition of 
isPopup(อาจจะใช้ค่อยคิดตัวแปรอีกที) in handlePopup
*/
const Popup = ({ floorRack, row, isPopUp }) => {
  const rackRightSide = [
    '102109',
    '102110',
    '102111',
    '102112',
    '102113',
    '102114',
    '102115',
    '102116',
    '102204',
    '102205',
    '102206',
    '102207',
    '102208',
    '102209',
    '102210',
    '102211',
  ];

  console.log([rackRightSide].includes(row))
  return (
    <>
      {isPopUp && (
        <div
          className={`popup-wrapper-${
            [rackRightSide].includes(row) ? 'left' : 'right'
          }`}
        >
          <svg
            className={`popup-item-${
              [rackRightSide].includes(row) ? 'left' : 'right'
            }`}
            width='42%'
            viewBox='0 0 550 642'
            fill='#4b9e8550'
          >
            <g
              id='Web_1920_32'
              data-name='Web 1920 – 32'
              className='cls-1'
              fill='#ffffff00'
            >
              <rect
                className='rec-4'
                width='550'
                height='100%'
                fill='#2ae2b4'
                rx='50px'
                opacity='0.75'
              />
              <g
                id='Group_20'
                data-name='Group 20'
                transform='translate(145 60)'
              >
                <rect
                  id='Rectangle_2922'
                  data-name='Rectangle 2922'
                  className='rec-2'
                  width='22'
                  height='554'
                  fill='#498574'
                  transform='translate(0.47)'
                />
                <rect
                  id='Rectangle_2923'
                  data-name='Rectangle 2923'
                  className='rec-2'
                  width='27'
                  height='554'
                  fill='#498574'
                  transform='translate(228.47)'
                />
                <rect
                  id='Rectangle_2924'
                  data-name='Rectangle 2924'
                  className='rec-2'
                  width='27'
                  height='255'
                  fill='#498574'
                  transform='translate(0.47 27) rotate(-90)'
                />
                <rect
                  id='Rectangle_2925'
                  data-name='Rectangle 2925'
                  className='rec-2'
                  width='27'
                  height='255'
                  fill='#498574'
                  transform='translate(0.47 215) rotate(-90)'
                />
                <rect
                  id='Rectangle_2926'
                  data-name='Rectangle 2926'
                  className='rec-2'
                  width='27'
                  height='255'
                  fill='#498574'
                  transform='translate(0.47 403) rotate(-90)'
                />
              </g>
              <rect
                id='03'
                data-name='03'
                className={floorRack === '03' ? 'blink' : 'rec-6'}
                width='190'
                height='116'
                transform='translate(176 130)'
              />
              <rect
                id='02'
                data-name='02'
                className={floorRack === '02' ? 'blink' : 'rec-6'}
                width='190'
                height='116'
                transform='translate(176 317)'
              />
              <rect
                id='01'
                data-name='01'
                className={floorRack === '01' ? 'blink' : 'rec-6'}
                width='190'
                height='116'
                transform='translate(176 498)'
              />
            </g>
          </svg>
        </div>
      )}
    </>
  );
};

export default Popup;
