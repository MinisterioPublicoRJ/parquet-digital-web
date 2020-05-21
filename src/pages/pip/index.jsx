import React from 'react';
import PropTypes from 'prop-types';

import '../styles.css';
import './styles.css';

import {
  Alerts,
  ProcessList,
  PerformanceRadar,
  ProcessingTime,
  Today,
  YourDesk,
} from '../../sections';

const propTypes = { userName: PropTypes.string.isRequired };

function Pip({ userName }) {
  return (
    <div className="base-grid pip-grid">
      {/* <Alerts user={userName} /> */}
      {/* <ProcessList user={userName} /> */}
      <PerformanceRadar.Pip user={userName} />
      {/* <ProcessingTime user={userName} /> */}
      {/* <Today user={userName} /> */}
      {/* <YourDesk user={userName} /> */}
    </div>
  );
}
Pip.propTypes = propTypes;
export default Pip;
