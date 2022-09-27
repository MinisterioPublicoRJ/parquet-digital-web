import React from 'react';

function UserManualIcon({ fill }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 30 30">
      <mask
        id="mask0_3_535"
        style={{ maskType: 'alpha' }}
        width="30"
        height="30"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill={fill || '#fff'} d="M0 0H30V30H0z" />
      </mask>
      <g mask="url(#mask0_3_535)">
        <path
          fill={fill || '#fff'}
          d="M10 22.5h10V20H10v2.5zm0-5h10V15H10v2.5zm-2.5 10a2.407 2.407 0 01-1.765-.734A2.408 2.408 0 015 25V5c0-.688.245-1.276.735-1.766A2.406 2.406 0 017.5 2.5h10L25 10v15a2.41 2.41 0 01-.734 1.766 2.41 2.41 0 01-1.766.734h-15zm8.75-16.25V5H7.5v20h15V11.25h-6.25z"
        />
      </g>
    </svg>
  );
}

export default UserManualIcon;
