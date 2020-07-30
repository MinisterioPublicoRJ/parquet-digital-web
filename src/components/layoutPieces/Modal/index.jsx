import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

/**
 * Prevent close when click in the div.innerWrapper
 */
function handleInnerClick(e) {
  e.stopPropagation();
}

function Modal({ isOpen, onToggle, children }) {
  if (isOpen) {
    return (
      <div
        className="modal-outer"
        onClick={onToggle}
        onKeyDown={onToggle}
        role="button"
        tabIndex="0"
      >
        <div
          onClick={e => handleInnerClick(e)}
          onKeyDown={e => handleInnerClick(e)}
          className="modal-innerWrapper"
        >
          {children}
        </div>
      </div>
    );
  }

  return null;
}

Modal.propTypes = propTypes;
export default Modal;
