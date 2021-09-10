import React, { useEffect } from 'react';

import { loadingScreenOuter } from './LoadingScreen.module.css';
import { Spinner } from '../../../components';
import { useAppContext } from '../../../core/app/App.context';

function LoadingScreen({ history }) {
  const { autoLoginFailed } = useAppContext();

  function onAutoLoginFail() {
    // skips the mounting call
    if(autoLoginFailed) {
      history.push('/login');
    }
  }

  function onLoginAutoLoginSuccess() {
    console.log('it worked!');
  }

  useEffect(onAutoLoginFail, [autoLoginFailed]);

  return (
    <div className={loadingScreenOuter}>
      <Spinner size="large" />
    </div>
  );
}

export default LoadingScreen;
