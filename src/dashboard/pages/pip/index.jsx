import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import '../styles.css';

import {
  Today,
  YourDesk,
  Alerts,
  PerformanceRadar,
  MainInvestigated,
  SuccessIndicators,
  ProcessingTime,
} from '../../sections';

const propTypes = { userName: PropTypes.string.isRequired };

function Pip({ userName, user }) {
  return (
    <div className="base-grid pip-grid">
      {/* <Today user={user} userName={userName} /> */}
      <YourDesk user={userName} />
      <Alerts />
      <PerformanceRadar.Pip user={userName} />
      <MainInvestigated user={userName} />
      <SuccessIndicators user={userName} />
      <ProcessingTime />
    </div>
  );
}
Pip.propTypes = propTypes;
export default Pip;
