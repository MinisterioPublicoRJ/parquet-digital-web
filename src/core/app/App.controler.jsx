import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// import ErrorBoundary from '../../components/layoutPieces/ErrorBoundary/ErrorBoundary';
// import ErrorScreen from '../../../../../components/refactor/ErrorScreen/ErrorScreen.view';
// import { useAuth } from '../../../../../app/authContext';
import { AppProvider, AppStoreInitializer } from './App.context';

function AppControler({ AppView }) {
  const appStore = AppStoreInitializer();
  // const { hasFatalError, setHasFatalError } = appStore;

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
    appStore.loginWithToken(token, scaToken);
  }

  // function loadAlertCount() {}

  // return (
  //   <AppProvider store={appStore}>
  //     <ErrorBoundary
  //       setError={setHasFatalError}
  //       hasCrashed={hasFatalError}
  //       errorScreen={<ErrorScreen gridArea="alerts" />}
  //     >
  //       <AppView />
  //     </ErrorBoundary>
  //   </AppProvider>
  // );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onMount, []);

  return (
    <AppProvider store={store}>
      <AppView />
    </AppProvider>
  );
}

AppControler.propTypes = { AppView: PropTypes.func.isRequired };

export default AppControler;
