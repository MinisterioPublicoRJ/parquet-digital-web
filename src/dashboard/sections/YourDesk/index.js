import React from 'react';

import './styles.css';
import { SectionTitle, ControlButton, OpenCasesDetail, GenericTab } from '../../components';
import Api from '../../api';
import { getUser } from '../../user';
import { capitalizeWord } from '../../utils';

import { PIP_BUTTONS, TUTELA_BUTTONS, BUTTON_TEXTS, BUTTON_DICT } from './deskConstants';

class YourDesk extends React.Component {
  constructor(props) {
    super(props);
    const user = getUser();
    this.user = user;
    this.type = user.tipo_orgao;
    this.state = {
      activeTab: 'openCases',
    };
  }

  componentDidMount() {
    switch (this.type) {
      case 1:
        this.getTutela();
        break;
      case 2:
        document.documentElement.style.setProperty('--buttonBase', 131);
        this.getPip();
        break;
      default:
        break;
    }
    // same endpoint for everyone
    this.getOpenCasesDetails();
  }

  getTutela() {
    const buttonList = TUTELA_BUTTONS;
    const newState = { buttonList };

    buttonList.forEach(buttonName => {
      this.getDocument(buttonName);
      newState[`loading${capitalizeWord(buttonName)}`] = true;
    });

    this.setState(newState);
  }

  getPip() {
    const buttonList = PIP_BUTTONS;
    const newState = { buttonList };

    buttonList.forEach(buttonName => {
      this.getDocument(buttonName);
      newState[`loading${capitalizeWord(buttonName)}`] = true;
    });

    this.setState(newState);
  }

  async getDocument(docName) {
    const dbName = BUTTON_DICT[docName];
    let doc;
    let docError = false;
    try {
      const params = { ...this.user, docType: dbName };
      doc = await Api.getIntegratedDeskDocs(params);
    } catch (e) {
      docError = true;
    } finally {
      const updatedState = {};
      updatedState[docName] = doc;
      updatedState[`loading${capitalizeWord(docName)}`] = false;
      updatedState[`error${capitalizeWord(docName)}`] = docError;

      this.setState(updatedState);
    }
  }

  async getTabDetails(tabName) {
    const dbName = BUTTON_DICT[tabName];
    let tabDetail;
    let tabDetailError = false;
    try {
      const params = { ...this.user, docType: dbName };
      tabDetail = await Api.getIntegratedDeskDetails(params);
    } catch (e) {
      tabDetailError = true;
    } finally {
      const updatedState = {};
      updatedState[`${tabName}Details`] = tabDetail;
      updatedState[`loading${capitalizeWord(tabName)}Details`] = false;
      updatedState[`error${capitalizeWord(tabName)}Details`] = tabDetailError;

      this.setState(updatedState);
    }
  }

  /**
   * Loads the data used in the OpenCases tab
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
   * Loads the data used in the openInvestigations tab
   * @return {void} saves details to the state
   */
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

  /** Loads the data used in the OpenCases tab
   * @return {void} saves details to the state
   */
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
   * Triggered by buttonPress, updates the state
   * @param  {string} tabName the name of the next active tab,
   * one of [openCases, openInvestigations, courtCases]
   * @return {void}
   */
  handleChangeActiveTab(tabName) {
    if (!this.state[`${tabName}Details`]) {
      switch (tabName) {
        case 'openCases':
          this.getOpenCasesDetails();
          break;
        default:
          this.getTabDetails(tabName);
          break;
      }
    }
    this.setState({ activeTab: tabName });
  }

  render() {
    const { activeTab, buttonList, openCasesDetails, openCasesDetailsError } = this.state;

    if (!buttonList) {
      return <div>loading...</div>;
    }

    return (
      <article className="desk-outer">
        <div className="desk-header">
          <SectionTitle value="Sua Mesa" glueToTop />
          <div className="desk-controlers">
            {buttonList.map(buttonTitle => (
              <ControlButton
                isButton={!buttonTitle.includes('closedCases')}
                error={this.state[`error${capitalizeWord(buttonTitle)}`]}
                buttonPressed={() => this.handleChangeActiveTab(buttonTitle)}
                isActive={activeTab === buttonTitle}
                text={BUTTON_TEXTS[buttonTitle]}
                number={this.state[buttonTitle]}
                loading={this.state[`loading${capitalizeWord(buttonTitle)}`]}
              />
            ))}
          </div>
        </div>
        <div className="desk-tabs">
          {activeTab === 'openCases' ? (
            <OpenCasesDetail
              getUser={getUser}
              chartData={openCasesDetails || []}
              isLoading={!openCasesDetails && !openCasesDetailsError}
            />
          ) : (
            <GenericTab
              {...this.state[`${activeTab}Details`]}
              tab={activeTab}
              tabTitle={BUTTON_TEXTS[activeTab]}
              error={this.state[`error${capitalizeWord(activeTab)}Details`]}
            />
          )}
        </div>
      </article>
    );
  }
}

export default YourDesk;
