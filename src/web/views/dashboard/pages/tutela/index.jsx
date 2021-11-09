import React from 'react';
//import PropTypes from 'prop-types';

import './styles.css';
import '../styles.css';

import {YourDesk, Alerts, ProcessingTime, SuccessIndicators, TablesTutela, Today, PerformanceRadar} from '../../sections';
import ErrorBoundary from '../../../../errorBoundary/ErrorBoundary';

function Tutela() {
  return (
    <div className="base-grid pip-grid">
        <ErrorBoundary> 
          <Today />
        </ErrorBoundary>
        <ErrorBoundary>
          <YourDesk />
        </ErrorBoundary>
        <ErrorBoundary> 
          <Alerts />
        </ErrorBoundary>
        <ErrorBoundary> 
          <ProcessingTime />
        </ErrorBoundary>
        <ErrorBoundary> 
          <TablesTutela />
        </ErrorBoundary>
        <ErrorBoundary> 
         <PerformanceRadar />
        </ErrorBoundary>
        <ErrorBoundary> 
          <SuccessIndicators />
        </ErrorBoundary>
    </div>
  );
}
export default Tutela;
