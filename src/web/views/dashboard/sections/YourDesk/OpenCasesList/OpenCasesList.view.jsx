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

function OpenCasesList({ isLoading, buildRequestParams, chartData }) {

  const [activeTab, setActiveTab] = useState('under20');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagesByCat, setTotalPagesByCat] = useState(calcTotalPagesByCat(chartData));
  const [searchString, setSearchString] = useState('');
  const [numeroMprj, setNumeroMprj] = useState(null);
  const [numeroExterno, setNumeroExterno] = useState(null);
  const [isProcessDetailOpen, setIsProcessDetailOpen] = useState(false);
  const [tabDetails, setTabDetails ] = useState({});

  useEffect(() => { 
    
    if (Object.keys(chartData).length) {
      setTotalPagesByCat(calcTotalPagesByCat(chartData));
    }
    if (Object.keys(chartData).length) {
      setTabDetails(initializeTabDetails(chartData));
    }
  } ,[chartData]);

  function initializeTabDetails(chartData){    
    let details = {};
    const categories = Object.keys(chartData);
    categories.forEach((cat) => {
      details[cat] = {};
    });
    return details;
  }
  // calculates total pages for each category, returns a dict with each cat as key
  function calcTotalPagesByCat(chartData) {
    const totalPagesByCat = {};
    const categories = Object.keys(chartData);
    categories.forEach((cat) => {
      const pages = Math.ceil(chartData[cat] / 20);
      totalPagesByCat[cat] = pages;
    });
    return totalPagesByCat;
  }

  function generateButtons(list) {
    return list.map((openCase) => {
      const { numeroMprj, numeroExterno, alertSigla, alertsCount } = openCase;
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
      /* commented alertTag that is half done while back end isn't done */
      const alertTagButton = (
        <div className="alert-tag-wrapper">
          <button
            type="button"
            className="alert-tag"
          >
            {alertsCount}
          </button>

          <div className="alert-tag-sigla">
            {alertSigla}
          </div>
        </div>
      );
      return { ...openCase, numeroMprj: processNumberBtn,  alertTag: alertTagButton };
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
      res = await Api.getOpenCasesList(buildRequestParams(), TAB_MATCHER[activeTab], currentPage, searchString);
    } catch (e) {
      error = true;
    } finally {
      let newCurrentPageState = {...tabDetails[activeTab]};
      const totPages = totalPagesByCat;
      totPages[activeTab] = res ? res.pages : null;
      if (res) newCurrentPageState = generateButtons(res.procedures);
      if (error) newCurrentPageState = undefined;
      if (newCurrentPageState !== tabDetails[activeTab][currentPage]){
        setTabDetails({...tabDetails, [activeTab]: {...tabDetails[activeTab], [currentPage]: newCurrentPageState}});
      }
      setTotalPagesByCat(totPages);
    }
  }

  function handlePageClick(page) {
    if (page < 1 || page > totalPagesByCat[activeTab]) return;
    const hasItems = chartData[activeTab];

    if (hasItems) {
      setCurrentPage(page);
    }
  }
  
  useEffect(() => {
    const hasItems = chartData[activeTab];
    if (hasItems && tabDetails[activeTab] && !tabDetails[activeTab][currentPage]) {
      getOpenCasesList();
    };
  },[activeTab, chartData, currentPage, searchString, tabDetails]);

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
  const tabLoading = !emptyTab && tabDetails[activeTab] && !tabDetails[activeTab][currentPage];

  return (
    <>
      <div className="openCases-chartsWrapper">{renderCharts(chartData)}</div>
      {!emptyTab && <SearchBox onSearch={handleSearch}></SearchBox>}
      <div className={`openCases-tableWrapper ${emptyTab ? 'empty-table' : ''}`}>
        {tabLoading && <Spinner size="medium" />}
        {!emptyTab && tabDetails[activeTab] && tabDetails[activeTab][currentPage] && (
          <CustomTable
            data={tabDetails[activeTab][currentPage]}
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
            totalPages={totalPagesByCat[activeTab] || 0}
            handlePageClick={(page) => handlePageClick(page)}
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

OpenCasesList.propTypes = propTypes;
export default OpenCasesList;