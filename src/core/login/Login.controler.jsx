import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useAppContext } from '../app/App.context';
import { LoginProvider, LoginStoreInitializer } from './Login.context';

function LoginControler({ children, errorBoundary: ErrorBoundary, errorScreen: ErrorScreen }) {
  const { scaLogin, scaLoginFailed, autoLoginFailed, loginWithSCACredentials } = useAppContext();
  const loginStore = LoginStoreInitializer();
  const { loginHasCrashed, setLoginHasCrashed, username, password, isLoading, setLoadingState } = loginStore;

  // if view changes state to loading, tries to login
  useEffect(() => {
    if(isLoading) {
      onFormSubmit();
    }
  }, [isLoading]);

  // exits loading state if login fails
  useEffect(() => {
    if (scaLoginFailed) {
      setLoadingState(false);
    }
  }, [scaLoginFailed]);

  function onFormSubmit() {
    loginWithSCACredentials(username, password);
  }

  return (
    <LoginProvider store={loginStore}>
      <ErrorBoundary hasError={loginHasCrashed} setError={setLoginHasCrashed} errorScreen={<ErrorScreen />}>
        { children }
      </ErrorBoundary>
    </LoginProvider>
  )
}

LoginControler.propTypes = { AppView: PropTypes.func.isRequired };

export default LoginControler;
