import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import '../styles.css';

import {
  Today,
  YourDesk,
  Alerts,
  PerformanceRadar,
  MainInvestigated,
  SuccessIndicators,
  ProcessingTime,
} from '../../sections';

const propTypes = {
  setIsSelectorOpen: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  setIsIntroOpen: PropTypes.func.isRequired,
  setInvestigatedProfile: PropTypes.func.isRequired,
};

function Pip({ setIsSelectorOpen, setIsModalOpen, setIsIntroOpen, setInvestigatedProfile }) {
  return (
    <div className="base-grid pip-grid">
      <Today
        setIsSelectorOpen={setIsSelectorOpen}
        setIsModalOpen={setIsModalOpen}
        setIsIntroOpen={setIsIntroOpen}
      />
      <YourDesk />
      <Alerts />
      <PerformanceRadar />
      <MainInvestigated setInvestigatedProfile={setInvestigatedProfile} />
      <SuccessIndicators />
      <ProcessingTime />
    </div>
  );
}
Pip.propTypes = propTypes;
export default Pip;
