import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import {
  SectionTitle,
  ControlButton,
  OpenCasesDetail,
  OpenInvestigationsDetail,
  CourtCasesDetail,
} from '../../components';
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
    this.getOpenCasesDetails();
    this.getOpenInvestigations();
    this.getCourtCases();
    this.getClosedCases();
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
   * [getOpenCasesDetails description]
   * @return {void} saves details to the state
   */
  async getOpenCasesDetails() {
    let openCasesDetails;
    let openCasesDetailsError = false;
    try {
      openCasesDetails = await Api.getOpenCasesDetails(getUser());
    } catch (e) {
      openCasesDetailsError = true;
    } finally {
      this.setState({ openCasesDetails, openCasesDetailsError, openCasesDetailsLoading: false });
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

  async getOpenInvestigationsDetails() {
    let openInvestigationsDetails;
    let errorOpenInvestigationsDetails = false;
    try {
      openInvestigationsDetails = await Api.getOpenInvestigationsDetails(getUser());
    } catch (e) {
      errorOpenInvestigationsDetails = true;
    } finally {
      this.setState({
        openInvestigationsDetails,
        errorOpenInvestigationsDetails,
        loadingOpenInvestigationsDetails: false,
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

  async getCourtCasesDetails() {
    let courtCasesDetails;
    let errorCourtCasesDetails;
    try {
      courtCasesDetails = await Api.getCourtCasesDetails(getUser());
    } catch (e) {
      errorCourtCasesDetails = true;
    } finally {
      this.setState({ courtCasesDetails, errorCourtCasesDetails, loadingCourtCasesDetails: false });
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
    if (!this.state[`${tabName}Details`]) {
      switch (tabName) {
        case 'openCases':
          this.getOpenCasesDetails();
          break;
        case 'openInvestigations':
          this.getOpenInvestigationsDetails();
          break;
        case 'courtCases':
          this.getCourtCasesDetails();
          break;
        default:
          break;
      }
    }
    this.setState({ activeTab: tabName });
  }

  render() {
    const {
      activeTab,
      openCases,
      openCasesDetails,
      openCasesDetailsError,
      loadingOpenCases,
      openInvestigations,
      openInvestigationsDetails,
      openInvestigationsDetailsError,
      loadingOpenInvestigations,
      courtCases,
      courtCasesDetails,
      courtCasesDetailsError,
      loadingCourtCases,
      closedCases,
      loadingClosedCases,
    } = this.state;

    return (
      <article className="yourDesk">
        <div className="desk-header">
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
        </div>
        <div className="desk-tabs">
          {activeTab === 'openCases' && (
            <OpenCasesDetail
              getUser={getUser}
              chartData={openCasesDetails}
              isLoading={!openCasesDetails && !openCasesDetailsError}
            />
          )}
          {activeTab === 'openInvestigations' && (
            <OpenInvestigationsDetail
              data={openInvestigationsDetails}
              isLoading={!openInvestigationsDetails && !openInvestigationsDetailsError}
            />
          )}
          {activeTab === 'courtCases' && (
            <CourtCasesDetail
              data={courtCasesDetails}
              isLoading={!courtCasesDetails && !courtCasesDetailsError}
            />
          )}
        </div>
      </article>
    );
  }
}

export default YourDesk;
