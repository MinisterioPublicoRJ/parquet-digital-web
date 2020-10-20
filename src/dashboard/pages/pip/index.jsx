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
  setModalType: PropTypes.func.isRequired,
  setIsIntroOpen: PropTypes.func.isRequired,
  setInvestigatedProfile: PropTypes.func.isRequired,
  setModalData: PropTypes.func.isRequired,
};

function Pip({
  setIsSelectorOpen,
  setModalType,
  setIsIntroOpen,
  setInvestigatedProfile,
  setModalData,
}) {
  return (
    <div className="base-grid pip-grid">
      <Today
        setIsSelectorOpen={setIsSelectorOpen}
        setModalType={setModalType}
        setModalData={setModalData}
        setIsIntroOpen={setIsIntroOpen}
      />
      <YourDesk />
      <Alerts />
      <PerformanceRadar setModalType={setModalType} setModalData={setModalData} />
      <MainInvestigated setInvestigatedProfile={setInvestigatedProfile} />
      <SuccessIndicators />
      <ProcessingTime />
    </div>
  );
}
Pip.propTypes = propTypes;
export default Pip;
