import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import IntroductionResume from './introductionResume';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  type: PropTypes.number.isRequired,
};

/**
 * Prevent close when click in the div.innerWrapper
 */
function handleInnerClick(e) {
  e.stopPropagation();
}

function Introduction({ isOpen, onToggle, type }) {
  const pages = [<IntroductionResume />];
  const [currentPage, setCurrentPage] = useState(0);

  if (isOpen) {
    return (
      <div className={`intro-outer base-grid ${type === 1 ? 'tutela-grid' : 'pip-grid'}`}>
        <div style={{ gridArea: 'today' }} className="transparent-div" />
        <div className="text-div">
          {/* pages[currentPage] */}
          <p>teste blablabla</p>
          <button type="button" aria-label="Fechar" onClick={onToggle}>
            Sair
          </button>
          <button type="button">Próximo</button>
        </div>
      </div>
    );
  }

  return null;
}

export default Introduction;
Introduction.propTypes = propTypes;
