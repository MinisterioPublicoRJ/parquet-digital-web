import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TABLE_COLUMNS, TAB_MATCHER } from './openCasesConstants';
import { useAppContext } from '../../../../../../core/app/App.context';
import { Spinner, CustomTable, Pagination, ProcessDetail } from '../../../../../components';
import { Modal, SearchBox } from '../../../../../components/layoutPieces';
import { highlightJSX } from '../../../../../utils';

import {
  openCasesTableWrapper,
  openCasesEmptyTable,
  noOpenCases,
  processDetailBtn,
  alertTagWrapper,
  alertTag,
  alertTagSigla,
  emptyAlert,
  allBoxFilters,
  boxFilters,
} from './styles.module.css';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  buildRequestParams: PropTypes.func.isRequired,
  chartData: PropTypes.shape({
    under20: PropTypes.number,
    between20And30: PropTypes.number,
    over30: PropTypes.number,
    allDate: PropTypes.number,
  }).isRequired,
};

function OpenCasesList({ isLoading, buildRequestParams, chartData }) {
  const { Api } = useAppContext();
  const [activeTab, setActiveTab] = useState('full');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagesByTab, setTotalPagesByTab] = useState({});
  const [searchString, setSearchString] = useState(null);
  const [numeroMprj, setNumeroMprj] = useState(null);
  const [numeroExterno, setNumeroExterno] = useState(null);
  const [isProcessDetailOpen, setIsProcessDetailOpen] = useState(false);
  const [tabDetails, setTabDetails] = useState({});
  const [selectedElement, setSelectedElement] = useState({});
  const [tabLoading, setTabLoading] = useState(false);
  const [emptyTab, setEmptyTab] = useState(!chartData[activeTab]);

  useEffect(() => {
    if (!chartData) return;

    if (Object.keys(chartData)) {
      setTotalPagesByTab(calcTotalPagesByTab(chartData));
    }
    if (Object.keys(chartData).length) {
      setTabDetails(initializeTabDetails(chartData));
    }
  }, [chartData]);

  useEffect(() => {
   if(Object.keys(tabDetails).length && typeof tabDetails[activeTab] === 'undefined') getOpenCasesList();
  }, [tabDetails]);


  function initializeTabDetails(chart) {
    const details = {};
    const categories = Object.keys(chart);
    categories.forEach((cat) => {
      details[cat] = {};
    });
    return details;
  }
  // calculates total pages for each category, returns a dict with each cat as key
  function calcTotalPagesByTab(chart) {
    if (!chart) return;
    const totalPages = {};
    const categories = Object.keys(chart);
    categories.forEach((cat) => {
      const pages = Math.ceil(chart[cat] / 20);
      totalPages[cat] = pages;
    });
    // eslint-disable-next-line consistent-return
    return totalPages;
  }

  function generateButtons(list) {
    return list.map((alerts) => {
      let highlightedAlerts = {};
      if (searchString) {
        Object.entries(alerts).forEach(([key, value]) => {
          highlightedAlerts[key] = highlightJSX(value, searchString);
        });
      } else {
        highlightedAlerts = alerts;
      }

      const processNumberBtn = (
        <button
          type="button"
          onClick={(event) => {
            handleProcessDetail(alerts.numeroMprj, alerts.numeroExterno, event);
          }}
          className={processDetailBtn}
          key={alerts.numeroMprj}
        >
          {highlightedAlerts.numeroMprj}
        </button>
      );

      const alertTagButton = (
        <div className={`${alertTagWrapper} ${alerts.alertsCount > 0 ? '' : emptyAlert}`}>
          <div className={alertTag}>{alerts.alertsCount}</div>
          {alerts.listAlerts && (
            <button
              type="button"
              className={alertTagSigla}
              onClick={(event) => {
                handleProcessDetail(alerts.numeroMprj, alerts.numeroExterno, event);
              }}
              key={alerts.numeroExterno}
            >
              <p>
                Clique para ver {` ${alerts.alertsCount === 1 ? 'o alerta' : 'os alertas'}`} deste
                procedimento.
              </p>
            </button>
          )}
        </div>
      );

      return {
        ...alerts,
        ...highlightedAlerts,
        numeroMprj: processNumberBtn,
        alertTag: alertTagButton,
      };
    });
  }
  /**
   * Generic function that fetches the detailed data from each of the 3 time periods
   * @return {void}     just saves to state
   */
  async function getOpenCasesList() {
    let error = false;
    let res;

    try {
      setTabLoading(true);
      console.log('activetAb', activeTab);
      res = await Api.getOpenCasesList(
        buildRequestParams(),
        TAB_MATCHER[activeTab],
        currentPage,
        searchString,
      );
    } catch (e) {
      error = true;
    } finally {
      let newCurrentPageState = { ...tabDetails[activeTab] };
      const totPages = totalPagesByTab;
      totPages[activeTab] = res ? res.pages : null;
      if (res) newCurrentPageState = generateButtons(res.procedures);
      newCurrentPageState.searchString = searchString;
      if (error) newCurrentPageState = undefined;
      console.log(
        '\n\nNEWCURRPAGSTAT',
        newCurrentPageState,
        'tabDetails currentPage',
        tabDetails,
        '!tabDetailscurentPa',
      );
      console.log('\n\n\n\n\nboool tabDetails[activeTab]', Boolean(tabDetails[activeTab]));
      if (tabDetails[activeTab]) console.log('!curpage:', !tabDetails[activeTab][currentPage]);
      console.log('tabdetails before if: ', tabDetails[activeTab]);
      console.log('TABDETAILS TYPE OF', typeof tabDetails[activeTab]);

      if (typeof tabDetails === 'object' && typeof tabDetails[activeTab] === 'undefined') {
        console.log('\n\n\n\n\ninside first if , tabdetails0', tabDetails);
        if (Object.keys(tabDetails).length){   
        console.log('\n\n\ninside setting tab details\n\n\n');
        setTabDetails({
          ...tabDetails,
          [activeTab]: {
            ...tabDetails[activeTab],
            [currentPage]: newCurrentPageState,
            searchString,
          },
        });

        }
      }

      if (
        tabDetails[activeTab] &&
        (tabDetails[activeTab].searchString !== searchString ||
          newCurrentPageState !== tabDetails[activeTab][currentPage])
      ) {
        console.log('settin tab detail');
        setTabDetails({
          ...tabDetails,
          [activeTab]: {
            ...tabDetails[activeTab],
            [currentPage]: newCurrentPageState,
            searchString,
          },
        });
      }
      setTotalPagesByTab(totPages);
      setTabLoading(false);
      setEmptyTab(false);
    }
  }

  function handlePageClick(page) {
    if (page < 1 || page > totalPagesByTab[activeTab]) return;
    const hasItems = chartData[activeTab];

    if (hasItems) {
      setCurrentPage(page);
    }
  }

  useEffect(() => {
    console.log('using effect, activeTab: ', activeTab);
    if (!chartData) return;
    const hasItems = chartData[activeTab];
    if (hasItems && tabDetails[activeTab]) {
      const hasntQueriedThisPage =
        (!searchString || tabDetails[activeTab].searchString !== searchString) &&
        !tabDetails[activeTab][currentPage];
      const isSearching = tabDetails[activeTab][currentPage]?.searchString !== searchString;

      if (hasntQueriedThisPage || isSearching) getOpenCasesList();
    }
  }, [activeTab, chartData, currentPage, tabDetails]);

  useEffect(() => {
    console.log('searchingstring, activeTab:', activeTab);
    getOpenCasesList();
  }, [searchString]);

  /**
   * [cleanChartData description]
   * @param  {json} data the chartData prop
   * @return {json}      same keys as chartData, each key has again same keys as
   *                     chartData and point to an object with x/y/color values
   */

  /**
   * Triggered by buttonPress, updates the state
   * @param  {string} tabName the name of the next active tab,
   * one of [under20, between20And30, over30]
   * @return {void}
   */
  function handleChangeActiveTab(tabName) {
    console.log('\n\n\ntabName: ', tabName, 'activeTAB:', activeTab);
    setActiveTab(tabName);
    setCurrentPage(1);
  }

  const onSearch = (searchStr) => {
    setSearchString(searchStr);
  };

  const handleProcessDetail = (numMprj, numExterno, event) => {
    setNumeroMprj(numMprj);
    setNumeroExterno(numExterno);
    if (event) setSelectedElement(event.target);
    setIsProcessDetailOpen((prevState) => !prevState);
  };

  if (isLoading || !chartData) {
    return <Spinner size="large" />;
  }

  const LABELS = ['Todas as vistas', 'Até 20 dias', '20 a 30 dias', '+30 dias'];
  const categories = Object.keys(chartData);

  console.log('Emptytab', emptyTab, 'tabLoadin', tabLoading, 'tabDetails', tabDetails);

  return (
    <>
      <div className={allBoxFilters}>
        <SearchBox onSearch={onSearch} />
        <div className={boxFilters}>
          <p>Filtrar Tabela:</p>
          {categories.map((text, i) => (
            <button onClick={() => handleChangeActiveTab(categories[i])} type="button" key={text}>
              <p>{[LABELS[i]]}</p>
            </button>
          ))}
          {searchString &&
            !tabLoading &&
            tabDetails[activeTab] &&
            !tabDetails[activeTab][currentPage] && (
              <div className={`${openCasesTableWrapper} ${openCasesEmptyTable}`}>
                <p className={noOpenCases}> Nenhuma vista aberta com os parâmetros pesquisados</p>
                <CustomTable
                  data={Array(20).fill({ content: '' })}
                  columns={TABLE_COLUMNS}
                  showHeader
                />
              </div>
            )}
        </div>
      </div>
      <div className={`${openCasesTableWrapper} ${emptyTab ? openCasesEmptyTable : ''}`}>
        {tabLoading && <Spinner size="medium" />}
        ói nóis em cima
        {!emptyTab &&
          !tabLoading &&
          tabDetails[activeTab] &&
          tabDetails[activeTab][currentPage] && (
            <>ói nóis em baixo
            <CustomTable
                data={tabDetails[activeTab][currentPage]}
                columns={TABLE_COLUMNS}
                showHeader
                searchString={searchString}
              />
          </>
          )}

        {searchString &&
          !tabLoading &&
          tabDetails[activeTab] &&
          tabDetails[activeTab] &&
          !tabDetails[activeTab][currentPage] && (
            <div className={`${openCasesTableWrapper} ${openCasesEmptyTable}`}>
              <p className={noOpenCases}> Nenhuma vista aberta com os parâmetros pesquisados</p>
              <CustomTable
                data={Array(20).fill({ content: '' })}
                columns={TABLE_COLUMNS}
                showHeader
              />
            </div>
          )}

        {emptyTab && (
          // Fills an array with 20 empty lines (ES6 JavaScript) and insert the array with empty lines in the table
          <>
            <p className={noOpenCases}> Nenhuma vista aberta até o momento</p>
            <CustomTable
              data={Array(20).fill({ content: '' })}
              columns={TABLE_COLUMNS}
              showHeader
            />
          </>
        )}

        {!emptyTab && (
          <Pagination
            totalPages={totalPagesByTab[activeTab] || 0}
            handlePageClick={(page) => handlePageClick(page)}
            currentPage={currentPage}
          />
        )}

        {isProcessDetailOpen && (
          <Modal withExitButton close={handleProcessDetail} previousElement={selectedElement}>
            <ProcessDetail
              docuNrExterno={numeroExterno}
              docuNrMp={numeroMprj}
              close={handleProcessDetail}
            />
          </Modal>
        )}
      </div>
    </>
  );
}

OpenCasesList.propTypes = propTypes;
export default OpenCasesList;
