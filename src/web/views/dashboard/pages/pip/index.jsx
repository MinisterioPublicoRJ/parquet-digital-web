import React from 'react';
//import PropTypes from 'prop-types';

import './styles.css';
import '../styles.css';

import { Alerts, ProcessingTime, SuccessIndicators, Today  } from '../../sections';
import ErrorBoundary from '../../../../errorBoundary/ErrorBoundary';

function Pip() {
  return (
    <div className="base-grid pip-grid">
       <ErrorBoundary> 
          <Today />
        </ErrorBoundary>
        <ErrorBoundary> 
          <Alerts />
        </ErrorBoundary>
        <ErrorBoundary> 
         <ProcessingTime />
        </ErrorBoundary>
        <ErrorBoundary> 
          <SuccessIndicators />
        </ErrorBoundary>
    </div>
  );
}
export default Pip;
