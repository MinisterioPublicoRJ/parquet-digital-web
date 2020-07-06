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
      <Alerts />
      <ProcessList user={userName} />
      <PerformanceRadar.Tutela user={userName} />
      {/*<ProcessingTime user={user} />*/}
      {/*<Today userName={userName} user={user} />*/}
      <YourDesk user={userName} />
    </div>
  );
}

Tutela.propTypes = propTypes;
export default Tutela;
