import React from 'react';

export default function MarkSlower({ x, y, width, height }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || '30.358'}
      height={height || '30.357'}
      viewBox="0 0 30.358 30.357"
      x={x ? x - 15 : null}
      y={y ? y - 15 : null}
    >
      <g transform="translate(0)">
        <ellipse
          className="a"
          cx="12.499"
          cy="12.499"
          rx="12.499"
          ry="12.499"
          transform="translate(2.672 2.678)"
          fill="#ffff"
        />
        <path
          fill="#8A63D3"
          className="b"
          d="M958.642,680.643a16.4,16.4,0,0,0-1.642.089,15.179,15.179,0,1,0,1.642-.089Zm0,25a9.821,9.821,0,1,1,0-19.642,6.826,6.826,0,0,1,1.215.089,9.814,9.814,0,0,1-1.215,19.553Z"
          transform="translate(-943.463 -680.643)"
        />
        <g transform="translate(10.193 10.2)">
          <ellipse className="b" cx="4.978" cy="4.978" rx="4.978" ry="4.978" fill="#8A63D3" />
        </g>
      </g>
    </svg>
  );
}
