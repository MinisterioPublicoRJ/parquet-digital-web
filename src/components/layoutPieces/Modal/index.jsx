/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const propTypes = {
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node,
};

// children can be undefined if Modal is not open yet
const defaultProps = { children: undefined };

/**
 * Prevent close when click in the div.innerWrapper
 */
function handleInnerClick(e) {
  e.stopPropagation();
}

function Modal({ onToggle, children }) {
  return (
    <div className="modal-outer" onClick={onToggle} onKeyDown={onToggle} role="button" tabIndex="0">
      {/* this div needs refactoring! */}
      <div
        onClick={(e) => handleInnerClick(e)}
        onKeyDown={(e) => handleInnerClick(e)}
        className="modal-innerWrapper"
      >
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
export default Modal;
