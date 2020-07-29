import React from 'react';
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import { useAuth } from './authContext';
import Login from '../login';
import Dashboard from '../dashboard';

function Router() {
  const { user, currentOffice } = useAuth();
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          {user && currentOffice ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {user && currentOffice ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route path="/dashboard">
          {user && currentOffice ? <Dashboard /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default Router;
