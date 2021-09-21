import React from 'react';

import LoginView from './Login.view.jsx';
import AppErrorView from '../app/AppError.view';
import LoginControler from '../../../core/login/Login.controler';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';
// import { useLoginContext } from '../../../core/login/Login.context';

function Login() {
  return (
    <LoginControler errorBoundary={ErrorBoundary} errorScreen={AppErrorView}>
      <LoginView />
    </LoginControler>
  )
}

export default Login;
