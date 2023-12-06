import React from 'react';
import Router from '../../router/Router';
import '../../themes/index.css';
import  root  from './App.module.css';

export function AppView() {
  return (
    <div className={root}>
      <Router />
    </div>
  );
}

export default AppView;
