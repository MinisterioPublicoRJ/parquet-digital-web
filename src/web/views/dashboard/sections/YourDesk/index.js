import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { useAppContext } from '../../../../../core/app/App.context';
import { SectionTitle, Spinner } from '../../../../components';
import GenericTab from './GenericTab';
import ControlButton from './ControlButton';
import OpenCasesDetail from './openCasesDetail';
import Api from '../../../../api';
import { capitalizeWord } from '../../../../utils';
import { PIP_BUTTONS, TUTELA_BUTTONS, BUTTON_TEXTS, BUTTON_DICT } from './deskConstants';

const propTypes = {
  currentOffice: PropTypes.shape({ tipo: PropTypes.number }).isRequired,
  setProcessDetail: PropTypes.func.isRequired,
};

function YourDesk() {
  const { currentOffice, buildRequestParams } = useAppContext();
  const [docs, setDocs] = useState([]);
  const [openCasesDetails, setOpenCasesDetails] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [buttonList, setButtonList] = useState(false);
  const [activeTab, setActiveTab] = useState('openCases');
  const [tabDetail, setTabDetail] = useState({});

  useEffect(() => {
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
    const bList = TUTELA_BUTTONS;
    setButtonList(bList);
    const newState = { bList };
    bList.forEach((buttonName) => {
      getDocument(buttonName);
      newState[`loading${capitalizeWord(buttonName)}`] = true;
    });
    return newState;
  }

  // function to get name of buttons Pip 
  function getPip() {
    const buttonList = PIP_BUTTONS;
    const newState = { buttonList };
    setButtonList(buttonList);
    buttonList.forEach((buttonName) => {
      getDocument(buttonName);
      newState[`loading${capitalizeWord(buttonName)}`] = true;
    });
    return newState;
  }

  async function getDocument(docName) {
    const dbName = BUTTON_DICT[docName];
    let doc;
    const updatedState = {};
    setLoading(true);
    try {
      doc = await Api.getIntegratedDeskDocs({ ...buildRequestParams(), docType: dbName });
      updatedState[docName] = doc;
      setDocs((prevState) => ({ ...prevState, ...updatedState }));
    } catch (e) {
      updatedState[docName] = undefined;
      setDocs((prevState) => ({ ...prevState, ...updatedState }));
    } finally {
      setLoading(false);
    }
  }

  async function getTabDetails(tabName) {
    const dbName = BUTTON_DICT[tabName];
    let tabData;
    let updatedState = {...tabDetail};
    console.log('tabDetail: ', tabDetail);
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
    setLoading(true);
    try {
      casesDetails = await Api.getOpenCasesDetails(buildRequestParams());
      console.log('casesDetails:', casesDetails);
      setOpenCasesDetails(casesDetails);
    } catch (e) {
      setOpenCasesDetails(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => getOpenCasesDetails(), []);

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
    return { activeTab: tabName };
  }

  if (loading && !buttonList) {
    return <Spinner size="large" />;
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
              error={!docs[buttonTitle]}
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

YourDesk.propTypes = propTypes;

export default function () {
  const { currentOffice, buildRequestParams } = useAppContext();
  return <YourDesk currentOffice={currentOffice} buildRequestParams={buildRequestParams} />;
}
