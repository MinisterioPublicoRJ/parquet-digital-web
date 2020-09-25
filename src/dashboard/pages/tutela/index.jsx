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
} from '../../sections';

const propTypes = {
  setIsSelectorOpen: PropTypes.func.isRequired,
  setModalType: PropTypes.func.isRequired,
  setIsIntroOpen: PropTypes.func.isRequired,
};

function Tutela({ setIsSelectorOpen, setModalType, setIsIntroOpen }) {
  return (
    <div className="base-grid tutela-grid">
      <Today
        setIsSelectorOpen={setIsSelectorOpen}
        setModalType={setModalType}
        setIsIntroOpen={setIsIntroOpen}
      />
      <YourDesk />
      <PerformanceRadar />
      <Alerts />
      <ProcessList />
      <ProcessingTime />
    </div>
  );
}

Tutela.propTypes = propTypes;
export default Tutela;
