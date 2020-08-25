import React, { useRef } from 'react';

import './styles.css';
import detectOutsideClick from './detectedOutsideClick';
import AlertBadge from '../AlertBadge';

function Dropdown() {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = detectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  return (
    <div className="container-dropdow">
      <div className="dropdow-container">
        <button type="button" onClick={onClick} className="dropdow-icon">
          <span>Clique aqui</span>
        </button>
        <AlertBadge ref={dropdownRef} className={`dropdow  ${isActive ? 'active' : 'inactive'}`} />
      </div>
    </div>
  );
}

export default Dropdown;
