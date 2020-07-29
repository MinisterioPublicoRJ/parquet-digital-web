import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

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
        <div className="modal-innerWrapper">{children}</div>
        <h1>Sou eu!!!!!!!</h1>
      </div>
    );
  }

  return null;
}

Modal.propTypes = propTypes;
export default Modal;
