import React from 'react';

import Router from '../router';
import Today from '../pages/Today';
import YourDesk from '../pages/YourDesk';
import PerformanceRadar from '../pages/PerformanceRadar';
import Progress from '../pages/Progress';
import SuccessIndicators from '../pages/SuccessIndicators';
import Decisions from '../pages/Decisions';

import { MainTitle } from '../components/layoutPieces';
import './styles.css';

class PageDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: this.getGreetingString(),
      isCompact: true,
    };
  }

  /**
   * [TO BE CHANGED IN THE FUTURE] just returns the greeting to be shown on the page, obeying the rules we'll set
   * @return {[type]} [description]
   */
  getGreetingString() {
    return 'Olá Dr. Sidney, bom dia! ';
  }

  /**
   * Updates the state when the user goes from 'compacto' to 'dashboard' and vice versa
   * @return {[type]} [description]
   */
  handleModeChange() {
    this.setState(prevState => ({ isCompact: !prevState.isCompact }));
  }

  render() {
    const { greeting, isCompact } = this.state;
    return (
      <div className="outerView">
        <div className="mainView">
          <div className="headerView">
            <MainTitle value={greeting} />
            {/* <TouchableOpacity onPress={() => this.handleModeChange()}>
              <div>
                modo
                {isCompact ? ' dashboard' : ' compacto'}
              </div>
            </TouchableOpacity> */}
          </div>

          {isCompact && (
            <div className="infoView">
              <Router />
            </div>
          )}

          {!isCompact && (
            <div className="infoView">
              <Today dashboard />
              <YourDesk dashboard />
              <PerformanceRadar dashboard />
              <Progress dashboard />
              <SuccessIndicators dashboard />
              <Decisions dashboard />
            </div>
          )}
        </div>

        <div className="alertsView">
          <div> ALERTS GO HERE!</div>
        </div>
      </div>
    );
  }
}

export default PageDisplay;
