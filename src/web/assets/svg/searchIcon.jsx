import React from 'react';

export default function SearchIcon({ width, height, colorFill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || '20.178'}
      height={height || '20.178'}
      viewBox="0 0 20.178 20.178"
    >
      <path
        fill={colorFill || "#35445d"}
        d="M19.932,18.746l-5.738-5.738A8,8,0,1,0,13,14.2l5.738,5.738a.841.841,0,1,0,1.189-1.189ZM7.987,14.3A6.306,6.306,0,1,1,14.293,7.99,6.312,6.312,0,0,1,7.987,14.3Z"
        transform="translate(0 -0.003)"
      />
    </svg>
  );
}
