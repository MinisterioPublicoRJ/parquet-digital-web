import React from 'react';

import {
  baseGrid,
  navbar,
  today,
  desk,
  alerts
} from '../Prosecutors.module.css';

import { YourDesk, Alerts, Today } from '../../sections';
import ErrorBoundary from '../../../../errorBoundary/ErrorBoundary';
import NavbarLeft from '../../../../components/navbarLeft';

function Generalist() {
  return (
    <div className={baseGrid}>
      <div className={navbar}>
        <ErrorBoundary>
          <NavbarLeft />
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
export default Generalist;