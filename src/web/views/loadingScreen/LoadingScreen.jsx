import React, { useEffect } from 'react';

import { loadingScreenOuter } from './LoadingScreen.module.css';
import { Spinner } from '../../../components';
import { useAppContext } from '../../../core/app/App.context';

function LoadingScreen({ history }) {
  const { autoLoginFailed, user } = useAppContext();

  function onAutoLoginFail() {
    // skips the mounting call
    if(autoLoginFailed) {
      history.push('/login');
    }
  }
  
  function onAutoLoginSuccess() {
    if(user) {
      history.push('/dashboard');
    }
  }

  useEffect(onAutoLoginFail, [autoLoginFailed]);

  useEffect(onAutoLoginSuccess, [user]);

  return (
    <div className={loadingScreenOuter}>
      <Spinner size="large" />
    </div>
  );
}

export default LoadingScreen;
