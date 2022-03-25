import React from 'react';

import { appOuter } from './App.module.css';
import Router from '../../router/Router';
import "../../themes/index.css";

export function AppView() {
  return (
    <div className={appOuter}>
      <Router />
    </div>
  );
}

export default AppView;
