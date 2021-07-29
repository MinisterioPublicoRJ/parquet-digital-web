import React from 'react';
// import history from 'history/browser';
import { HashRouter, Switch, Route } from 'react-router-dom';
//import Unavailable from '../../unavailable';

import { LoadingScreen, Login, Unavailable } from '../views';

function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={LoadingScreen} />
        <Route exact path="/login" component={Login} />
        <Route path="/indisponivel" component={Unavailable} />
      </Switch>
    </HashRouter>
  );
}

export default Router;
