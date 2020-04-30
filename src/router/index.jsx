import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Today from '../sections/Today';
import YourDesk from '../sections/YourDesk';
import PerformanceRadar from '../sections/PerformanceRadar';
import Progress from '../sections/Progress';
import SuccessIndicators from '../sections/SuccessIndicators';
import Decisions from '../sections/Decisions';

import { NavBar, ChangeModeButton } from '../components';

export default function Router({ handleModeChange }) {
  return (
    <HashRouter>
      <ChangeModeButton cb={handleModeChange} isCompact />
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
