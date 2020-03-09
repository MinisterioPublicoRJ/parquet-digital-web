import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Today from '../pages/Today';
import YourDesk from '../pages/YourDesk';
import PerformanceRadar from '../pages/PerformanceRadar';
import Progress from '../pages/Progress';
import SuccessIndicators from '../pages/SuccessIndicators';
import Decisions from '../pages/Decisions';

import { NavBar } from '../components';

export default function Router() {
  return (
    <HashRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Today} />
        <Route path="/suamesa" exact component={YourDesk} />
        <Route path="/suamesa/:tab" exact component={YourDesk} />
        <Route path="/suamesa/:tab/:table" exact component={YourDesk} />
        <Route path="/radar" component={PerformanceRadar} />
        <Route path="/andamentos" component={Progress} />
        <Route path="/indicadores" component={SuccessIndicators} />
        <Route path="/decisoes" component={Decisions} />
      </Switch>
    </HashRouter>
  );
}
