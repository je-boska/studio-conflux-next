import React from 'react';
import useMediaQuery from '../hooks/useMediaQuery';

export default function HeroFilter() {
  const isLargerThanMd = useMediaQuery(768);

  return (
    <>
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id='wavy' filterUnits='userSpaceOnUse' x='0' y='0'>
            <feTurbulence
              id='wave-animation'
              numOctaves='2'
              seed='19'
              baseFrequency='0.02 0.0645034'
            ></feTurbulence>
            <feDisplacementMap
              scale={!isLargerThanMd ? '8' : '12'}
              in='SourceGraphic'
            ></feDisplacementMap>
          </filter>
          <animate
            attributeName='baseFrequency'
            xlinkHref='#wave-animation'
            dur='20s'
            keyTimes='0;0.5;1'
            values='0.2 0.04;0.2 0.07;0.2 0.04'
            repeatCount='indefinite'
          ></animate>
        </defs>
      </svg>
    </>
  );
}
