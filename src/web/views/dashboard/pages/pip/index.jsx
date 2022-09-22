import React from 'react';
//import PropTypes from 'prop-types';

import {pipGrid} from './Pip.module.css';
import {baseGrid} from '../Prosecutors.module.css';

import { Alerts, SuccessIndicators, Today, YourDesk, MainInvestigated, PerformanceRadar  } from '../../sections';
import ErrorBoundary from '../../../../errorBoundary/ErrorBoundary';

function Pip() {
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
         <PerformanceRadar />
        </ErrorBoundary>
        <ErrorBoundary> 
          <SuccessIndicators />
        </ErrorBoundary>
    </div>
  );
}
export default Pip;
