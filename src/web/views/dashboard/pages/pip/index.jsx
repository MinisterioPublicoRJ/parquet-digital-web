import React from 'react';
//import PropTypes from 'prop-types';

import './styles.css';
import '../styles.css';

import { Alerts, ProcessingTime, SuccessIndicators  } from '../../sections';
import ErrorBoundary from '../../../../errorBoundary/ErrorBoundary';

function Pip() {
  return (
    <div className="base-grid pip-grid">
        {/*<Alerts />*/}
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
