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

function Pip({ userName }) {
  if (!userName) return <div> loading </div>;

  return (
    <div className="pip-grid">
      <Alerts user={userName} />
      <ProcessList user={userName} />
      <PerformanceRadar user={userName} />
      <ProcessingTime user={userName} />
      <Today user={userName} />
      <YourDesk user={userName} />
    </div>
  );
}
Pip.propTypes = propTypes;
export default Pip;
