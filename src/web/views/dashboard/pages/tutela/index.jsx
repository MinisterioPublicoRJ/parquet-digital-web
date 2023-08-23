import React from 'react';

import { tutelaGrid } from './Tutela.module.css';
import { baseGrid } from '../Prosecutors.module.css';

import { YourDesk, Alerts, Today } from '../../sections';
import ErrorBoundary from '../../../../errorBoundary/ErrorBoundary';
import NavbarLeft from '../../../../components/navbarLeft';

function Tutela() {
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
export default Tutela;
