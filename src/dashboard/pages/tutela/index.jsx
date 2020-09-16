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
import NewRadar from '../../sections/PerformanceRadar/newRadar';

const propTypes = {
  setIsSelectorOpen: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

function Tutela({ setIsSelectorOpen, setIsModalOpen, setIsIntroOpen }) {
  return (
    <div className="base-grid tutela-grid">
      <Today
        setIsSelectorOpen={setIsSelectorOpen}
        setIsModalOpen={setIsModalOpen}
        setIsIntroOpen={setIsIntroOpen}
      />
      <YourDesk />
      <PerformanceRadar.Tutela />
      <NewRadar />
      <ProcessList />
      <ProcessingTime />
    </div>
  );
}

Tutela.propTypes = propTypes;
export default Tutela;
