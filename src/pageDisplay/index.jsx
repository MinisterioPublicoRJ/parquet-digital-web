/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { HashRouter, Route, useHistory } from 'react-router-dom';

import { SectionTitle } from '../components';

import Router from '../router';
import Today from '../pages/Today/';
import YourDesk from '../pages/YourDesk';
import PerformanceRadar from '../pages/PerformanceRadar';
import Progress from '../pages/Progress';
import SuccessIndicators from '../pages/SuccessIndicators';
import Decisions from '../pages/Decisions';

import { MainTitle, ChangeModeButton } from '../components';
import './styles.css';

class PageDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: this.getGreetingString(),
      isCompact: false,
    };
  }

  /**
   * [TO BE CHANGED IN THE FUTURE] just returns the greeting to be shown on the page, obeying the rules we'll set
   * @return {string} [description]
   */
  getGreetingString() {
    return 'Olá Dr. Sidney, bom dia! ';
  }

  /**
   * Updates the state when the user goes from 'compacto' to 'dashboard' and vice versa
   * @return {Promise}
   */
  async handleModeChange() {
    return this.setState(prevState => ({ isCompact: !prevState.isCompact }));
  }

  render() {
    const { greeting, isCompact } = this.state;
    return (
      <div className="outerGridView">
        <div className="headerGridView">
          <MainTitle value={greeting} />
        </div>

        {isCompact && (
          // MODO COMPACTO
          <div className="infoGridView">
            <Router handleModeChange={this.handleModeChange.bind(this)} />
          </div>
        )}

        {!isCompact && (
          // MODO DASHBOARD
          <div className="infoGridView">
            <HashRouter>
              <>
                <ChangeModeButton cb={this.handleModeChange.bind(this)} />
                <Route path="/" render={props => <Today dashboard {...props} />} />
                <Route path="/" exact render={props => <YourDesk dashboard {...props} />} />
                <Route path="/:tab" exact render={props => <YourDesk dashboard {...props} />} />
                <Route
                  path="/:tab/:table"
                  exact
                  render={props => <YourDesk dashboard {...props} />}
                />
                <Route path="/" render={props => <PerformanceRadar dashboard {...props} />} />
                <Route path="/" render={props => <Progress dashboard {...props} />} />
                <Route path="/" render={props => <SuccessIndicators dashboard {...props} />} />
                <Route path="/" render={props => <Decisions dashboard {...props} />} />
              </>
            </HashRouter>
          </div>
        )}
        <div className="radarGridView">
          <div>
            <SectionTitle value="RADAR GOES HERE!" />
          </div>
        </div>
        <div className="alertsGridView">
          <div>
            <SectionTitle value="ALERTAS GOES HERE!" />
          </div>
        </div>
        <div className="andamentosGridView">
          <SectionTitle value="ANDAMENTOS GOES HERE!" />
        </div>
        <div className="indicadoresGridView">
          <SectionTitle value="INDICADORES GOES HERE!" />
        </div>
        <div className="decisaoGridView">
          <SectionTitle value="DECISAO GOES HERE!" />
        </div>
      </div>
    );
  }
}

export default PageDisplay;
