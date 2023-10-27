/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  deskOuter,
  deskButtonsTextsHeader,
  deskControlers,
  deskTabs,
  deskHeader,
  hide,
  componentWrapper,
  yourCollectionButtons,
  desk,
  deskButtonsTextsHeaderText,
  deskButtonsInactive,
  deskButtonsActive,
  openCasesChartsWrapper,
  componentWrapperCollections,
  deskButtonsCollectionPhrase,
  deskButtonsCollections,
  spinnerWrapper,
  deskControlersAndMetrics,
  openCasesChartsWrapperWeb,
  openCasesChartsWrapperResponsive,
  componentWrappeTableError,
  noOpenCases,
} from './styles.module.css';
import { useAppContext } from '../../../../../core/app/App.context';
import { SectionTitle, Spinner } from '../../../../components';
import MetricsProsecutions from './MetricsProsecutions/MetricsProsecutions.view';
import InfoBoxYourDesk from './InfoBoxsYourDesk';
import ControlButton from './ControlButton';
import OpenCasesList from './OpenCasesList/OpenCasesList.view';
import TablesTutela from '../TablesTutela';
import MainInvestigated from '../MainInvestigated';
import ProcessListCriminal from '../ProcessListCriminal';
import DeskGraph from './DeskGraph/DeskGraph.view';
import DeskGraphResponsive from './DeskGraphResponsive/DeskGraphResponsive.view';

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
  CRONTROL_BUTTON_TEXTS,
  BUTTON_COLORS,
} from './deskConstants';
import { MAIN_DATA } from './OpenCasesList/openCasesConstants';

function YourDesk() {
  const { currentOffice, buildRequestParams, Api } = useAppContext();
  const [docsQuantity, setDocsQuantity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonListControl, setButtonListControl] = useState(false);
  const [deskButtonList, setDeskButtonList] = useState(false);
  const [collectionButtonList, setCollectionButtonList] = useState(false);
  const [activeTab, setActiveTab] = useState('desk');
  const [tabDetail, setTabDetail] = useState([]);
  const [metricsArray, setMetricsArray] = useState([]);
  const [dbNames, setDBNames] = useState([]);
  const [collectionTable, setCollectionTable] = useState(getCollectionTable);
  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b, 0);

  useEffect(() => {
    getOpenCasesDetails();
    getButtons();
    getButtonsControl();
  }, []);

  function getButtonsControl() {
    let buttonControl;
    if (currentOffice.tipo) {
      buttonControl = CONTROL_BUTTONS;
    }
    setButtonListControl(buttonControl);
    buttonControl.forEach((buttonName) => {
      getDocumentQuantity(buttonName);
    });
  }

  function getButtons() {
    let deskButtons, collectionButtons;
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
    let tempDBNames = [];

    if (tabName === 'collection') {
      if (currentOffice.tipo === 1) {
        tempDBNames.push('tutela_investigacoes');
        tempDBNames.push('tutela_processos');
      }
      if (currentOffice.tipo === 2) {
        tempDBNames.push('pip_pics');
        tempDBNames.push('pip_inqueritos');
      }
      if (currentOffice.tipo === 7) {
        tempDBNames.push('criminal_processos');
        tempDBNames.push('criminal_finalizados');
      }
      setDBNames(tempDBNames);
    }

    let tabData;
    let updatedState = {};
    setLoading(true);
    try {
      for (const dbName of tempDBNames) {
        tabData = await await Api.getIntegratedDeskDetails({
          ...buildRequestParams(),
          docType: dbName,
        });
        metricsArray.push(tabData.metrics);
      }
      setTabDetail((prevState) => ({ ...prevState, ...updatedState }));
    } catch (e) {
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
   * Cleans chartData prop data, then draws Bar Chart
   * @param  {[type]} data chartData prop
   * @return {Array}      JSX for Bar Chart
   */
  function renderCharts(data) {
    if (!data) return;

    const cleanData = cleanChartData(data);
    return <DeskGraph data={cleanData} />;
  }

  function renderChartsResponsive(data) {
    if (!data) return;

    const cleanData = cleanChartData(data);
    return <DeskGraphResponsive data={cleanData} />;
  }

  /**
   * [cleanChartData description]
   * @param  {json} data the chartData prop
   * @return {json}      same keys as chartData, each key has again same keys as
   *                     chartData and point to an object with x/y/color values
   */
  function cleanChartData(data) {
    const categories = Object.keys(data);
    const chartCategories = categories.slice(1);

    const cleanData = chartCategories.map((cat) => {
      return {
        x: cat,
        y: data[cat],
        color: MAIN_DATA[cat][0],
      };
    });

    return cleanData;
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
      getTabDetails(tabName);
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

  // const hasNoMetrics is filled if no metrics value  is returned
  const hasNoMetrics =
    metricsArray[0] == undefined ? 'Não existem métricas para esta promotoria.' : '';
  return (
    <article className={deskOuter}>
      <div className={deskHeader}>
        <SectionTitle value="SELECIONE SUA VISUALIZAÇÃO:" glueToTop />

        <div className={deskControlersAndMetrics}>
          <div className={deskControlers}>
            {buttonListControl.map((buttonTitle) => (
              <ControlButton
                key={CRONTROL_BUTTON_TEXTS[buttonTitle]}
                isButton={CRONTROL_BUTTON_TEXTS[buttonTitle]}
                buttonPressed={() => handleChangeActiveTab(buttonTitle)}
                isActive={activeTab === buttonTitle}
                text={CRONTROL_BUTTON_TEXTS[buttonTitle]}
              />
            ))}
          </div>

          <div
            className={`${deskButtonsCollectionPhrase} ${activeTab === 'collection' ? ' ' : hide}`}
          >
            {loading && metricsArray[0] == undefined && (
              <div className={spinnerWrapper}>
                <Spinner size="medium" />
              </div>
            )}
            <div>
               {metricsArray && !hasNoMetrics && (
                <>
                  {metricsArray.map((metrics, index) => (
                    <MetricsProsecutions
                      key={`metric-${index}`}
                      metrics={metrics}
                      dbName={dbNames[index]}
                      tab={activeTab}
                      tabTitle={[BUTTON_TEXTS[activeTab]]}
                      error={!tabDetail[activeTab] && !loading}
                    />
                  ))}
                </>
              )}
              <>
              {currentOffice.tipo === 7 ?(
                <p>Em breve serão disponibilizadas métricas para essa promotoria.</p>
              ):(
                !loading && hasNoMetrics
              )}
              </>
            </div>
          </div>
        </div>
      </div>

      <div className={deskTabs}>
        <div
          className={`${componentWrapper} ${
            activeTab === 'openCases' || activeTab === 'desk' ? '' : hide
          }`}
        >
          <div
            className={`${deskButtonsTextsHeader} ${
              activeTab === 'collection' ? deskButtonsInactive : deskButtonsActive
            }`}
          >
            <div className={deskButtonsInactive}>
              {deskButtonList.map((buttonTitle) => (
                <InfoBoxYourDesk
                  key={BUTTON_TEXTS[buttonTitle]}
                  text={BUTTON_TEXTS[buttonTitle]}
                  number={docsQuantity[buttonTitle]}
                  error={!docsQuantity[buttonTitle] && !loading}
                  color={BUTTON_COLORS[buttonTitle]}
                />
              ))}
            </div>
            <div className={deskButtonsTextsHeaderText}>
              {tabDetail.openCases && !loading ? (
                sumValues(tabDetail.openCases) > 0 ? (
                  <>
                    <p>
                      As <strong>{docsQuantity.openCases} vistas</strong> abertas
                      <br /> estão distribuídas da seguinte forma:
                    </p>
                    <div className={openCasesChartsWrapper}>
                      <div className={openCasesChartsWrapperWeb}>
                        {renderCharts(tabDetail.openCases)}
                      </div>
                      <div className={openCasesChartsWrapperResponsive}>
                        {renderChartsResponsive(tabDetail.openCases)}
                      </div>
                    </div>
                  </>
                ) : (
                  <p>Não há vistas abertas.</p>
                )
              ) : (
                <div className={spinnerWrapper}>
                  <Spinner size="medium" />
                </div>
              )}
            </div>
          </div>
          {!!tabDetail.openCases && !loading && (
            <>
              <OpenCasesList
                buildRequestParams={buildRequestParams}
                chartData={tabDetail.openCases}
                isLoading={!tabDetail.openCases && loading}
              />
            </>
          )}
        </div>
        <div className={`${componentWrapper} ${activeTab === 'collection' ? ' ' : hide}`}>
          <div className={componentWrapperCollections}>
            <div
              className={`${deskButtonsTextsHeader} ${
                activeTab === 'collection' ? yourCollectionButtons : desk
              }`}
            >
              <div className={deskButtonsCollections}>
                {collectionButtonList.map((buttonTitle) => (
                  <InfoBoxYourDesk
                    key={BUTTON_TEXTS[buttonTitle]}
                    text={BUTTON_TEXTS[buttonTitle]}
                    number={docsQuantity[buttonTitle]}
                    error={!docsQuantity[buttonTitle] && !loading}
                    color={BUTTON_COLORS[buttonTitle]}
                  />
                ))}
              </div>
            </div>
          </div>
          {collectionTable}
        </div>
      </div>
    </article>
  );
}

export default YourDesk;
