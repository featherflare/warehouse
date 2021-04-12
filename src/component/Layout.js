import React from 'react';
import Rack from './Rack';
import { rackData } from '../data/RackData';
import GeneratePath from './GeneratePath';
import '../css/Layout.css';

/* 
This function is generating a layout of warehouse from rackData (array object).
And receive the data to change rack to blink.

It's call Generate Path to generate path for user to walk to the rack.

---- data (variable) ----
Recieve rackLocation variable in type of String(XXXXXX-XX).

Then return a whole layout of warehouse and path way to walk to rack.

Updated 09-02-2021 - Aum
*/

const Layout = ({ rackLocation, currentLocation }) => {
  return (
    <div className='layout'>
      <svg width='100%' height='100%'  viewBox='0 0 1400 670'>
        <g id='layout' data-name='layout' className='cls-1'>
          {/* Whole area */}
          <rect className='cls-13' width='1340' height='672' />
          <rect
            id='Rectangle_693'
            data-name='Rectangle 693'
            className='cls-2'
            width='1360'
            height='672'
            rx='23'
            transform='translate(14 0)'
          />
          <g transform='translate(50 0)'>
            {/* Checking zone */}
            <g
              id='CHECKING_ZONE'
              data-name='CHECKING_ZONE'
              className='cls-3'
              transform='translate(77 331)'
              >
              <rect className='cls-11' width='42' height='85' />
              <rect className='cls-12' x='4' y='4' width='34' height='77' />
            </g>
            <text
              id='CHECKING'
              className='cls-5'
              transform='translate(102 404) rotate(-90)'
              >
              <tspan x='0' y='0'>
                CHECKING
              </tspan>
            </text>

            {/* Special zone */}
            <g
              id='SPECIAL_ZONE'
              data-name='SPECIAL_ZONE'
              className='cls-3'
              transform='translate(229 381)'
              >
              <rect className='cls-11' width='243' height='126' />
              <rect className='cls-12' x='4' y='4' width='235' height='118' />
            </g>
            <text
              id='SPECIAL_ZONE'
              data-name='SPECIAL ZONE'
              className='cls-4'
              transform='translate(279 451)'
              >
              <tspan x='0' y='0'>
                SPECIAL ZONE
              </tspan>
            </text>
            <g
              id='SPECIAL_ZONE'
              data-name='SPECIAL_ZONE'
              className='cls-3'
              transform='translate(229 381)'
              ></g>

            {/* Packing zone */}
            <g
              id='PACKING_ZONE'
              data-name='PACKING_ZONE'
              className='cls-3'
              transform='translate(77 416)'
              >
              <rect className='cls-11' width='42' height='87' />
              <rect className='cls-12' x='4' y='4' width='34' height='79' />
            </g>
            <text
              id='PACKING'
              className='cls-5'
              transform='translate(102 485) rotate(-90)'
              >
              <tspan x='0' y='0'>
                PACKING
              </tspan>
            </text>

            {/* Stair */}
            <rect
              id='Rectangle_681'
              data-name='Rectangle 681'
              className='cls-7'
              width='284'
              height='5'
              transform='translate(222 503)'
              />
            <rect
              id='Rectangle_683'
              data-name='Rectangle 683'
              className='cls-7'
              width='57'
              height='5'
              transform='translate(227 503) rotate(90)'
              />
            <g
              id='STAIR'
              data-name='STAIR'
              className='cls-3'
              transform='translate(227 508)'
              >
              <rect className='cls-11' width='279' height='52' />
              <rect className='cls-12' x='4' y='4' width='271' height='44' />
            </g>
            <text id='STAIR' className='cls-8' transform='translate(321 544)'>
              <tspan x='0' y='0'>
                บันได
              </tspan>
            </text>

            {/* Office zone */}
            <rect
              id='Rectangle_689'
              data-name='Rectangle 689'
              className='cls-7'
              width='85'
              height='5'
              transform='translate(34 503)'
              />
            <g
              id='OFFICE_ZONE'
              data-name='OFFICE_ZONE'
              className='cls-3'
              transform='translate(34 508)'
              >
              <rect className='cls-11' width='43' height='137' />
              <rect className='cls-12' x='4' y='4' width='35' height='129' />
            </g>
            <text
              id='OFFICE'
              className='cls-9'
              transform='translate(63 612) rotate(-90)'
              >
              <tspan x='0' y='0'>
                OFFICE
              </tspan>
            </text>

            {/* Other part */}
            <rect
              id='Rectangle_686'
              data-name='Rectangle 686'
              className='cls-10'
              width='141'
              height='94'
              transform='translate(365 560)'
              />

            {/* Elevator */}
            <rect
              id='Rectangle_684'
              data-name='Rectangle 684'
              className='cls-7'
              width='38'
              height='5'
              transform='translate(227 616) rotate(90)'
              />
            <g
              id='ELEVATOR_2'
              data-name='ELEVATOR_2'
              className='cls-3'
              transform='translate(297 616)'
              >
              <rect className='cls-11' width='68' height='38' />
              <rect className='cls-12' x='4' y='4' width='60' height='30' />
            </g>
            <g
              id='ELEVATOR_1'
              data-name='ELEVATOR_1'
              className='cls-3'
              transform='translate(227 616)'
              >
              <rect className='cls-11' width='70' height='38' />
              <rect className='cls-12' x='4' y='4' width='62' height='30' />
            </g>
            <text
              id='EV1_'
              data-name='EV1 '
              className='cls-9'
              transform='translate(243 642)'
              >
              <tspan x='0' y='0'>
                EV1
              </tspan>
            </text>
            <text
              id='EV2_'
              data-name='EV2 '
              className='cls-9'
              transform='translate(312 642)'
              >
              <tspan x='0' y='0'>
                EV2
              </tspan>
            </text>

            {/* Create Path */}
            {rackLocation && (
              <GeneratePath
              destination={rackLocation}
              currentLocation={currentLocation}
              />
              )}

            {/* Rack */}
            {rackData.map((rack) => {
              return (
                <Rack
                key={rack.id}
                {...rack}
                destination={rackLocation}
                currentLocation={currentLocation}
                />
                );
              })}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Layout;
