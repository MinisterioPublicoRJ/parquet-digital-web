import React, { useState } from 'react';

import {
  baseGrid,
  navbar,
  today,
  desk,
  alerts,
  showOnlyAlerts
} from '../Prosecutors.module.css';

import { YourDesk, Alerts, Today } from '../../sections';
import ErrorBoundary from '../../../../errorBoundary/ErrorBoundary';
import NavbarLeft from '../../../../components/navbarLeft';

function Tutela() {
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
export default Tutela;
