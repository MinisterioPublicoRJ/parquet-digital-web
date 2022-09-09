import React from 'react';
//import PropTypes from 'prop-types';

import {criminalGrid} from './Criminal.module.css';
import {baseGrid} from '../Prosecutors.module.css';

import {YourDesk, Alerts, ProcessingTime, Today, PerformanceRadar, ProcessListCriminal} from '../../sections';
import ErrorBoundary from '../../../../errorBoundary/ErrorBoundary';

function Criminal() {
  return (
    <div className={[baseGrid, criminalGrid].join(' ')}>
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
          <ProcessListCriminal />
        </ErrorBoundary>
        <ErrorBoundary> 
         <PerformanceRadar />
        </ErrorBoundary>
    </div>
  );
}
export default Criminal;
