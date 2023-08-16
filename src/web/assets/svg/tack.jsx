import React from 'react';

function Tack({ activated }) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19.655"
    height="19.655"
    viewBox="0 0 19.655 19.655"
  >
    <g transform="translate(-0.297 -0.297)">
      <path
        className="a"
        fill="#7b7b7b"
        d="M158.328,283.2l-.839-.839-1.678,1.678-.419,1.258,1.258-.419Z"
        transform="translate(-149.247 -271.196)"
      />
      <path
        className="b"
        fill="#c4c4c4"
        d="M13.768,324.788l-5.675,5.675a2.025,2.025,0,0,0-.593,1.432,2.025,2.025,0,0,0,1.432-.593l5.675-5.675Z"
        transform="translate(-7.203 -311.944)"
      />
      <path
        className="c"
        fill={activated ? '#31a7e0' : '#b9b9b9'}
        d="M459.359,129.4l-.839-.839-.839.839.839.839a.593.593,0,1,0,.839-.839Z"
        transform="translate(-439.581 -123.482)"
      />
      <path
        className="c"
        fill={activated ? '#31a7e0' : '#b9b9b9'}
        d="M342.241,13.126a.593.593,0,0,0,0-.839l-4.614-4.614a.593.593,0,1,0-.839.839l.839.839.419,2.936,3.356.839A.593.593,0,0,0,342.241,13.126Z"
        transform="translate(-323.303 -7.203)"
      />
      <path
        className="c"
        fill={activated ? '#31a7e0' : '#b9b9b9'}
        d="M264.612,129.4l-.839-.839-7.111,5.013,3.436.92Z"
        transform="translate(-246.513 -123.482)"
      />
      <path
        className="c"
        fill={activated ? '#31a7e0' : '#b9b9b9'}
        d="M238.5,54.32l-5.094,4.513.92,3.436,2.6.081,4.513-5.094Z"
        transform="translate(-224.18 -52.172)"
      />
      <path
        className="c"
        fill={activated ? '#31a7e0' : '#b9b9b9'}
        d="M285.08,258.211l-.839-.839-1.569,5.6.839.839A5.929,5.929,0,0,0,285.08,258.211Z"
        transform="translate(-271.493 -247.194)"
      />
      <path
        className="c"
        fill={activated ? '#31a7e0' : '#b9b9b9'}
        d="M101.041,169.258a5.914,5.914,0,0,1-1.737,4.213l-7.55-7.55a5.929,5.929,0,0,1,5.6-1.569l3.517,3.517A5.979,5.979,0,0,1,101.041,169.258Z"
        transform="translate(-88.125 -157.691)"
      />
    </g>
  </svg>
}

export default Tack;
