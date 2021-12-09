import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { useAppContext } from '../../../../../core/app/App.context';
import { SectionTitle } from '../../../../components';
import GenericTab from './GenericTab';
import ControlButton from './ControlButton';
import OpenCasesDetail from './openCasesDetail';
import Api from '../../../../api';
import { capitalizeWord } from '../../../../utils';
import { PIP_BUTTONS, TUTELA_BUTTONS, BUTTON_TEXTS, BUTTON_DICT } from './deskConstants';

const propTypes = {
  currentOffice: PropTypes.shape({ tipo: PropTypes.number }).isRequired,
};

function YourDesk() {
  const { currentOffice, buildRequestParams } = useAppContext();
  const type = currentOffice ? currentOffice.tipo : undefined;
  const [docs, setDocs] = useState([]);
  const activeTab = 'openCases';

  // console.log(type);
  // Function to render type tutela or pip
  const renderProsecution = async () => {
    switch (type) {
      case 1:
        return getTutela();
      case 2:
        document.documentElement.style.setProperty('--buttonBase', 131);
        return getPip();
      default:
        break;
    }
    renderProsecution();
  };

  // useEffect(() => renderProsecution(), getOpenCasesDetails(), []);
  useEffect(() => renderProsecution(), []);

  // console.log(renderProsecution());

  // function to get names of buttons Tutela
  function getTutela() {
    const buttonList = TUTELA_BUTTONS;
    const newState = { buttonList };
    // console.log(newState);
    buttonList.forEach((buttonName) => {
      getDocument(buttonName);
      newState[`loading${capitalizeWord(buttonName)}`] = true;
    });
    return newState;
  }

  // function to get names of buttons Pip

  function getPip() {
    const buttonList = PIP_BUTTONS;
    const newState = { buttonList };
    // console.log(newState);
    buttonList.forEach((buttonName) => {
      getDocument(buttonName);
      newState[`loading${capitalizeWord(buttonName)}`] = true;
    });
    return newState;
  }

  function loadComponent(buttonName) {
    getPip(buttonName);
    getTutela(buttonName);
  }
  useEffect(() => loadComponent(), []);

  async function getDocument(docName) {
    const dbName = BUTTON_DICT[docName];
    let doc;
    let docError = false;
    try {
      const params = { ...buildRequestParams(), docType: dbName };
      doc = await Api.getIntegratedDeskDocs(params);
      setDocs(params);
    } catch (e) {
      docError = true;
    } finally {
      const updatedState = {};
      updatedState[docName] = doc;
      updatedState[`loading${capitalizeWord(docName)}`] = false;
      updatedState[`error${capitalizeWord(docName)}`] = docError;

      setDocs(updatedState);
      console.log(updatedState);
    }
  }

  /* async function getTabDetails(tabName) {
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
  } */

  /**
   * Loads the data used in the OpenCases tab
   * @return {void} saves details to the state
   */
  /* async function getOpenCasesDetails() {
    let openCasesDetails;
    let openCasesDetailsError = false;
    try {
      openCasesDetails = await Api.getOpenCasesDetails(buildRequestParams());
    } catch (e) {
      openCasesDetailsError = true;
    } finally {
      return  openCasesDetails, openCasesDetailsError, openCasesDetailsLoading: false ;
    }
  } */

  /**
   * Triggered by buttonPress, updates the state
   * @param  {string} tabName the name of the next active tab,
   * one of [openCases, openInvestigations, courtCases]
   * @return {void}
   */
  function handleChangeActiveTab(tabName) {
    if (!tabName) {
      switch (tabName) {
        case 'openCases':
          // getOpenCasesDetails();
          break;
        default:
          // getTabDetails(tabName);
          break;
      }
    }
    // this.setState({ activeTab: tabName });
  }
  let buttonList;
  // console.log(buttonList);
  if (!buttonList) {
    return <div>loading...</div>;
  }
  return (
    <article className="desk-outer">
      <div className="desk-header">
        <SectionTitle value="Sua Mesa" glueToTop />
        <div className="desk-controlers">
          {buttonList.map((buttonTitle) => (
            <ControlButton
              key={BUTTON_TEXTS[buttonTitle]}
              isButton={!buttonTitle.includes('closedCases')}
              error={[`error${capitalizeWord(buttonTitle)}`]}
              buttonPressed={() => handleChangeActiveTab(buttonTitle)}
              isActive={activeTab === buttonTitle}
              text={BUTTON_TEXTS[buttonTitle]}
              number={[buttonTitle]}
              loading={[`loading${capitalizeWord(buttonTitle)}`]}
            />
          ))}
        </div>
      </div>
      <div className="desk-tabs">
        {activeTab === 'openCases' ? (
          <OpenCasesDetail
            buildRequestParams={buildRequestParams}
            // chartData={openCasesDetails || {}}
            // isLoading={!openCasesDetails && !openCasesDetailsError}
          />
        ) : (
          <GenericTab
            // {...this.state[`${activeTab}Details`]}
            tab={activeTab}
            tabTitle={BUTTON_TEXTS[activeTab]}
            error={[`error${capitalizeWord(activeTab)}Details`]}
          />
        )}
      </div>
    </article>
  );
}

YourDesk.propTypes = propTypes;

export default function () {
  const { currentOffice, buildRequestParams } = useAppContext();
  return <YourDesk currentOffice={currentOffice} buildRequestParams={buildRequestParams} />;
}
