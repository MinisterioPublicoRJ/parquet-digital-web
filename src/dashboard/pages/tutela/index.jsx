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

const propTypes = { userName: PropTypes.string.isRequired };

function Tutela({ userName, user }) {
  return (
    <div className="base-grid tutela-grid">
      <Today userName={userName} user={user} />
      <YourDesk user={userName} />
      <PerformanceRadar.Tutela user={userName} />
      {/*<Alerts /> */}
      <ProcessList user={userName} />
      <ProcessingTime user={user} />
    </div>
  );
}

Tutela.propTypes = propTypes;
export default Tutela;
