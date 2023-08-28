import React, { useState } from 'react';

import {
  baseGrid,
  navbar,
  today,
  desk,
  alerts,
  showOnlyAlerts
} from '../Prosecutors.module.css';

import { Alerts, Today, YourDesk } from '../../sections';
import ErrorBoundary from '../../../../errorBoundary/ErrorBoundary';
import NavbarLeft from '../../../../components/navbarLeft';

function Pip() {
  const [onlyAlerts, setOnlyAlerts] = useState(false);

  return (
    <div className={`${baseGrid} ${onlyAlerts && showOnlyAlerts}`}>
      <div className={navbar}>
        <ErrorBoundary>
          <NavbarLeft onlyAlerts={onlyAlerts} setOnlyAlerts={setOnlyAlerts} />
        </ErrorBoundary>
      </div>
      <div className={today}>
        <ErrorBoundary>
          <Today />
        </ErrorBoundary>
      </div>
      <div className={desk}>
        <ErrorBoundary>
          <YourDesk />
        </ErrorBoundary>
      </div>
      <div className={alerts}>
        <ErrorBoundary>
          <Alerts />
        </ErrorBoundary>
      </div>
    </div>
  );
}
export default Pip;
