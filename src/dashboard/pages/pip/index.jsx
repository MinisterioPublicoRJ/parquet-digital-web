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
import NewRadar from '../../sections/PerformanceRadar/newRadar';

const propTypes = {
  setIsSelectorOpen: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

function Pip({ setIsSelectorOpen, setIsModalOpen, setIsIntroOpen }) {
  return (
    <div className="base-grid pip-grid">
      <Today
        setIsSelectorOpen={setIsSelectorOpen}
        setIsModalOpen={setIsModalOpen}
        setIsIntroOpen={setIsIntroOpen}
      />
      <YourDesk />
      <NewRadar />
      <PerformanceRadar.Pip />
      <MainInvestigated />
      <SuccessIndicators />
      <ProcessingTime />
    </div>
  );
}
Pip.propTypes = propTypes;
export default Pip;
