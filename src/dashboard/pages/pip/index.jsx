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
import { ErrorBoundary } from '../../../components';

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
      <ErrorBoundary>
        <Today
          setIsSelectorOpen={setIsSelectorOpen}
          setModalType={setModalType}
          setModalData={setModalData}
          setIsIntroOpen={setIsIntroOpen}
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <YourDesk />
      </ErrorBoundary>
      <ErrorBoundary>
        <Alerts />
      </ErrorBoundary>
      <ErrorBoundary>
        <PerformanceRadar setModalType={setModalType} setModalData={setModalData} />
      </ErrorBoundary>
      <ErrorBoundary>
        <MainInvestigated setInvestigatedProfile={setInvestigatedProfile} />
      </ErrorBoundary>
      <ErrorBoundary>
        <SuccessIndicators />
      </ErrorBoundary>
      <ErrorBoundary>
        <ProcessingTime />
      </ErrorBoundary>
    </div>
  );
}
Pip.propTypes = propTypes;
export default Pip;
