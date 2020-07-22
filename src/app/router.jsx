import React from 'react';
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import { useAuth } from './authContext';
import Login from '../login';
import Dashboard from '../dashboard';

function Router() {
  const { user } = useAuth();
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/dashboard" /> : <Login />}</Route>
        <Route path="/dashboard">{user ? <Dashboard /> : <Redirect to="/login" />}</Route>
      </Switch>
    </HashRouter>
  );
}

export default Router;
