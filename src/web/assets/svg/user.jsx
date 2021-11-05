import React from 'react';

export default function User({ height, width }) {
    return (

        <svg width={width || '25'} height={height || '25'} viewBox="0 0 46.108 46.108" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" className="a" d="M39.355,6.752a23.054,23.054,0,0,0-32.6,32.6,23.054,23.054,0,0,0,32.6-32.6Zm-27.8,33.087a11.674,11.674,0,0,1,22.993,0,20.308,20.308,0,0,1-22.993,0ZM15.723,20.16a7.33,7.33,0,1,1,7.33,7.33,7.338,7.338,0,0,1-7.33-7.33Zm21.167,17.8a14.4,14.4,0,0,0-8.37-9.4,10.032,10.032,0,1,0-10.932,0,14.4,14.4,0,0,0-8.37,9.4,20.352,20.352,0,1,1,27.673,0Zm0,0" transform="translate(0.001)" />
        </svg>
    );
}