import React from 'react';

function EditNoteIcon({ fill }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none" viewBox="0 0 35 35">
      <mask
        id="mask0_3_538"
        style={{ maskType: 'alpha' }}
        width="35"
        height="35"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill={fill || '#fff'} d="M0 0H35V35H0z" />
      </mask>
      <g mask="url(#mask0_3_538)">
        <path
          fill={fill || '#fff'}
          d="M29.349 21.875l-3.099-3.099 1.057-1.057c.268-.268.608-.401 1.021-.401.413 0 .754.133 1.021.4l1.057 1.058c.268.267.401.608.401 1.02 0 .414-.133.754-.4 1.022l-1.058 1.057zM17.5 30.625v-3.099l7.73-7.73 3.098 3.1-7.729 7.729H17.5zM4.375 23.333v-2.916h10.208v2.916H4.375zm0-5.833v-2.917h16.042V17.5H4.375zm0-5.833V8.75h16.042v2.917H4.375z"
        />
      </g>
    </svg>
  );
}

export default EditNoteIcon;
