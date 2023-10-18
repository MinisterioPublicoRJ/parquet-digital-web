import React from 'react';

function DashboardControler({ children, errorBoundary: ErrorBoundary, errorScreen: ErrorScreen }) {

  return (
    <ErrorBoundary hasError={null} setError={null} errorScreen={<ErrorScreen />}>
      { children }
    </ErrorBoundary>
  )
}

export default DashboardControler;
