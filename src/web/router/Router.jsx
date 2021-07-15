import React from 'react';
// import history from 'history/browser';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { LoadingScreen, Login } from '../views';

function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={LoadingScreen} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </HashRouter>
  );
}

export default Router;
