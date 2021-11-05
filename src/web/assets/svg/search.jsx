import React from 'react';

export default function Search({ height, width }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || '25'}
      height={height || '25'}
      viewBox="0 0 32 32"
    >
      <g transform="translate(0 -0.003)">
        <g transform="translate(0 0.003)">
          <path
            fill="#fffff"
            d="M31.609,29.727l-9.1-9.1a12.691,12.691,0,1,0-1.885,1.885l9.1,9.1a1.333,1.333,0,1,0,1.885-1.885ZM12.667,22.669a10,10,0,1,1,10-10A10.01,10.01,0,0,1,12.667,22.669Z"
            transform="translate(0 -0.003)"
          />
        </g>
      </g>
    </svg>
  );
}
