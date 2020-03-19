/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */

// TODO: this component deserve more love, docs and abstractions
// FIXME: remove the comment that disables eslint react/jsx-no-bind
import React from 'react';
import Typist from 'react-typist';
import { HashRouter, Route } from 'react-router-dom';

import Router from '../router';
import Today from '../pages/Today/';
import YourDesk from '../pages/YourDesk';
import PerformanceRadar from '../pages/PerformanceRadar';
import Progress from '../pages/Progress';
import SuccessIndicators from '../pages/SuccessIndicators';
import Decisions from '../pages/Decisions';
import Loader from '../loader';
import Api from '../api';
import { getUser } from '../user';

import { MainTitle, ChangeModeButton } from '../components';
import './styles.css';

class PageDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      isCompact: false,

      isLogging: true,
      hasAnimateDone: false,
      loginError: false,

      homeLoaded: false,
      yourDeskLoaded: false,
    };
  }

  componentDidMount() {
    this.loadResources();
  }

  setExternalResourcesLoaded(resource) {
    this.setState({ [`${resource}Loaded`]: true });
  }

  /**
   * Returns the greeting to be shown on the page
   * @return {string} [description]
   */
  getGreeting() {
    const { user } = this.state;

    if (user) {
      const hours = new Date().getHours();

      if (hours < 12) return `Olá, ${user}, bom dia!`;

      if (hours > 17) return `Olá, ${user}, boa noite!`;

      return `Olá, ${user}, boa tarde!`;
    }

    return undefined;
  }

  async loadResources() {
    return this.login();
  }

  async login() {
    try {
      await Api.login(window.localStorage.getItem('access_token'));
      return this.setState({ isLogging: false, user: getUser().nome });
    } catch (e) {
      console.error('PageDisplay#login error', e);
      return this.setState({ isLogging: false, loginError: true });
    }
  }

  animateDone() {
    this.setState({ hasAnimateDone: true });
  }

  /**
   * Updates the state when the user goes from 'compacto' to 'dashboard' and vice versa
   * @return {Promise}
   */
  async handleModeChange() {
    return this.setState(prevState => ({ isCompact: !prevState.isCompact }));
  }

  renderLoader() {
    const { isLogging, hasAnimateDone, loginError, homeLoaded, yourDeskLoaded } = this.state;

    if (loginError) return null;

    return (
      (isLogging || !hasAnimateDone || !homeLoaded || !yourDeskLoaded) && (
        <div className="loading-wrapper">
          <Loader handleAnimateDone={() => this.animateDone()} />
        </div>
      )
    );
  }

  renderLoginError() {
    const { loginError } = this.state;

    if (loginError)
      return (
        <div className="loading-wrapper">
          <Typist
            // TODO: abstract tis to a generic component
            className="loading-page"
            // FIXME: find why cursor animation isnt working
            cursor={{
              show: true,
              blink: false,
              element: '_',
              hideWhenDone: false,
              hideWhenDoneDelay: 1000,
            }}
          >
            <p className="paragraphWrapper">
              &gt; Infelizmente houve um problema com o login, tente recarregar a página ou entre em
              contato com o suporte. =[
            </p>

            <p className="paragraphWrapper">&gt; _</p>
          </Typist>
        </div>
      );

    return null;
  }

  renderPromotron() {
    const { isCompact, isLogging, loginError } = this.state;

    if (isLogging || loginError) return null;

    const greeting = this.getGreeting();

    return (
      <div className="outerView">
        <div className="mainView">
          <div className="headerView">
            <MainTitle value={greeting || 'Bom dia, Dr. Sydney, seja bem-vindo.'} />
            {/* FIXME:remove this hardcoded string when login is ready ^ */}
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
        {this.renderLoginError()}
        {this.renderPromotron()}
      </>
    );
  }
}

export default PageDisplay;
