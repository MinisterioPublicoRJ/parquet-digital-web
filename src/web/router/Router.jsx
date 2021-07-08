import React from 'react';
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import { LoadingScreen } from '../views';
// import { useAuth } from './authContext';
// import Login from '../login';
// import Dashboard from '../dashboard';
// import { Welcome, Work, Home, Performance } from '../dashboard/pages/welcomePages';
// import Unavailable from '../unavailable/index';

function Router() {
  // const { user, isServerDown } = useAuth();

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

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={LoadingScreen} />
      </Switch>
    </HashRouter>
  );
}

export default Router;
