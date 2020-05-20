import React from 'react';
import PropTypes from 'prop-types';

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

function Tutela({ userName }) {
  if (!userName) return <div> loading </div>;

  return (
    <div className="tutela-grid">
      <Alerts user={userName} />
      <ProcessList user={userName} />
      <PerformanceRadar.Tutela user={userName} />
      <ProcessingTime user={userName} />
      <Today user={userName} />
      <YourDesk user={userName} />
    </div>
  );
}

Tutela.propTypes = propTypes;
export default Tutela;
