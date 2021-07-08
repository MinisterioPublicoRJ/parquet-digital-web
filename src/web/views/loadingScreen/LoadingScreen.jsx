import React from 'react';
import { loadingScreenOuter } from './LoadingScreen.module.css';

import { Spinner } from '../../../components';

function LoadingScreen() {
  return (
    <div className={loadingScreenOuter}>
      <Spinner size="large" />
    </div>
  );
}

export default LoadingScreen;
