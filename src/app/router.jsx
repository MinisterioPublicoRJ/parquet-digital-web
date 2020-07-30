import React from 'react';
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import { useAuth } from './authContext';
import Login from '../login';
import Dashboard from '../dashboard';
import { Welcome, Work, Home, Performance } from '../dashboard/pages/welcomePages';

function Router() {
  const { user, currentOffice } = useAuth();

  const PrivateRoute = props => {
    if (user) {
      console.log('props');
    }
    return <Redirect to="/login" />;
  };

  function findFirstPath() {
    let path = '/login';

    if (user) {
      if (user.firstLogin) {
        path = '/welcome';
      } else {
        path = '/dashboard';
      }
    }
    return <Redirect to={path} />;
  }

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <PrivateRoute path="/dashboard" component={Dashboard} />
          {/* user && currentOffice ? <Redirect to="/dashboard" /> : <Redirect to="/login" /> */}
        </Route>
        {/* <Route path="/login">
          {user && currentOffice ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route path="/dashboard">
          {user && currentOffice ? <Dashboard /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/dashboard" /> : <Login />}</Route>
        <Route path="/dashboard">{user ? <Dashboard /> : <Redirect to="/login" />}</Route>
        <Route path="/welcome" component={Welcome} />
        <Route path="/work" component={Work} />
        <Route path="/home" component={Home} />
        <Route path="/perfomanceAnalysis" component={Performance} /> */}
      </Switch>
    </HashRouter>
  );
}

export default Router;
