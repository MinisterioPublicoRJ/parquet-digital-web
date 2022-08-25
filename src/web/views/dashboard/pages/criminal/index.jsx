import React from 'react';
//import PropTypes from 'prop-types';

import {pipGrid} from './Criminal.module.css';
import {baseGrid} from '../Prosecutors.module.css';

import { Alerts, ProcessingTime, SuccessIndicators, Today, YourDesk, MainInvestigated, PerformanceRadar  } from '../../sections';
import ErrorBoundary from '../../../../errorBoundary/ErrorBoundary';

function Criminal() {
  return (
    <div className={[baseGrid, pipGrid].join(' ')}>
       <ErrorBoundary> 
          <Today />
        </ErrorBoundary>
        <ErrorBoundary>
          <YourDesk />
        </ErrorBoundary>
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
export default Criminal;
