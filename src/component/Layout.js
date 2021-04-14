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

const Layout = ({ rackLocation, currentLocation, isCheckingZone, isOutGate }) => {
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
            {(isCheckingZone) ? <g id="Path_11" data-name="Path 11" class="cls-14" transform="translate(460 565)">
              <path class="cls-14" d="M0,0H275.431V85.6H0Z"/>
              <path class="cls-14" d="M 4.999969482421875 4.999992370605469 L 4.999969482421875 80.59906768798828 L 270.4310913085938 80.59906768798828 L 270.4310913085938 4.999992370605469 L 4.999969482421875 4.999992370605469 M -3.0517578125e-05 -7.62939453125e-06 L 275.4310913085938 -7.62939453125e-06 L 275.4310913085938 85.59906768798828 L -3.0517578125e-05 85.59906768798828 L -3.0517578125e-05 -7.62939453125e-06 Z"/>
            </g> : <g id="Path_11" data-name="Path 11" class="cls-4" transform="translate(460 565)">
              <path class="cls-13" d="M0,0H275.431V85.6H0Z"/>
              <path class="cls-9" d="M 4.999969482421875 4.999992370605469 L 4.999969482421875 80.59906768798828 L 270.4310913085938 80.59906768798828 L 270.4310913085938 4.999992370605469 L 4.999969482421875 4.999992370605469 M -3.0517578125e-05 -7.62939453125e-06 L 275.4310913085938 -7.62939453125e-06 L 275.4310913085938 85.59906768798828 L -3.0517578125e-05 85.59906768798828 L -3.0517578125e-05 -7.62939453125e-06 Z"/>
            </g>}
            
            <text id="Checking_Zone" data-name="Checking Zone" class="cls-5" transform="translate(550 615)"><tspan x="0" y="0">CHECKING ZONE</tspan></text>
            <text id="IN" data-name="IN" class="cls-5" transform="translate(369 625)"><tspan x="0" y="0">IN</tspan></text>
            <text id="OUT" data-name="OUT" class="cls-5" transform="translate(1041 625)"><tspan x="0" y="0">OUT</tspan></text>

            <text id="A" class="cls-7" transform="translate(369 73)"><tspan x="0" y="0">A</tspan></text>
            <text id="B" class="cls-7" transform="translate(476 73)"><tspan x="0" y="0">B</tspan></text>
            <text id="C" class="cls-7" transform="translate(538 73)"><tspan x="0" y="0">C</tspan></text>
            <text id="D" class="cls-7" transform="translate(643 73)"><tspan x="0" y="0">D</tspan></text>
            <text id="E" class="cls-7" transform="translate(703 73)"><tspan x="0" y="0">E</tspan></text>
            <text id="F" class="cls-7" transform="translate(810 73)"><tspan x="0" y="0">F</tspan></text>
            <text id="G" class="cls-7" transform="translate(870 73)"><tspan x="0" y="0">G</tspan></text>
            <text id="H" class="cls-7" transform="translate(977 73)"><tspan x="0" y="0">H</tspan></text>
            <text id="I" class="cls-7" transform="translate(1041 73)"><tspan x="0" y="0">I</tspan></text>
            <text id="J" class="cls-7" transform="translate(1145 73)"><tspan x="0" y="0">J</tspan></text>


            {/* Create Path */}
            {(
              <GeneratePath
              destination={rackLocation}
              currentLocation={currentLocation}
              isOutGate={isOutGate}
              isCheckingZone={isCheckingZone}
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

            <line id="Line_4" data-name="Line 4" class="line" y2="574.93" transform="translate(320 50.5)"/>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Layout;
