import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'mapasteca-web';

// import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { AppProvider, AppStoreInitializer } from './App.context';

function AppControler({ children, errorBoundary: ErrorBoundary, errorScreen: ErrorScreen }) {
  const appStore = AppStoreInitializer();
  const { appHasCrashed, setAppHasCrashed } = appStore;

  // will run on mount and every time it goes from an error state back to normal
  // this behaviour forces the page to reload when the error page is clicked
  // useEffect(() => {
  //   if (!hasFatalError) {
  //     loadComponent();
  //   }
  // }, [hasFatalError]);
 
  function onMount() {
    const token = window.localStorage.getItem('access_token');
    const scaToken = window.localStorage.getItem('sca_token');
    // tries to login automatically with saved token
    appStore.loginWithToken(token, scaToken);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
