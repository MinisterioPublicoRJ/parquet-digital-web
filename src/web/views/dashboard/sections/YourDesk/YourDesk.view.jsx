/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  deskOuter,
  deskButtonsTextsHeader,
  deskControlers,
  deskTabs,
  deskHeader,
  hide, 
  componentWrapper
} from './styles.module.css';
import { useAppContext } from '../../../../../core/app/App.context';
import { SectionTitle, Spinner } from '../../../../components';
import GenericTab from './GenericTab';
import MainButtons from './MainButtonsYourdesk';
import ControlButton from './ControlButton';
import OpenCasesList from './OpenCasesList/OpenCasesList.view';
import Api from '../../../../api';
import TablesTutela from '../TablesTutela';
import MainInvestigated from '../MainInvestigated';
import ProcessListCriminal from '../ProcessListCriminal';
import {
  PIP_DESK_BUTTONS,
  PIP_COLLECTION_BUTTONS,
  TUTELA_DESK_BUTTONS,
  TUTELA_COLLECTION_BUTTONS,
  CRIMINAL_DESK_BUTTONS,
  CRIMINAL_COLLECTION_BUTTONS,
  BUTTON_TEXTS,
  BUTTON_DICT,
  CONTROL_BUTTONS,
} from './deskConstants';


function YourDesk() {
  const { currentOffice, buildRequestParams } = useAppContext();
  const [docsQuantity, setDocsQuantity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonListControl, setButtonListControl] = useState(false);
  const [deskButtonList, setDeskButtonList] = useState(false);
  const [collectionButtonList, setCollectionButtonList] = useState(false);
  const [activeTab, setActiveTab] = useState('desk');
  const [tabDetail, setTabDetail] = useState({});
  //const [collectionTable, setCollectionTable] = useState();
  const collectionTable = getCollectionTable();

  useEffect(() => {
    getOpenCasesDetails();
    getButtons();
    getButtonsControl()
  }, []);

  function getButtonsControl(){
    let buttonControl;
    if(currentOffice.tipo){
      buttonControl =  CONTROL_BUTTONS;
    }
    setButtonListControl(buttonControl);
    buttonControl.forEach((buttonName) => {
    getDocumentQuantity(buttonName);
  }); 
  }
 
  function getButtons() {
    let buttons, deskButtons, collectionButtons;
    switch (currentOffice.tipo) {
      case 1:
        deskButtons = TUTELA_DESK_BUTTONS;
        collectionButtons = TUTELA_COLLECTION_BUTTONS;
        break;
      case 2:
        deskButtons = PIP_DESK_BUTTONS;
        collectionButtons = PIP_COLLECTION_BUTTONS;
        break;
      case 7:
        deskButtons = CRIMINAL_DESK_BUTTONS;
        collectionButtons = CRIMINAL_COLLECTION_BUTTONS;
        break;
      default: 
        break;
    }

    setDeskButtonList(deskButtons);
    setCollectionButtonList(collectionButtons);
    deskButtons.forEach((buttonName) => {
      getDocumentQuantity(buttonName);
    });       
    collectionButtons.forEach((buttonName) => {
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

  
  function getCollectionTable() {
    const updatedState = {};

    switch (currentOffice.tipo) {
      case 1:
        return <TablesTutela />;
        break;
      case 2:
        return <MainInvestigated />;
        break;
      case 7:
        return <ProcessListCriminal />;
        break;
      default:
        return 0;
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
        case 'openCases' || 'desk':
          getOpenCasesDetails();
          break;
        case 'collection':
          getCollectionTable();
          break;
        default:
          getTabDetails(tabName);
          break;
      }
    }
  }

  if (loading && !deskButtonList && !buttonListControl) {
    return <Spinner size="large" />;
  }


  return (
    <article className={deskOuter}>
      <div className={deskHeader}>
        <SectionTitle value="SELECIONE SUA VISUALIZAÇÃO:" glueToTop />
        <div className={deskControlers}>
          {buttonListControl.map((buttonTitle) => (
            <ControlButton
              key={BUTTON_TEXTS[buttonTitle]}
              isButton={!buttonTitle.includes('closedCases')}
              buttonPressed={() => handleChangeActiveTab(buttonTitle)}
              isActive={activeTab === buttonTitle}
              text={BUTTON_TEXTS[buttonTitle]}
            />
          ))}
        </div>

      </div>
      <div className={deskTabs}>
      <div className={`${componentWrapper} ${activeTab === 'openCases' || activeTab === 'desk' ? '' : hide}`}>
        <div className={deskButtonsTextsHeader}>
        {deskButtonList.map((buttonTitle) => (
            <MainButtons
              key={BUTTON_TEXTS[buttonTitle]}
              text={BUTTON_TEXTS[buttonTitle]}
              number={docsQuantity[buttonTitle]}
              error={!docsQuantity[buttonTitle] && !loading}
            />
          ))}
        </div>
          
          <OpenCasesList
            buildRequestParams={buildRequestParams}
            chartData={tabDetail.openCases}
            isLoading={!tabDetail.openCases && loading}
          />

        </div>
        <div className={`${componentWrapper} ${activeTab === 'collection' ? '' : hide}`}>
        <div className={deskButtonsTextsHeader}>
        {collectionButtonList.map((buttonTitle) => (
            <MainButtons
              key={BUTTON_TEXTS[buttonTitle]}
              text={BUTTON_TEXTS[buttonTitle]}
              number={docsQuantity[buttonTitle]}
              error={!docsQuantity[buttonTitle] && !loading}
            />
          ))}
        </div>
          {collectionTable}
        </div>
      </div>
    </article>
  );
}

export default YourDesk;
