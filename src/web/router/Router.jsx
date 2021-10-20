import React from 'react';
// import history from 'history/browser';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
//import Unavailable from '../../unavailable';
import PrivateRoute from './PrivateRoute';

import { LoadingScreen, Login, Unavailable, Dashboard } from '../views';
import { Gestao, Entendimento, Celeridade, Atuacao } from '../views/welcomePages';

import { useAppContext } from '../../core/app/App.context';


function Router() {
  const { user } = useAppContext();
  console.log('user in router:', user);

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={LoadingScreen} />
        <Route exact path="/login" > {user ? <Redirect to="/dashboard" /> : <Login />} </Route>
        <Route path="/indisponivel" component={Unavailable} />
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
