import React from 'react';

import { pipGrid } from './Pip.module.css';
import { baseGrid } from '../Prosecutors.module.css';

import { Alerts, Today, YourDesk } from '../../sections';
import ErrorBoundary from '../../../../errorBoundary/ErrorBoundary';
import NavbarLeft from '../../../../components/navbarLeft';

function Pip() {
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
export default Pip;
