/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { HashRouter, Route, useHistory } from 'react-router-dom';

import { SectionTitle, MainTitle, ChangeModeButton } from '../components';

import Router from '../router';
import Today from '../pages/Today';
import YourDesk from '../pages/YourDesk';
import PerformanceRadar from '../pages/PerformanceRadar';
import Progress from '../pages/Progress';
import SuccessIndicators from '../pages/SuccessIndicators';
import Decisions from '../pages/Decisions';
import Header from '../components/header/index';

import './styles.css';
import './grid.css';

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
      <div>
        <Header />
        <div className="">
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
                  <div className="resumeGridView">
                    <Route path="/" render={props => <Today dashboard {...props} />} />
                  </div>
                  <div className="yourDeskGridView">
                    <Route path="/" exact render={props => <YourDesk dashboard {...props} />} />
                    <Route path="/:tab" exact render={props => <YourDesk dashboard {...props} />} />
                    <Route
                      path="/:tab/:table"
                      exact
                      render={props => <YourDesk dashboard {...props} />}
                    />
                  </div>
                  <div className="alertsGridView">
                    <p>Central de alertas</p>
                  </div>
                  <div className="radarGridView">
                    <p>Radar de perfomance</p>
                    <Route path="/" render={props => <PerformanceRadar dashboard {...props} />} />
                  </div>
                  <div className="indicadoresGridView">
                    <p>Indicadores de sucesso</p>
                    <Route path="/" render={props => <SuccessIndicators dashboard {...props} />} />
                  </div>
                  <div className="decisaoGridView">
                    <p>Aguardando decisão</p>
                    <Route path="/" render={props => <Decisions dashboard {...props} />} />
                  </div>
                </>
              </HashRouter>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default PageDisplay;
