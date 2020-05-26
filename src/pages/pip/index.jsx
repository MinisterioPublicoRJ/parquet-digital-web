import React from 'react';
import PropTypes from 'prop-types';

import '../styles.css';
import './styles.css';

import { Alerts, ProcessList, PerformanceRadar, ProcessingTime, YourDesk } from '../../sections';
import TodayPip from '../../sections/Today/Pip';

const propTypes = { userName: PropTypes.string.isRequired };

function Pip({ userName }) {
  return (
    <div className="base-grid pip-grid">
      <Alerts user={userName} />
      <ProcessList user={userName} />
      <PerformanceRadar.Pip user={userName} />
      {/* <ProcessingTime user={userName} /> */}
      <TodayPip user={userName} />
      <YourDesk user={userName} />
    </div>
  );
}
Pip.propTypes = propTypes;
export default Pip;
