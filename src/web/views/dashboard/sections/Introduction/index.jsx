/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useEventListener from './useEventListener';
import {
  introOuter,
  textDiv,
  btnsIntroduction,
  transparentDiv,
  btnIntroductionPrevious,
  btnIntroductionNext,
  btnLeave
} from './introduction.module.css';
import {baseGrid} from '../../pages/PipAndTutela.module.css';
import {pipGrid} from '../../pages/pip/Pip.module.css';
import {tutelaGrid} from '../../pages/tutela/Tutela.module.css';

import { PIP_GRID, TUTELA_GRID } from './introductionConstants';

const propTypes = {
  close: PropTypes.func.isRequired,
  type: PropTypes.number.isRequired,
};

function Introduction({ type, close }) {
  const show = (type === 1 || type === 2);
  const [currentPage, setCurrentPage] = useState(0);
  const pages = type === 1 ? TUTELA_GRID : PIP_GRID;

  function handleNav(movement) {
    if (movement === 'forward') {
      if (pages.length > currentPage + 1) {
        setCurrentPage(prevValue => prevValue + 1);
      } else {
        close();
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
    if (event.key === 'Escape' || event.keyCode === 27) close();
  }

  useEventListener('keydown', handleKeyPress);

  if (show) {
    return (
      <div onClick={close} role="button" tabIndex='0' onKeyDown={handleKeyPress} className={[introOuter, baseGrid, type === 1 ? tutelaGrid : pipGrid]}>
        <div onClick={(e) => e.stopPropagation()} role="button" tabIndex='0' onKeyDown={handleKeyPress} style={{ gridArea: pages[currentPage].focus }} className={transparentDiv}>
          <div className={[textDiv, pages[currentPage].class]}>
            {pages[currentPage].component}
            <div className={btnsIntroduction}>
              <button className={btnLeave} type="button" aria-label="Fechar"
               onClick={close}
               onKeyDown={close}>
                Sair
              </button>
              {currentPage ? (
                <button
                  onClick={() => handleNav('backward')}
                  type="button"
                  className={btnIntroductionPrevious}
                >
                  Anterior
                </button>
              ) : null}
              <button
                onClick={() => handleNav('forward')}
                className={btnIntroductionNext}
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
