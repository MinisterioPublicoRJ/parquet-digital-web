import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import { Alerts, PerformanceRadar, Today, YourDesk, ProcessingTime } from '../../sections';
import SuccesIndicators from '../../sections/SuccessIndicators';

const propTypes = { userName: PropTypes.string.isRequired };

function Pip({ userName }) {
  return (
    <div className="pip-grid">
      <Alerts user={userName} />
      <PerformanceRadar user={userName} />
      <Today user={userName} />
      <YourDesk user={userName} />
      <SuccesIndicators user={userName} />
      <ProcessingTime user={userName} />
    </div>
  );
}
Pip.propTypes = propTypes;
export default Pip;
