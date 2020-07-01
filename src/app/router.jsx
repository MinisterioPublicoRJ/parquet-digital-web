import React from 'react';
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import Auth from '../auth';
import Login from '../login';
import Dashboard from '../dashboard';

export default function Router({ user }) {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard">{user ? <Dashboard /> : <Redirect to="/" />}</Route>
      </Switch>
    </HashRouter>
  );
}
