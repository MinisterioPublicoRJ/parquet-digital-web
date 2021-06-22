import React from 'react';
import ReactDOM from 'react-dom';
import AppControler from './core/app/App.controler';
import AppView from './web/views/app/App.view';
import AppErrorView from './web/views/app/AppError.view';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <AppControler appView={AppView} appErrorView={AppErrorView} />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
