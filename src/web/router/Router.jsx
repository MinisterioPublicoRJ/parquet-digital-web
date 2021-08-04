import React from 'react';
// import history from 'history/browser';
import { HashRouter, Switch, Route } from 'react-router-dom';
//import Unavailable from '../../unavailable';

import { LoadingScreen, Login, Unavailable } from '../views';
import { Welcome, Home, Work, PerfomanceAnalysis } from '../views/welcomePages';


function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={LoadingScreen} />
        <Route exact path="/login" component={Login} />
        <Route path="/indisponivel" component={Unavailable} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/home" component={Home} />
        <Route path="/work" component={Work} />
        <Route path="/perfomanceAnalysis" component={PerfomanceAnalysis} />
      </Switch>
    </HashRouter>
  );
}

export default Router;
