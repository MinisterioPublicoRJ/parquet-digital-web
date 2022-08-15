import React from 'react';
//import history from 'history/browser';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { LoadingScreen, Login, Dashboard } from '../views';
import { UnavailablePage, Welcome } from '../views/dashboard/pages';
import { useAppContext } from '../../core/app/App.context';


function Router() {
  const { user, isServerDown  } = useAppContext();

  function findFirstPath() {
    let path = '/login';
    if (isServerDown) {
      path = '/indisponivel';
    } else if (user) {
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
          {findFirstPath()}
        </Route>
        <Route path="/carregando" component={LoadingScreen} />
        <Route path="/login">{user ? <Redirect to="/dashboard" /> : <Login />}</Route>
        <Route path="/indisponivel" component={UnavailablePage} />
        <Route path="/welcome" component={Welcome} />
        <PrivateRoute path="/dashboard" component={Dashboard} isLogged={user} />
      </Switch>
    </HashRouter>
  );
}

export default Router;
