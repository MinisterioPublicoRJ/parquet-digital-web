import React from 'react';

export default function Bin({ fillColor, width, height }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || '14.138'}
      height={height || '17.407'}
      viewBox="0 0 14.138 17.407"
    >
      <g fill={fillColor || '#b9b9b9'} transform="translate(0.003 0.002)">
        <path
          className="a"
          d="M222.806,154.7a.408.408,0,0,0-.408.408v7.7a.408.408,0,0,0,.815,0v-7.7A.408.408,0,0,0,222.806,154.7Zm0,0"
          transform="translate(-213.335 -148.398)"
        />
        <path
          className="a"
          d="M104.806,154.7a.408.408,0,0,0-.408.408v7.7a.408.408,0,0,0,.815,0v-7.7A.408.408,0,0,0,104.806,154.7Zm0,0"
          transform="translate(-100.145 -148.398)"
        />
        <path
          className="a"
          d="M1.155,5.181V15.224a2.249,2.249,0,0,0,.6,1.551,2.008,2.008,0,0,0,1.457.63h7.713a2.007,2.007,0,0,0,1.457-.63,2.249,2.249,0,0,0,.6-1.551V5.181a1.557,1.557,0,0,0-.4-3.062H10.49v-.51A1.6,1.6,0,0,0,8.875,0H5.256a1.6,1.6,0,0,0-1.614,1.61v.51H1.554a1.557,1.557,0,0,0-.4,3.062ZM10.922,16.59H3.209A1.291,1.291,0,0,1,1.97,15.224V5.217H12.161V15.224a1.291,1.291,0,0,1-1.239,1.366ZM4.456,1.609a.785.785,0,0,1,.8-.795h3.62a.785.785,0,0,1,.8.795v.51H4.456Zm-2.9,1.325H12.577a.734.734,0,0,1,0,1.468H1.554a.734.734,0,1,1,0-1.468Zm0,0"
          transform="translate(0 0)"
        />
        <path
          className="a"
          d="M163.806,154.7a.408.408,0,0,0-.408.408v7.7a.408.408,0,0,0,.815,0v-7.7A.408.408,0,0,0,163.806,154.7Zm0,0"
          transform="translate(-156.74 -148.398)"
        />
      </g>
    </svg>
  );
}
