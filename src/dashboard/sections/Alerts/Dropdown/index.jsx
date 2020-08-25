import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './styles.css';
// import detectOutsideClick from './detectedOutsideClick';
// import AlertBadge from '../AlertBadge';
const propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  type: PropTypes.string.isRequired,
};

function Dropdown({ list, type }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>{`I'm always visible! My type is ${type}`}</div>
      {isOpen && list.map((alert, i) => <div>{`I'm child alert number ${i}`}</div>)}
    </div>
  );
  // const dropdownRef = useRef(null);
  // const [isActive, setIsActive] = detectOutsideClick(dropdownRef, false);
  // const onClick = () => setIsActive(!isActive);
  //
  // return (
  //   <div className="container-dropdow">
  //     <div className="dropdow-container">
  //       <button type="button" onClick={onClick} className="dropdow-icon">
  //         <span>Clique aqui</span>
  //       </button>
  //       <AlertBadge ref={dropdownRef} className={`dropdow  ${isActive ? 'active' : 'inactive'}`} />
  //     </div>
  //   </div>
  // );
}

Dropdown.propTypes = propTypes;
export default Dropdown;
