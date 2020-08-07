import React from 'react';

import './styles.css';
import { useAuth } from '../../../app/authContext';
import { SectionTitle } from '../../../components';
import GenericTab from './GenericTab';
import ControlButton from './ControlButton';

import OpenCasesDetail from './openCasesDetail';

import Api from '../../../api';
import { capitalizeWord } from '../../../utils';

import { PIP_BUTTONS, TUTELA_BUTTONS, BUTTON_TEXTS, BUTTON_DICT } from './deskConstants';

class YourDesk extends React.Component {
  constructor(props) {
    super(props);
    this.type = props.currentOffice.tipo;
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
    const { buildRequestParams } = this.props;
    let doc;
    let docError = false;
    try {
      const params = { ...buildRequestParams(), docType: dbName };
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
    const { buildRequestParams } = this.props;
    let tabDetail;
    let tabDetailError = false;
    try {
      const params = { ...buildRequestParams(), docType: dbName };
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
    const { buildRequestParams } = this.props;
    let openCasesDetails;
    let openCasesDetailsError = false;
    try {
      openCasesDetails = await Api.getOpenCasesDetails(buildRequestParams());
    } catch (e) {
      openCasesDetailsError = true;
    } finally {
      this.setState({ openCasesDetails, openCasesDetailsError, openCasesDetailsLoading: false });
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
    const { buildRequestParams } = this.props;

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
              buildRequestParams={buildRequestParams}
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

export default function() {
  const { currentOffice, buildRequestParams } = useAuth();
  return <YourDesk currentOffice={currentOffice} buildRequestParams={buildRequestParams} />;
}
