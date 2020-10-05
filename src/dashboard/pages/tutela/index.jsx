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
} from '../../sections';
import OngoingInvestigations from '../../sections/TablesTutela/OngoingInvestigations';
import ProcessList from '../../sections/TablesTutela/ProcessList';


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
