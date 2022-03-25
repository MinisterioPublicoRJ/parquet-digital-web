import React from 'react';
//import history from 'history/browser';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import UnavailablePage from '../views/dashboard/pages/unavailablePage/UnavailablePage';
import PrivateRoute from './PrivateRoute';

import { LoadingScreen, Login, Dashboard } from '../views';
import { Gestao, Entendimento, Celeridade, Atuacao } from "../views/dashboard/pages/welcomePages";

import { useAppContext } from '../../core/app/App.context';


function Router() {
  const { user, isServerDown  } = useAppContext();

  function findFirstPath() {
    let path = '/login';
    if (isServerDown) {
      path = '/indisponivel';
    } else if (user) {
      if (user.firstLogin) {
        path = '/gestao';
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
        <Route path="/gestao" component={Gestao} />
        <Route path="/entendimento" component={Entendimento} />
        <Route path="/celeridade" component={Celeridade} />
        <Route path="/atuacao" component={Atuacao} />
        <PrivateRoute path="/dashboard" component={Dashboard} isLogged={user} />
      </Switch>
    </HashRouter>
  );
}

export default Router;
