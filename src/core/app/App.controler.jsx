import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// import ErrorBoundary from '../../components/layoutPieces/ErrorBoundary/ErrorBoundary';
// import ErrorScreen from '../../../../../components/refactor/ErrorScreen/ErrorScreen.view';
// import { useAuth } from '../../../../../app/authContext';
import { AppProvider, AppStoreInitializer } from './App.context';

function AppControler({ AppView }) {
  const store = AppStoreInitializer();
  // const { hasFatalError, setHasFatalError } = store;

  // will run on mount and every time it goes from an error state back to normal
  // this behaviour forces the page to reload when the error page is clicked
  // useEffect(() => {
  //   if (!hasFatalError) {
  //     loadComponent();
  //   }
  // }, [hasFatalError]);

  function loadComponent() {
    console.log('i was called!');
    // loadAlertCount();
  }

  // function loadAlertCount() {}

  // return (
  //   <AppProvider store={store}>
  //     <ErrorBoundary
  //       setError={setHasFatalError}
  //       hasCrashed={hasFatalError}
  //       errorScreen={<ErrorScreen gridArea="alerts" />}
  //     >
  //       <AppView />
  //     </ErrorBoundary>
  //   </AppProvider>
  // );
  return (
    <AppProvider store={store}>
      <AppView />
    </AppProvider>
  );
}

AppControler.propTypes = { AppView: PropTypes.func.isRequired };

export default AppControler;
