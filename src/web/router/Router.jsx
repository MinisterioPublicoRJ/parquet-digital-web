import React from 'react';
// import history from 'history/browser';
import { HashRouter, Switch, Route } from 'react-router-dom';
//import Unavailable from '../../unavailable';

import { LoadingScreen, Login, Unavailable } from '../views';
import { Gestao, Entendimento, Celeridade, Atuacao } from '../views/welcomePages';


function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={LoadingScreen} />
        <Route exact path="/login" component={Login} />
        <Route path="/indisponivel" component={Unavailable} />
        <Route path="/gestao" component={Gestao} />
        <Route path="/celeridade" component={Celeridade} />
        <Route path="/entendimento" component={Entendimento} />
        <Route path="/atuacao" component={Atuacao} />
      </Switch>
    </HashRouter>
  );
}

export default Router;
