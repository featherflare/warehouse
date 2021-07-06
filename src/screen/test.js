import '../css/test.css';
import React from 'react';

const test = () => {
  return (
    <div>
      <svg width='20%' height='20%' viewBox='0 0 281 189.79'>
        <defs>
          <linearGradient
            id='linear-gradient'
            x1='14.24'
            y1='36.74'
            x2='285.42'
            y2='110.38'
            gradientUnits='userSpaceOnUse'
          >
            <stop offset='0' stop-color='#60b176' />
            <stop offset='1' stop-color='#50a4a1' />
          </linearGradient>
          <linearGradient
            id='linear-gradient-2'
            x1='6.37'
            y1='113.72'
            x2='281.38'
            y2='188.39'
            gradientUnits='userSpaceOnUse'
          >
            <stop offset='0' stop-color='#50a4a1' stop-opacity='0.8' />
            <stop offset='1' stop-color='#60b176' stop-opacity='0.4' />
          </linearGradient>
        </defs>
        <g id='Layer_2' data-name='Layer 2'>
          <path
            fill='url(#linear-gradient)'
            d='M281,0V169.88s-27.75,8.51-82.9,8.51S57.89,161.37,0,139.92V0Z'
          />
          <path
            fill='url(#linear-gradient-2)'
            d='M0,143.37s105.17,46.76,281,46.42V153.54S183.51,191.15,0,137.2Z'
          />
        </g>
      </svg>
    </div>
  );
};

export default test;
