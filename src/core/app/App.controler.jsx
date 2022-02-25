import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'mapasteca-web';
import { AppProvider, AppStoreInitializer } from './App.context';

function AppControler({ children, errorBoundary: ErrorBoundary, errorScreen: ErrorScreen }) {
  const appStore = AppStoreInitializer();
  const { appHasCrashed, setAppHasCrashed } = appStore;
 
  function onMount() {
    const token = window.localStorage.getItem('access_token');
    const scaToken = window.localStorage.getItem('sca_token');
    const storedOffice = window.localStorage.getItem('current_office');
    // tries to login automatically with saved token
    appStore.loginWithToken(token, scaToken, storedOffice);
  }
  useEffect(onMount, []);
  
  return (
    <AppProvider store={appStore}>
      <ThemeProvider>
        <ErrorBoundary hasError={appHasCrashed} setError={setAppHasCrashed} errorScreen={<ErrorScreen />}>
          { children }
        </ErrorBoundary>
      </ThemeProvider>
    </AppProvider>
  );
}

AppControler.propTypes = { AppView: PropTypes.func.isRequired };

export default AppControler;
