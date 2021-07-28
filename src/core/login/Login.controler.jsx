import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function LoginControler({ children, errorBoundary: ErrorBoundary, errorScreen: ErrorScreen }) {

  return (
    <ErrorBoundary hasError={appHasCrashed} setError={setAppHasCrashed} errorScreen={<ErrorScreen />}>
      { children }
    </ErrorBoundary>
  )
}

LoginControler.propTypes = { AppView: PropTypes.func.isRequired };

export default LoginControler;
