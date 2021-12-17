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
  const [openCasesDetails, setOpenCasesDetails] = useState([]);
  const [tabDetails, setTabDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonList, setButtonList] = useState(false);
  const [activeTab, setActiveTab] = useState('openCases');

  // console.log(type);
  // Function to render type tutela or pip
  const renderProsecution = async () => {
    console.log('rendering');
    switch (type) {
      case 1:
        return getTutela();
      case 2:
        document.documentElement.style.setProperty('--buttonBase', 131);
        return getPip();
      default:
        break;
    }
  };
  useEffect(() => renderProsecution(), []);

  // function to get names of buttons Tutela
  function getTutela() {
    const bList = TUTELA_BUTTONS;
    setButtonList(bList);
    const newState = { bList };
    bList.forEach((buttonName) => {
      getDocument(buttonName);
      newState[`loading${capitalizeWord(buttonName)}`] = true;
    });
    return newState;
  }

  // function to get names of buttons Pip o Tutela
  function getPip() {
    const buttonList = PIP_BUTTONS;
    const newState = { buttonList };
    setButtonList(buttonList);
    // console.log(newState);
    buttonList.forEach((buttonName) => {
      getDocument(buttonName);
      newState[`loading${capitalizeWord(buttonName)}`] = true;
    });
    return newState;
  }

 
  async function getDocument(docName) {
    const dbName = BUTTON_DICT[docName];
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
      updatedState[`${capitalizeWord(docName)}`] = docError;
      setDocs((prevState) => ({ ...prevState, ...updatedState }));
      // console.log('updatedState: ', updatedState);
    }
  }

  async function getTabDetails(tabName) {
    const dbName = BUTTON_DICT[tabName];
    let tabDetail;
    let tabDetailError = false;
    try {
      const params = { ...buildRequestParams(), docType: dbName };
      tabDetail = await Api.getIntegratedDeskDetails(params);
      console.log('tabDetails', params);
    } catch (e) {
      tabDetailError = true;
    } finally {
      const updatedState = {};
      updatedState[`${tabName}Details`] = tabDetail;
      updatedState[`loading${capitalizeWord(tabName)}Details`] = false;
      updatedState[`error${capitalizeWord(tabName)}Details`] = tabDetailError;
      setTabDetails(updatedState);
    }
  }

  /**
   * Loads the data used in the OpenCases tab
   * @return {void} saves details to the state
   */
  async function getOpenCasesDetails() {
    let casesDetails;
    setLoading(true);
    try {
      casesDetails = await Api.getOpenCasesDetails(buildRequestParams());
      console.log(casesDetails);
      setOpenCasesDetails(casesDetails);
    } catch (e) {
      setOpenCasesDetails(false);
    } finally {
      setLoading(false);
    }
  }
  function loadComponent() {
    getOpenCasesDetails(openCasesDetails);
  }
  useEffect(() => loadComponent(), []);

  /**
   * Triggered by buttonPress, updates the state
   * @param  {string} tabName the name of the next active tab,
   * one of [openCases, openInvestigations, courtCases]
   * @return {void}
   */
  function handleChangeActiveTab(tabName) {
    setActiveTab(tabName);
    if (!tabName) {
      switch (tabName) {
        case 'openCases':
          getOpenCasesDetails();
          break;
        default:
          getTabDetails(tabName);
          break;
      }
    }
  }
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
              error={docs[`error${capitalizeWord(buttonTitle)}`]}
              buttonPressed={() => handleChangeActiveTab(buttonTitle)}
              isActive={activeTab === buttonTitle}
              text={BUTTON_TEXTS[buttonTitle]}
              number={docs[buttonTitle]}
              loading={docs[`loading${capitalizeWord(buttonTitle)}`]}
            />
          ))}
        </div>
      </div>
      <div className="desk-tabs">
        {activeTab === 'openCases' ? (
          <OpenCasesDetail
            buildRequestParams={buildRequestParams}
            chartData={openCasesDetails || {}}
            isLoading={!openCasesDetails}
          />
        ) : (
          <GenericTab
            tab={[`${activeTab}Details`]}
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
