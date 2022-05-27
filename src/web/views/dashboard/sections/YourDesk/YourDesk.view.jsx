import React, { useEffect, useState } from 'react';
import { deskOuter, deskControlers, deskTabs, deskHeader } from './styles.module.css';
import { useAppContext } from '../../../../../core/app/App.context';
import { SectionTitle, Spinner } from '../../../../components';
import GenericTab from './GenericTab';
import ControlButton from './ControlButton';
import OpenCasesList from './OpenCasesList/OpenCasesList.view';
import Api from '../../../../api';
import { PIP_BUTTONS, TUTELA_BUTTONS, BUTTON_TEXTS, BUTTON_DICT } from './deskConstants';

function YourDesk() {
  const { currentOffice, buildRequestParams } = useAppContext();
  const [docsQuantity, setDocsQuantity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonList, setButtonList] = useState(false);
  const [activeTab, setActiveTab] = useState('openCases');
  const [tabDetail, setTabDetail] = useState({});

  useEffect(() => {
    getOpenCasesDetails();
    switch (currentOffice.tipo) {
      case 1:
        getTutela();
        break;
      case 2:
        document.documentElement.style.setProperty('--buttonBase', 131);
        getPip();
        break;
      default:
        break;
    }
  }, []);

  // function to get name of buttons Tutela
  function getTutela() {
    const buttons = TUTELA_BUTTONS;
    setButtonList(buttons);
    buttons.forEach((buttonName) => {
      getDocumentQuantity(buttonName);
    });
  }

  // function to get name of buttons Pip
  function getPip() {
    const buttons = PIP_BUTTONS;
    setButtonList(buttons);
    buttons.forEach((buttonName) => {
      getDocumentQuantity(buttonName);
    });
  }

  /**
   * Loads the quantity of each document type
   * @param {string} docName
   */
  async function getDocumentQuantity(docName) {
    const dbName = BUTTON_DICT[docName];
    let docQt;
    const updatedState = {};
    setLoading(true);
    try {
      docQt = await Api.getIntegratedDeskDocs({ ...buildRequestParams(), docType: dbName });
      updatedState[docName] = docQt;
      setDocsQuantity((prevState) => ({ ...prevState, ...updatedState }));
    } catch (e) {
      updatedState[docName] = undefined;
      setDocsQuantity((prevState) => ({ ...prevState, ...updatedState }));
    } finally {
      setLoading(false);
    }
  }

  async function getTabDetails(tabName) {
    const dbName = BUTTON_DICT[tabName];
    let tabData;
    const updatedState = {};
    setLoading(true);
    try {
      tabData = await Api.getIntegratedDeskDetails({ ...buildRequestParams(), docType: dbName });
      updatedState[tabName] = tabData;
      setTabDetail((prevState) => ({ ...prevState, ...updatedState }));
    } catch (e) {
      updatedState[tabName] = undefined;
      setTabDetail((prevState) => ({ ...prevState, ...updatedState }));
    } finally {
      setLoading(false);
    }
  }

  /**
   * Loads the data used in the OpenCases tab
   * @return {void} saves details to the state
   */
  async function getOpenCasesDetails() {
    let casesDetails;
    const updatedState = {};
    setLoading(true);
    try {
      casesDetails = await Api.getOpenCasesDetails(buildRequestParams());
      updatedState.openCases = casesDetails;
      setTabDetail((prevState) => ({ ...prevState, ...updatedState }));
    } catch (e) {
      updatedState.openCases = false;
      setTabDetail((prevState) => ({ ...prevState, ...updatedState }));
    } finally {
      setLoading(false);
    }
  }

  /**
   * Triggered by buttonPress, updates the state
   * @param  {string} tabName the name of the next active tab,
   * one of [openCases, openInvestigations, courtCases]
   * @return {void}
   */
  function handleChangeActiveTab(tabName) {
    setActiveTab(tabName);
    if (!tabDetail[tabName]) {
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

  if (loading && !buttonList) {
    return <Spinner size="large" />;
  }

  return (
    <article className={deskOuter}>
      <div className={deskHeader}>
        <SectionTitle value="Sua Mesa" glueToTop />
        <div className={deskControlers}>
          {buttonList.map((buttonTitle) => (
            <ControlButton
              key={BUTTON_TEXTS[buttonTitle]}
              isButton={!buttonTitle.includes('closedCases')}
              error={!docsQuantity[buttonTitle] && !loading}
              buttonPressed={() => handleChangeActiveTab(buttonTitle)}
              isActive={activeTab === buttonTitle}
              text={BUTTON_TEXTS[buttonTitle]}
              number={docsQuantity[buttonTitle]}
              loading={!docsQuantity[buttonTitle] && loading}
            />
          ))}
        </div>
      </div>
      <div className={deskTabs}>
        {activeTab === 'openCases' ? (
          <OpenCasesList
            buildRequestParams={buildRequestParams}
            chartData={tabDetail.openCases}
            isLoading={!tabDetail.openCases && loading}
          />
        ) : (
          <GenericTab
            {...tabDetail[activeTab]}
            tab={activeTab}
            tabTitle={[BUTTON_TEXTS[activeTab]]}
            error={!tabDetail[activeTab] && !loading}
          />
        )}
      </div>
    </article>
  );
}

export default YourDesk;
