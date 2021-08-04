import React from 'react';
// import history from 'history/browser';
import { HashRouter, Switch, Route } from 'react-router-dom';
//import Unavailable from '../../unavailable';

import { LoadingScreen, Login, Unavailable, WelcomePages } from '../views';
import { Welcome, Home } from '../views/welcomePages';


function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={LoadingScreen} />
        <Route exact path="/login" component={Login} />
        <Route path="/indisponivel" component={Unavailable} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/home" component={Home} />
      </Switch>
    </HashRouter>
  );
}

export default Router;
