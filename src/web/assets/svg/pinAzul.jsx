import React from 'react';

export default function pinAzul({ width, height }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || '27.168'}
      height={height || '20.836'}
      viewBox="0 0 27.168 20.836"
    >
      <defs>
        <linearGradient
          id="a"
          x1="-19.523"
          y1="11.656"
          x2="-19.445"
          y2="11.656"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#5d88ee" />
          <stop offset="0.441" stopColor="#549ee9" />
          <stop offset="1" stopColor="#4cb7e5" />
        </linearGradient>
      </defs>
      <path
        fill="#56E8E1"
        className="a"
        d="M409.117,764.642l-7.95,10.434L392.8,764.968a10.417,10.417,0,0,1-.259-12.956h0a10.419,10.419,0,0,1,16.314-.327h0A10.423,10.423,0,0,1,409.117,764.642Z"
        transform="translate(-747.908 411.249) rotate(-90)"
      />
    </svg>
  );
}
