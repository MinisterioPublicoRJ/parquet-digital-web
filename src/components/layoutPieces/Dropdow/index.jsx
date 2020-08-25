import React, { useRef } from 'react';

import './styles.css';
import detectOutsideClick from './detectedOutsideClick';
import Alerts from '../../../dashboard/sections/Alerts';

function Dropdow() {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = detectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  return (
    <div className="container">
      <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span className="arrow-dropdow" />
        </button>
        <div
          ref={dropdownRef}
          className={`menu ${isActive ? 'active' : 'inactive'}`}
          //className="box-alerts-dropdow"
        >
          <Alerts />
        </div>
      </div>
    </div>
  );
}

export default Dropdow;
