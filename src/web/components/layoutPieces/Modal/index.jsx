/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import './styles.css';

const propTypes = {
  children: PropTypes.node,
  previousElement: PropTypes.node,
};

// children can be undefined if Modal is not open yet
const defaultProps = { children: undefined };

/**
 * Prevent close when click in the div.innerWrapper
 */
function handleInnerClick(e) {
  e.stopPropagation();
}

const TabTrap = (e, handleClose, previousElement) => {
  if (e.key === 'Escape') {
    handleClose(previousElement);
    return;
  }
  if (e.key !== 'Tab') return;

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

export default function Modal({ children, close, previousElement, withExitButton }) {
  useEffect(() => {
    document.querySelector('.modal-outer').focus();
  }, []);

  function handleClose(element) {
    if (element) element.focus();
    close();
  }

  return ReactDom.createPortal(
    <div
      className="modal-outer"
      onClick={() => handleClose(previousElement)}
      onKeyDown={(e) => TabTrap(e, handleClose, previousElement)}
      role="button"
      tabIndex="0"
    >
      {/* this next div serves only to stop propagating click ( parent outer div closes the modal, but inner div clicks shouldn't) */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        onClick={(e) => handleInnerClick(e)}
        onKeyDown={() => null}
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
