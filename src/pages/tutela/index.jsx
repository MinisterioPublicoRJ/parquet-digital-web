import React from 'react';
import PropTypes from 'prop-types';

import '../styles.css';
import './styles.css';

import { Alerts, ProcessList, PerformanceRadar, ProcessingTime, YourDesk } from '../../sections';
import TodayTutela from '../../sections/Today/Tutela';

const propTypes = { userName: PropTypes.string.isRequired };

function Tutela({ userName }) {
  return (
    <div className="base-grid tutela-grid">
      <Alerts user={userName} />
      <ProcessList user={userName} />
      <PerformanceRadar.Tutela user={userName} />
      <ProcessingTime user={userName} />
      <TodayTutela user={userName} />
      <YourDesk user={userName} />
    </div>
  );
}

Tutela.propTypes = propTypes;
export default Tutela;
