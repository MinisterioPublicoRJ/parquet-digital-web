import React from 'react';
//import PropTypes from 'prop-types';

import {tutelaGrid} from './Tutela.module.css';
import {baseGrid} from '../Prosecutors.module.css';

import {YourDesk, Alerts, ProcessingTime, TablesTutela, Today, PerformanceRadar} from '../../sections';
import ErrorBoundary from '../../../../errorBoundary/ErrorBoundary';

function Tutela() {
  return (
    <div className={[baseGrid, tutelaGrid].join(' ')}>
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
    </div>
  );
}
export default Tutela;
