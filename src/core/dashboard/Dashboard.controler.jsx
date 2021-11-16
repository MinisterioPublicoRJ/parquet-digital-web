import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function DashboardControler({ children, errorBoundary: ErrorBoundary, errorScreen: ErrorScreen }) {

  return (
    <ErrorBoundary hasError={null} setError={null} errorScreen={<ErrorScreen />}>
      { children }
    </ErrorBoundary>
  )
}

DashboardControler.propTypes = { AppView: PropTypes.func.isRequired };

export default DashboardControler;
