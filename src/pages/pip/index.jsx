import React from 'react';

import './styles.css';
import Today from '../../sections/Today';
import YourDesk from '../../sections/YourDesk';
import Radar from '../../sections/PerformanceRadar';
import Alerts from '../../sections/Alerts';
import SuccesIndicators from '../../sections/SuccessIndicators';
import ProcessingTime from '../../sections/ProcessingTime';

export default function({ user }) {
  return (
    <div className="pip-grid">
      <Today user={user} />
      <YourDesk user={user} />
      <Radar user={user} />
      <Alerts user={user} />
      <SuccesIndicators user={user} />
      <ProcessingTime user={user} />
    </div>
  );
}
