import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useEventListener from './useEventListener';

import './styles.css';

import { PIP_GRID, TUTELA_GRID } from './introductionConstants';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  type: PropTypes.number.isRequired,
};

function Introduction({ isOpen, onToggle, type }) {
  const show = isOpen && (type === 1 || type === 2);
  const [currentPage, setCurrentPage] = useState(0);
  const pages = type === 1 ? TUTELA_GRID : PIP_GRID;

  function handleNav(movement) {
    if (movement === 'forward') {
      if (pages.length > currentPage + 1) {
        setCurrentPage(prevValue => prevValue + 1);
      } else if (isOpen) {
        isOpen = false;
        onToggle();
      }
    } else if (movement === 'backward') {
      if (currentPage - 1 >= 0) {
        setCurrentPage(prevValue => prevValue - 1);
      }
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'ArrowLeft' || event.keyCode === 37) handleNav('backward');
    if (event.key === 'ArrowRight' || event.keyCode === 39) handleNav('forward');
    if ((event.key === 'Escape' || event.keyCode === 27) && isOpen) onToggle();
  }

  useEventListener('keydown', handleKeyPress);

  if (show) {
    return (
      <div className={`intro-outer base-grid ${type === 1 ? 'tutela-grid' : 'pip-grid'}`}>
        <div style={{ gridArea: pages[currentPage].focus }} className="transparent-div">
          <div className={`text-div text-div--${pages[currentPage].focus}`}>
            {pages[currentPage].component}
            <div className="btns-introduction">
              <button className="btn-leave" type="button" aria-label="Fechar" onClick={onToggle}>
                Sair
              </button>
              {currentPage ? (
                <button
                  onClick={() => handleNav('backward')}
                  type="button"
                  className="btn-introduction-previous"
                >
                  Anterior
                </button>
              ) : null}
              <button
                onClick={() => handleNav('forward')}
                className="btn-introduction-next"
                type="button"
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default Introduction;
Introduction.propTypes = propTypes;
