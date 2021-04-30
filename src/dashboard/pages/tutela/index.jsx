import React from 'react';
import PropTypes from 'prop-types';

import '../styles.css';
import './styles.css';

import {
  Alerts,
  PerformanceRadar,
  Today,
  ProcessingTime,
  YourDesk,
  TablesTutela,
} from '../../sections';
import { ErrorBoundary } from '../../../components';

const propTypes = {
  setIsSelectorOpen: PropTypes.func.isRequired,
  setModalType: PropTypes.func.isRequired,
  setIsIntroOpen: PropTypes.func.isRequired,
  setModalData: PropTypes.func.isRequired,
  setInvestigatedProfile: PropTypes.func.isRequired,
  setProcessDetail: PropTypes.func.isRequired,
};

function Tutela({
  setIsSelectorOpen,
  setModalType,
  setIsIntroOpen,
  setModalData,
  setInvestigatedProfile,
  setProcessDetail,
}) {
  return (
    <div className="base-grid tutela-grid">
      <ErrorBoundary>
        <Today
          setIsSelectorOpen={setIsSelectorOpen}
          setModalType={setModalType}
          setIsIntroOpen={setIsIntroOpen}
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <YourDesk />
      </ErrorBoundary>
      <ErrorBoundary>
        <PerformanceRadar setModalType={setModalType} setModalData={setModalData} />
      </ErrorBoundary>
      <ErrorBoundary>
        <Alerts />
      </ErrorBoundary>
      <ErrorBoundary>
        <ProcessingTime />
      </ErrorBoundary>
      <ErrorBoundary>
        <TablesTutela
          setInvestigatedProfile={setInvestigatedProfile}
          setProcessDetail={setProcessDetail}
        />
      </ErrorBoundary>
    </div>
  );
}

Tutela.propTypes = propTypes;
export default Tutela;
