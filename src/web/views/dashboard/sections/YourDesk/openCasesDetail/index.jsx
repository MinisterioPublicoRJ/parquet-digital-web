import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SearchBox } from 'mapasteca-web';

import { MAIN_DATA, TABLE_COLUMNS, TAB_MATCHER } from './openCasesConstants';
import Api from '../../../../../api';
import { Spinner, CustomTable, Pagination } from '../../../../../components';
import DeskCasesChart from '../deskCases';
import { Modal } from '../../../../../components/layoutPieces';
import { ProcessDetail } from '../../../../../components';
import './styles.css';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  buildRequestParams: PropTypes.func.isRequired,
  chartData: PropTypes.shape({
    under20: PropTypes.number,
    between20And30: PropTypes.number,
    over30: PropTypes.number,
  }).isRequired,
};

function OpenCasesDetail({ isLoading, buildRequestParams, chartData }) {

  const [activeTab, setActiveTab] = useState('under20');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(calcTotalPages(chartData));
  const [searchString, setSearchString] = useState('');
  const [numeroMprj, setNumeroMprj] = useState(null);
  const [numeroExterno, setNumeroExterno] = useState(null);
  const [isProcessDetailOpen, setIsProcessDetailOpen] = useState(false);
  const [docs, setDocs ] = useState(false);


  useEffect(() => {
    getOpenCasesList(activeTab);

  },[]);

  useEffect(() => { 
    
    if (Object.keys(chartData).length) {
      setTotalPages(calcTotalPages(chartData));
    }
  } ,[chartData])

  function calcTotalPages(chartData) {
    const totalPages = {};
    const categories = Object.keys(chartData);
    categories.forEach((cat) => {
      const pages = Math.ceil(chartData[cat] / 20);
      totalPages[cat] = pages;
    });
    return totalPages;
  }

  function generateButtons(list) {
    return list.map((openCase) => {
      const { numeroMprj, numeroExterno, alertSigla, alertCount } = openCase;
      const processNumberBtn = (
        <button
          type="button"
          onClick={() => {
            handleProcessDetail(numeroMprj, numeroExterno);
          }}
          className="process-detail-btn"
        >
          {numeroMprj}
        </button>
      );
      /* commented alertTag that is half done while back end isn't done
      const alertTagButton = (
        <div className="alert-tag-wrapper">
          <button
            type="button"
            className="alert-tag"
          >
            {alertCount}
          </button>

          <div className="alert-tag-sigla">
            {alertSigla}
          </div>
        </div>
      ) */
      return { ...openCase, numeroMprj: processNumberBtn, /* alertTag: alertTagButton  */ };
    });
  }
  /**
   * Generic function that fetches the detailed data from each of the 3 time periods
   * @param  {string}  tab one of [under20, between20And30, over30]
   * @return {void}     just saves to state
   */
  async function getOpenCasesList(tab, nextPage, searchString) {
    let error = false;
    let res;
    const page = nextPage || currentPage;

    try {
      res = await Api.getOpenCasesList(buildRequestParams(), TAB_MATCHER[tab], page, searchString);
    } catch (e) {
      error = true;
    } finally {
      const newState = {};
      const totalPages = {};
      totalPages[`${tab}`] = res ? res.pages : null;
      if (res) newState[`${tab}Details`] = generateButtons(res.procedures);
      newState[`${tab}Error`] = error;
      setDocs(prevState => ({...prevState, ...newState, currentPage: page, totalPages }));
    }
  }

  function handlePageClick(page) {
    if (page < 1 || page > totalPages[activeTab]) return;
    const tabName = activeTab;
    const hasItems = chartData[tabName];

    if (hasItems) {
      const newState = {};
      newState[`${tabName}Details`] = null;
      setDocs(prevState => ({...prevState, ...newState }));
    }
  }

  // useEffect for calling getOpenCasesList after docs state changes 

  useEffect(() => {
    getOpenCasesList(activeTab, currentPage, searchString);
  },[docs,currentPage])

  /**
   * [cleanChartData description]
   * @param  {json} data the chartData prop
   * @return {json}      same keys as chartData, each key has again same keys as
   *                     chartData and point to an object with x/y/color values
   */
  function cleanChartData(data) {
    const categories = Object.keys(data);
    const cleanData = {};

    // for each category I make and object with the data from all categories and the right colors to use
    // then I push all 3 objects to an array
    categories.forEach((cat) => {
      const categoryChart = {};
      categories.forEach((item) => {
        categoryChart[item] = {
          x: item,
          y: data[item],
          color: item === cat ? MAIN_DATA[cat][0] : '#E8E8E8',
        };
      });
      cleanData[cat] = categoryChart;
    });
    return cleanData;
  }

  /**
   * Triggered by buttonPress, updates the state
   * @param  {string} tabName the name of the next active tab,
   * one of [under20, between20And30, over30]
   * @return {void}
   */
  function handleChangeActiveTab(tabName) {
    const hasItems = chartData[tabName];

    if (hasItems && !docs[`${tabName}Details`]) {
      getOpenCasesList(tabName, 1);
    }
    setActiveTab(tabName);
    setCurrentPage(1);
  }

  /**
   * Cleans chartData prop data, then draws PieChart buttons
   * @param  {[type]} data chartData prop
   * @return {Array}      JSX for PieChart buttons
   */
  function renderCharts(data) {
    const cleanData = cleanChartData(data);
    const categories = Object.keys(data);

    return categories.map((cat) => (
      <DeskCasesChart
        key={cat}
        active={activeTab === cat}
        buttonPressed={(tab) => handleChangeActiveTab(tab)}
        category={cat}
        color={MAIN_DATA[cat][0]}
        data={cleanData[cat]}
        name={MAIN_DATA[cat][1]}
      />
    ));
  }

  function handleSearch(searchStr) {
    setSearchString(searchStr);
    getOpenCasesList(activeTab, 1, searchStr);
  }

  function handleProcessDetail(numeroMprj, numeroExterno) {
    setNumeroMprj(numeroMprj);
    setNumeroExterno(numeroExterno);
    setIsProcessDetailOpen(prevState => !prevState);
  }

  if (isLoading) {
    return <Spinner size="large" />;
  }

  const emptyTab = !chartData[activeTab];
  const tabLoading =
    !emptyTab && !docs[`${activeTab}Details`] && !docs[`${activeTab}Error`];

  return (
    <>
      <div className="openCases-chartsWrapper">{renderCharts(chartData)}</div>
      {!emptyTab && <SearchBox onSearch={handleSearch}></SearchBox>}
      <div className={`openCases-tableWrapper ${emptyTab ? 'empty-table' : ''}`}>
        {tabLoading && <Spinner size="medium" />}
        {!emptyTab && docs[`${activeTab}Details`] && (
          <CustomTable
            data={docs[`${activeTab}Details`]}
            columns={TABLE_COLUMNS}
            showHeader
          />
        )}
        {emptyTab && (
          // Fills an array with 20 empty lines (ES6 JavaScript) and insert the array with empty lines in the table
          <>
            <p className="no-openCases"> Nenhuma vista aberta até o momento</p>
            <CustomTable data={Array(20).fill({ content: '' })} columns={TABLE_COLUMNS} showHeader />
          </>
        )}

        {!emptyTab && (
          <Pagination
            totalPages={totalPages[activeTab] || 0}
            handlePageClick={(page) => this.handlePageClick(page)}
            currentPage={currentPage}
          />
        )}
        {
          isProcessDetailOpen &&
          <Modal close={handleProcessDetail}>
            <ProcessDetail docuNrExterno={numeroExterno} docuNrMp={numeroMprj} close={handleProcessDetail} />
          </Modal>
        }
      </div>
    </>
  );
}

OpenCasesDetail.propTypes = propTypes;
export default OpenCasesDetail;