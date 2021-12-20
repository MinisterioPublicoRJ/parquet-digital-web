import React, { useEffect, useState, useRef } from 'react';
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

function YourDesk({ setProcessDetail }) {
  const { currentOffice, buildRequestParams } = useAppContext();
  const [docs, setDocs] = useState([]);
  const [openCasesDetails, setOpenCasesDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonList, setButtonList] = useState(false);
  const [activeTab, setActiveTab] = useState('openCases');

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
    setLoading(true);
    try {
      doc = await Api.getIntegratedDeskDocs({ ...buildRequestParams(), docType: dbName });
      // console.log(doc)
      const updatedState = {};
      updatedState[docName] = doc;
      updatedState[`loading${capitalizeWord(docName)}`] = false;
      updatedState[`${capitalizeWord(docName)}`] = docError;
      setDocs((prevState) => ({ ...prevState, ...updatedState }));
    } catch (e) {
      docError = true;
      setDocs(false);
    } finally {
      setLoading(false);
    }
  }

  async function getTabDetails(tabName) {
    const dbName = BUTTON_DICT[tabName];
    let tabDetail;
    let tabDetailError = false;
    setLoading(true);
    try {
      tabDetail = await Api.getIntegratedDeskDetails({ ...buildRequestParams(), docType: dbName });
      console.log(tabDetail);
      const updatedState = {};
      updatedState[`${tabName}Details`] = tabDetail;
      updatedState[`loading${capitalizeWord(tabName)}Details`] = false;
      updatedState[`error${capitalizeWord(tabName)}Details`] = tabDetailError;
      setActiveTab((prevState) => ({ ...prevState, ...updatedState }));
    } catch (e) {
      tabDetailError = true;
      setActiveTab(false);
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
      // console.log(casesDetails)
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
    if (!`${tabName}Details`) {
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
            setProcessDetail={setProcessDetail}
          />
        ) : (
          <GenericTab
            tab={activeTab[`${activeTab}Details`]}
            tabTitle={activeTab[BUTTON_TEXTS[activeTab]]}
            error={activeTab[`error${capitalizeWord(activeTab)}Details`]}
          />
        )}
      </div>
    </article>
  );
}

YourDesk.propTypes = propTypes;

export default function ({ setProcessDetail }) {
  const { currentOffice, buildRequestParams } = useAppContext();
  return (
    <YourDesk
      currentOffice={currentOffice}
      buildRequestParams={buildRequestParams}
      setProcessDetail={setProcessDetail}
    />
  );
}
