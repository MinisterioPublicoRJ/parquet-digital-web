import React from 'react';

export default function pinAmarelo({ x, y, width, height }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || '27.168'}
      height={height || '20.836'}
      viewBox="0 0 33 33"
      x={x - 15}
      y={y - 15}
    >
      <path
        fill="#F8BD6C"
        d="M23.337 19.876l-9.92 12.389-10.43-12a11.903 11.903 0 01-.324-15.39 13.447 13.447 0 0118.219-2.34c.783.567 1.5 1.22 2.133 1.95a11.91 11.91 0 01.322 15.391z"
      />
    </svg>
  );
}
