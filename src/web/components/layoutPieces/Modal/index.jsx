/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import {
  modalOuter,
  modalTransparent,
  modalInnerWrapper,
  modalUnpositioned,
  modalClose,
  modalCloseMobile,
  modalCloseAnimated
} from './Modal.module.css';

const propTypes = {
  children: PropTypes.node,
  previousElement: PropTypes.node,
  unpositioned: PropTypes.bool,
  withExitButton: PropTypes.bool,
  exitButtonInMobile: PropTypes.bool,
  transparent: PropTypes.bool,
  close: PropTypes.func.isRequired,
  inner: PropTypes.bool,
};

// children can be undefined if Modal is not open yet
const defaultProps = {
  children: undefined,
  previousElement: undefined,
  unpositioned: undefined,
  withExitButton: undefined,
  exitButtonInMobile: undefined,
  transparent: undefined,
  inner: false,
};

/**
 * Prevent close when click in the div.innerWrapper
 */
function handleInnerClick(e) {
  e.stopPropagation();
}

const TabTrap = (e, handleClose) => {
  if (e.key === 'Escape') {
    handleClose();
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

export default function Modal({
  children,
  close,
  previousElement,
  withExitButton,
  exitButtonInMobile,
  inner,
  unpositioned,
  transparent,
}) {
  useEffect(() => {
    document.querySelector(`.${modalOuter}`).focus();
    disabledBodyScrolling();
  }, []);

  function handleClose() {
    if (previousElement) previousElement.focus();
    defaultBodyScrolling();
    close();
  }

  /* 
    Para desabilitar o scroll da página inicial quando o modal é aberto,
    mantendo o scroll apenas dentro do modal.
  */
  const disabledBodyScrolling = () => {
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
  };

  // Para voltar os valores padrões da página inicial, quando o modal é fechado.
  const defaultBodyScrolling = () => {
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
  };

  const modalContent = (
    <div
      className={[modalOuter, transparent ? modalTransparent : null].join(' ')}
      onClick={() => handleClose()}
      onKeyDown={(e) => TabTrap(e, handleClose)}
      role="button"
      tabIndex="0"
    >
      {/* this next div serves only to stop propagating click ( parent outer div closes the modal, but inner div clicks shouldn't) */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        onClick={(e) => handleInnerClick(e)}
        onKeyDown={() => null}
        className={[modalInnerWrapper, unpositioned ? modalUnpositioned : null].join(' ')}
      >
        {children}
        {(withExitButton || exitButtonInMobile) && (
          <button
            type="button"
            className={`${modalClose} ${exitButtonInMobile ? modalCloseMobile : null} ${modalCloseAnimated}`} 
            aria-label="Fechar"
            onClick={handleClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        )}
      </div>
    </div>
  );

  if (inner) return modalContent;

  return ReactDom.createPortal(modalContent, document.querySelector('#portal'));
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
