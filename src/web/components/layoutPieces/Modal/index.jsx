/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
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

const TabTrap = (e, close) => {

  if (e.key === 'Escape') {
    close();
    return;
  }
  if (e.key !== 'Tab') return

  const focusableModalElements = document
    .querySelector('#portal')
    .querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [role="button"]');

  const firstElement = focusableModalElements[0];
  const lastElement = focusableModalElements[focusableModalElements.length - 1];

  if (!e.shiftKey && document.activeElement === lastElement) {

    firstElement.focus();
    e.preventDefault();
    return;
  }
  if (e.shiftKey && document.activeElement === firstElement) {

    lastElement.focus();
    e.preventDefault();
  }
};

export default function Modal({ children, close }) {
  useEffect(() => {
    document.querySelector('.modal-outer').focus();
  }, []);

  return ReactDom.createPortal(
    <div
      className="modal-outer"
      onClick={() => close()}
      onKeyDown={(e) => TabTrap(e, close)}
      role="button"
      tabIndex="0"
    >
      {/* this next div serves only to stop propagating click ( parent outer div closes the modal, but inner div clicks shouldn't) */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        onClick={(e) => handleInnerClick(e)}
        onKeyDown={(e) => TabTrap(e, close)}
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
