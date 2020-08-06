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

const propTypes = { setIsSelectorOpen: PropTypes.func.isRequired };

function Pip({ setIsSelectorOpen }) {
  return (
    <div className="base-grid pip-grid">
      <Today setIsSelectorOpen={setIsSelectorOpen} />
      <YourDesk />
      <Alerts />
      <PerformanceRadar.Pip />
      <MainInvestigated />
      <SuccessIndicators />
      <ProcessingTime />
    </div>
  );
}
Pip.propTypes = propTypes;
export default Pip;
