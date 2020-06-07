import React from 'react';
import PropTypes from 'prop-types';

import '../styles.css';
import './styles.css';
import SuccesIndicators from '../../sections/SuccessIndicators';

import {
  Alerts,
  ProcessList,
  Today,
  PerformanceRadar,
  ProcessingTime,
  YourDesk,
} from '../../sections';

const propTypes = { userName: PropTypes.string.isRequired };

function Pip({ userName }) {
  return (
    <div className="base-grid pip-grid">
      <Alerts user={userName} />
      <PerformanceRadar.Pip user={userName} />
      <Today user={userName} />
      <YourDesk user={userName} />
      <SuccesIndicators user={userName} />
      <ProcessingTime user={userName} />
    </div>
  );
}
Pip.propTypes = propTypes;
export default Pip;
