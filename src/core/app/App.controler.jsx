import React, { useEffect } from 'react';
import { ThemeProvider } from 'mapasteca-web';
import { AppProvider, AppStoreInitializer } from './App.context';
import { AlertsContextCreator } from '../../web/views/dashboard/sections/Alerts/alertsContext';


function AppControler({ children, errorBoundary: ErrorBoundary, errorScreen: ErrorScreen }) {
  const appStore = AppStoreInitializer();
  
  const { appHasCrashed, setAppHasCrashed, buildRequestParams } = appStore;
  
  const alertsStore = AlertsContextCreator(buildRequestParams);
 
  function onMount() {
    const token = window.localStorage.getItem('access_token');
    const scaToken = window.localStorage.getItem('sca_token');
    const storedOffice = window.localStorage.getItem('current_office');
    // tries to login automatically with saved token
    appStore.loginWithToken(token, scaToken, storedOffice);
  }
  useEffect(onMount, []);
  
  return (
    <AppProvider alertsStore={alertsStore} store={appStore}>
      <ThemeProvider>
        <ErrorBoundary hasError={appHasCrashed} setError={setAppHasCrashed} errorScreen={<ErrorScreen />}>
          { children }
        </ErrorBoundary>
      </ThemeProvider>
    </AppProvider>
  );
}

export default AppControler;
