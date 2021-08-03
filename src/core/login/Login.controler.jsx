import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function LoginControler({ children, errorBoundary: ErrorBoundary, errorScreen: ErrorScreen }) {
  const [loginHasCrashed, setLoginHasCrashed] = useState(false);
  const [isLoading, setLoadingState] = useState(false);
  const [username, setUsername] = useState('');
  const [secret, setSecret] = useState('');

  useEffect(() => {
    if (scaUserError) {
      setLoadingState(false);
    }
  }, [scaUserError]);

  function onFormSubmit() {
    // e.preventDefault();
    setLoadingState(true);
    // scaLogin(username, secret);
  }

  return (
    <ErrorBoundary hasError={loginHasCrashed} setError={setLoginHasCrashed} errorScreen={<ErrorScreen />}>
      { children }
    </ErrorBoundary>
  )
}

LoginControler.propTypes = { AppView: PropTypes.func.isRequired };

export default LoginControler;
