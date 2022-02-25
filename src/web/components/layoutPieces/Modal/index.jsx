import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import './styles.css';

const propTypes = {
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

export default function Modal({ children, close }) {
  return ReactDom.createPortal(
    <div
      className="modal-outer"
      onClick={() => close()}
      onKeyDown={() => close()}
      role="button"
      tabIndex="0"
    >
      {/* this next div serves only to stop propagating click ( parent outer div closes the modal, but inner div clicks shouldn't) */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        onClick={(e) => handleInnerClick(e)}
        onKeyDown={(e) => handleInnerClick(e)}
        className="modal-innerWrapper"
      >
        {children}
      </div>
    </div>,
    document.querySelector('#portal'),
  );
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
