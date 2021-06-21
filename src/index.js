import React from 'react';
import ReactDOM from 'react-dom';
// import App from './app';
import AppControler from './core/app/App.controler';
import AppView from './web/views/app/App.view';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AppControler AppView={AppView}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
