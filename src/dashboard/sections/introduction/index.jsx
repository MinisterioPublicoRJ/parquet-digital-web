import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import IntroductionResume from './introductionResume';
import IntroductionPerfomanceRadar from './IntroductionPerfomanceRadar';
import IntroductionAlerts from './IntroductionAlerts';
import IntroductionYourDesk from './IntroductionYourDesk';
import IntroductionProcessList from './introductionProcessList';
import IntroductionProcessingTime from './IntroductionProcessingTime';
import IntroductionSuccessIndicators from './introductionSuccessIndicators';
import IntroductionMainInvestigated from './IntroductionMainInvestigated';

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
  const pages = [
    { focus: 'today', component: <IntroductionResume /> },
    { focus: 'processes', component: <IntroductionProcessList /> },
    { focus: 'processingTime', component: <IntroductionProcessingTime /> },
    { focus: 'alerts', component: <IntroductionAlerts /> },
    { focus: 'desk', component: <IntroductionYourDesk /> },
    { focus: 'radar', component: <IntroductionPerfomanceRadar /> },
    { focus: 'indicators', component: <IntroductionSuccessIndicators /> },
    { focus: 'mainInvestigated', component: <IntroductionMainInvestigated /> },
  ];
  const [currentPage, setCurrentPage] = useState(0);

  if (isOpen) {
    return (
      <div className={`intro-outer base-grid ${type === 1 ? 'tutela-grid' : 'pip-grid'}`}>
        <div style={{ gridArea: pages[currentPage].focus }} className="transparent-div" />
        <div className="text-div">
          {pages[currentPage].component}
          <button className="btn-leave" type="button" aria-label="Fechar" onClick={onToggle}>
            Sair
          </button>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            type="button"
            className="btn-introduction-preavious"
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn-introduction-next"
            type="button"
          >
            Próximo
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default Introduction;
Introduction.propTypes = propTypes;
