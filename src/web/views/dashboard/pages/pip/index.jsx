import React from 'react';
//import PropTypes from 'prop-types';

import './styles.css';
import '../styles.css';

import { Alerts, ProcessingTime, SuccessIndicators, Today, YourDesk, MainInvestigated, PerformanceRadar  } from '../../sections';
import ErrorBoundary from '../../../../errorBoundary/ErrorBoundary';

function Pip() {
  return (
    <div className="base-grid pip-grid">
       <ErrorBoundary> 
          <Today />
        </ErrorBoundary>
        {/*<ErrorBoundary>
          <YourDesk />
        </ErrorBoundary>*/}
        <ErrorBoundary>
        <MainInvestigated />
        </ErrorBoundary>
        <ErrorBoundary> 
          <Alerts />
        </ErrorBoundary>
         <ErrorBoundary> 
         <ProcessingTime />
        </ErrorBoundary>
        <ErrorBoundary> 
         <PerformanceRadar />
        </ErrorBoundary>
        <ErrorBoundary> 
          <SuccessIndicators />
        </ErrorBoundary>
        <ErrorBoundary>
          <ProcessingTime />
        </ErrorBoundary>
    </div>
  );
}
export default Pip;
