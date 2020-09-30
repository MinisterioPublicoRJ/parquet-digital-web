import React from 'react';
import PropTypes from 'prop-types';

import '../styles.css';
import './styles.css';

import {
  Alerts,
  ProcessList,
  PerformanceRadar,
  Today,
  ProcessingTime,
  YourDesk,
  OngoingInvestigations,
} from '../../sections';

const propTypes = {
  setIsSelectorOpen: PropTypes.func.isRequired,
  setModalType: PropTypes.func.isRequired,
  setIsIntroOpen: PropTypes.func.isRequired,
  setModalData: PropTypes.func.isRequired,
};

function Tutela({ setIsSelectorOpen, setModalType, setIsIntroOpen, setModalData }) {
  return (
    <div className="base-grid tutela-grid">
      <Today
        setIsSelectorOpen={setIsSelectorOpen}
        setModalType={setModalType}
        setIsIntroOpen={setIsIntroOpen}
      />
      <YourDesk />
      <PerformanceRadar setModalType={setModalType} setModalData={setModalData} />
      <Alerts />
      <ProcessList />
      <ProcessingTime />
      <OngoingInvestigations />
    </div>
  );
}

Tutela.propTypes = propTypes;
export default Tutela;
