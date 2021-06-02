import React from 'react';

export default function ProcessDetailRobot({ height }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height={height || '28'} viewBox="0 0 24 28">
      <path
        fill="#374354"
        d="M15.09,28H4.455A4.42,4.42,0,0,1,0,23.625V8.8A4.42,4.42,0,0,1,4.455,4.43H15.09A4.42,4.42,0,0,1,19.545,8.8v14.82A4.42,4.42,0,0,1,15.09,28ZM4.455,6.617A2.21,2.21,0,0,0,2.227,8.8v14.82a2.21,2.21,0,0,0,2.227,2.187H15.09a2.21,2.21,0,0,0,2.227-2.187V8.8A2.21,2.21,0,0,0,15.09,6.617ZM24,20.891V4.375A4.42,4.42,0,0,0,19.545,0H7.183A1.1,1.1,0,0,0,6.07,1.094,1.1,1.1,0,0,0,7.183,2.188H19.545a2.21,2.21,0,0,1,2.227,2.188V20.891a1.114,1.114,0,0,0,2.227,0Zm0,0"
      />
    </svg>
  );
}