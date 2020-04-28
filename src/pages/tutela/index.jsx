import React from 'react';

import './styles.css';
import Today from '../../sections/Today';
import YourDesk from '../../sections/YourDesk';
import Radar from '../../sections/PerformanceRadar';
import Alerts from '../../sections/Alerts';

export default function({ user }) {
  if (!user) return (<div> loading </div>);
  
  return (
    <div className="tutela-grid">
      <Today user={user} />
      <YourDesk user={user} />
      <Radar user={user} />
      <Alerts user={user} />
    </div>
  );
}
