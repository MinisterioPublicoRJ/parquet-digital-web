import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import { SectionTitle, ControlButton } from '../../components';
import Api from '../../api';
import { getUser } from '../../user';

class YourDesk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingOpenCases: true,
      loadingOpenInvestigations: true,
      loadingCourtCases: true,
      loadingClosedCases: true,
      activeTab: 'openCases',
    };
  }

  componentDidMount() {
    this.getOpenCases();
    this.getOpenInvestigations();
    this.getClosedCases();
    this.getCourtCases();
  }

  /**
   * load the number of open cases for the first button
   * @return {void} just saves it to the state
   */
  async getOpenCases() {
    let openCases;
    let errorOpenCases = false;
    try {
      openCases = await Api.getOpenCases(getUser());
    } catch (e) {
      errorOpenCases = true;
    } finally {
      this.setState({ openCases, errorOpenCases, loadingOpenCases: false });
    }
  }

  /**
   * load the number of open investigations for the second button
   * @return {void} just saves it to the state
   */
  async getOpenInvestigations() {
    let openInvestigations;
    let errorOpenInvestigations = false;
    try {
      openInvestigations = await Api.getOpenInvestigations(getUser());
    } catch (e) {
      errorOpenInvestigations = true;
    } finally {
      this.setState({
        openInvestigations,
        errorOpenInvestigations,
        loadingOpenInvestigations: false,
      });
    }
  }

  /**
   * load the number of cases in court for the third button
   * @return {void} just saves it to the state
   */
  async getCourtCases() {
    let courtCases;
    let errorCourtCases;
    try {
      courtCases = await Api.getCourtCases(getUser());
    } catch (e) {
      errorCourtCases = true;
    } finally {
      this.setState({ courtCases, errorCourtCases, loadingCourtCases: false });
    }
  }

  /**
   * load the number of recently closed cases for the last box
   * @return {void} just saves it to the state
   */
  async getClosedCases() {
    let closedCases;
    let errorClosedCases;
    try {
      closedCases = await Api.getClosedCases(getUser());
    } catch (e) {
      errorClosedCases = true;
    } finally {
      this.setState({ closedCases, loadingClosedCases: false, errorClosedCases });
    }
  }

  handleChangeActiveTab(tabName) {
    console.log('buttonPressed ', tabName);
    if (!this.state[tabName]) {
      switch (tabName) {
        case 'openCases':
          this.getOpenCases();
          break;
        case 'openInvestigations':
          this.getOpenInvestigations();
          break;
        case 'courtCases':
          this.getCourtCases();
          break;
        case 'closedCases':
          this.getClosedCases();
          break;
      }
    }
    this.setState({ activeTab: tabName });
  }

  render() {
    const {
      activeTab,
      closedCases,
      courtCases,
      openInvestigations,
      openCases,
      loadingOpenCases,
      loadingOpenInvestigations,
      loadingCourtCases,
      loadingClosedCases,
    } = this.state;

    return (
      <article className="yourDesk">
        <SectionTitle value="Sua Mesa" />
        <div className="desk-controlers">
          <ControlButton
            isButton
            buttonPressed={() => this.handleChangeActiveTab('openCases')}
            isActive={activeTab === 'openCases'}
            text={`vistas\nabertas`}
            number={openCases}
            loading={loadingOpenCases}
          />
          <ControlButton
            isButton
            buttonPressed={() => this.handleChangeActiveTab('openInvestigations')}
            isActive={activeTab === 'openInvestigations'}
            text={`investigações\nem curso`}
            number={openInvestigations}
            loading={loadingOpenInvestigations}
          />
          <ControlButton
            isButton
            buttonPressed={() => this.handleChangeActiveTab('courtCases')}
            isActive={activeTab === 'courtCases'}
            text={`processos\nem juízo`}
            number={courtCases}
            loading={loadingCourtCases}
          />
          <ControlButton
            text={`finalizados\núltimos 30 dias`}
            number={closedCases}
            loading={loadingClosedCases}
          />
        </div>
        <div className="desk-tabs"></div>
      </article>
    );
  }
}

export default YourDesk;
