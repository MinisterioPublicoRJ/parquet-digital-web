import React from 'react';

import {AppView} from './App.view';
import AppErrorView from './AppError.view';
import AppControler from '../../../core/app/App.controler';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';

// renomear as variáveis em ErrorBoundary
function App() {
  return (
    <AppControler errorBoundary={ErrorBoundary} errorScreen={AppErrorView}>
      <AppView />
    </AppControler>
  )
}

export default App;
