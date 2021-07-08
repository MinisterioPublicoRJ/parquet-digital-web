import React, { useEffect } from 'react';
import { createBrowserHistory } from 'history';
import { Switch, Route, Router, Redirect } from 'react-router-dom';

import { LoadingScreen, Login } from '../views';
import { useAppContext } from '../../core/app/App.context';
// import { useAuth } from './authContext';
// import Login from '../login';
// import Dashboard from '../dashboard';
// import { Welcome, Work, Home, Performance } from '../dashboard/pages/welcomePages';
// import Unavailable from '../unavailable/index';

function AppRouter() {
  const history = createBrowserHistory();
  const { autoLoginFailed } = useAppContext();

  useEffect(onLoginStatusChange, [autoLoginFailed]);

  function onLoginStatusChange() {
    console.log('onLoginStatusChange called');
    if (autoLoginFailed) {
      console.log('hello', autoLoginFailed);
      history.push('/login')
    }
  }
  console.log('rendered');
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={LoadingScreen} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );

  // function findFirstPath() {
  //   let path = '/login';
  //   if (isServerDown) {
  //     path = '/unavailable';
  //   } else if (user) {
  //     if (user.firstLogin) {
  //       path = '/welcome';
  //     } else {
  //       path = '/dashboard';
  //     }
  //   }
  //   return <Redirect to={path} />;
  // }

  // <Route path="/login">{user ? <Redirect to="/dashboard" /> : <Login />}</Route>
  // <PrivateRoute path="/dashboard" component={Dashboard} />
  // <PrivateRoute path="/welcome" component={Welcome} />
  // <PrivateRoute path="/work" component={Work} />
  // <PrivateRoute path="/home" component={Home} />
  // <PrivateRoute path="/perfomanceAnalysis" component={Performance} />
  // <Route path="/unavailable" component={Unavailable} />
}

export default AppRouter;
