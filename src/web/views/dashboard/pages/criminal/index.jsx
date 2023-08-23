import React from 'react';

import { criminalGrid } from './Criminal.module.css';
import { baseGrid } from '../Prosecutors.module.css';

import { YourDesk, Alerts, Today } from '../../sections';
import ErrorBoundary from '../../../../errorBoundary/ErrorBoundary';
import NavbarLeft from '../../../../components/navbarLeft';

function Criminal() {
  return (
    <div className={baseGrid}>
      <ErrorBoundary>
        <NavbarLeft />
      </ErrorBoundary>
      <ErrorBoundary>
        <Today />
      </ErrorBoundary>
      <ErrorBoundary>
        <YourDesk />
      </ErrorBoundary>
      <ErrorBoundary>
        <Alerts />
      </ErrorBoundary>
    </div>
  );
}
export default Criminal;
