import React from 'react';

import { appOuter } from './App.module.css';
import Router from '../../router/Router';

export function AppView() {
  return (
    <div className={appOuter}>
      <Router />
    </div>
  );
}

export default AppView;
