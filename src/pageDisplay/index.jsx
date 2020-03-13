/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { HashRouter, Route, useHistory } from 'react-router-dom';

import Router from '../router';
import Today from '../pages/Today/';
import YourDesk from '../pages/YourDesk';
import PerformanceRadar from '../pages/PerformanceRadar';
import Progress from '../pages/Progress';
import SuccessIndicators from '../pages/SuccessIndicators';
import Decisions from '../pages/Decisions';
import Loader from '../loader';

import { MainTitle, ChangeModeButton } from '../components';
import './styles.css';

class PageDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: this.getGreetingString(),
      isCompact: false,

      isLoading: true,
      hasAnimateDone: false,

      homeLoaded: false,
      yourDeskLoaded: false,
    };
  }

  componentDidMount() {
    this.loadResources();
  }

  /**
   * [TO BE CHANGED IN THE FUTURE] just returns the greeting to be shown on the page, obeying the rules we'll set
   * @return {string} [description]
   */
  getGreetingString() {
    return 'Olá Dr. Sidney, bom dia! ';
  }

  setExternalResourcesLoaded(resource) {
    this.setState({ [`${resource}Loaded`]: true });
  }

  animateDone() {
    this.setState({ hasAnimateDone: true });
  }

  async loadResources() {
    await new Promise(resolve => setTimeout(resolve, 5000));
    this.setState({ isLoading: false });
  }

  /**
   * Updates the state when the user goes from 'compacto' to 'dashboard' and vice versa
   * @return {Promise}
   */
  async handleModeChange() {
    return this.setState(prevState => ({ isCompact: !prevState.isCompact }));
  }

  renderLoader() {
    const { isLoading, hasAnimateDone } = this.state;

    return (
      (isLoading || !hasAnimateDone) && <Loader handleAnimateDone={() => this.animateDone()} />
    );
  }

  renderPorraToda() {
    const { greeting, isCompact } = this.state;

    return (
      <div className="outerView">
        <div className="mainView">
          <div className="headerView">
            <MainTitle value={greeting} />
          </div>

          {isCompact && (
            // MODO COMPACTO
            <div className="infoView">
              <Router handleModeChange={this.handleModeChange.bind(this)} />
            </div>
          )}

          {!isCompact && (
            // MODO DASHBOARD
            <div className="infoView">
              <HashRouter>
                <>
                  <ChangeModeButton cb={this.handleModeChange.bind(this)} />
                  <Route
                    path="/"
                    render={props => (
                      <Today
                        dashboard
                        loadedCallback={() => this.setExternalResourcesLoaded('home')}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path="/"
                    exact
                    render={props => (
                      <YourDesk
                        dashboard
                        loadedCallback={() => this.setExternalResourcesLoaded('yourDesk')}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path="/:tab"
                    exact
                    render={props => (
                      <YourDesk
                        dashboard
                        loadedCallback={() => this.setExternalResourcesLoaded('yourDesk')}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path="/:tab/:table"
                    exact
                    render={props => (
                      <YourDesk
                        dashboard
                        loadedCallback={() => this.setExternalResourcesLoaded('yourDesk')}
                        {...props}
                      />
                    )}
                  />
                  <Route path="/" render={props => <PerformanceRadar dashboard {...props} />} />
                  <Route path="/" render={props => <Progress dashboard {...props} />} />
                  <Route path="/" render={props => <SuccessIndicators dashboard {...props} />} />
                  <Route path="/" render={props => <Decisions dashboard {...props} />} />
                </>
              </HashRouter>
            </div>
          )}
        </div>

        <div className="alertsView">
          <div> ALERTS GO HERE!</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <>
        {this.renderLoader()}
        {this.renderPorraToda()}
      </>
    );
  }
}

export default PageDisplay;
