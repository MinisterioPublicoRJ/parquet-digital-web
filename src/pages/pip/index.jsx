import React from 'react';
import PropTypes from 'prop-types';

import '../styles.css';
import './styles.css';
import SuccesIndicators from '../../sections/SuccessIndicators';

import {
  Alerts,
  MainInvestigated,
  Today,
  PerformanceRadar,
  ProcessingTime,
  YourDesk,
} from '../../sections';

const propTypes = { userName: PropTypes.string.isRequired };

function Pip({ userName, user }) {
  return (
    <div className="base-grid pip-grid">
      <YourDesk user={userName} />
      <Alerts user={userName} />
      <PerformanceRadar.Pip user={userName} />
      {/*<MainInvestigated user={userName} />*/}
      <SuccesIndicators user={userName} />
      <Today user={user} userName={userName} />
      <ProcessingTime user={userName} />
    </div>
  );
}
Pip.propTypes = propTypes;
export default Pip;
