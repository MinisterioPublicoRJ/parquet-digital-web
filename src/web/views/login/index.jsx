import React from 'react';

import LoginView from './Login.view.jsx';
import LoginErrorView from './LoginError.view';
import LoginControler from '../../../core/login/Login.controler';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';
import { useLoginContext } from '../../../core/login/Login.context';

// renomar as variáveis em ErrorBoundary
function Login() {
  return (
    <LoginControler errorBoundary={ErrorBoundary} errorScreen={LoginErrorView}>
      <LoginView />
    </LoginControler>
  )
}

export default Login;
