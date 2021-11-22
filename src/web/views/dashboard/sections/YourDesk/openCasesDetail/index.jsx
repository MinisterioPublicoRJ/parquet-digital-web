import React from 'react';
import PropTypes from 'prop-types';
import { SearchBox } from 'mapasteca-web';

import { MAIN_DATA, TABLE_COLUMNS, TAB_MATCHER } from './openCasesConstants';
import Api from '../../../../../api';
import { Spinner, CustomTable, Pagination } from '../../../../../components';
import DeskCasesChart from '../deskCases';
import noOpenCases from '../../../../../assets/imgs/robo-s-vistas-abertas.png';
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

class OpenCasesDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'under20',
      currentPage: 1,
      totalPages: this.calcTotalPages(this.props.chartData),
      searchString: '',
      numeroMprj: null,
      numeroExterno: null,
      isProcessDetailOpen: false,
    };
    this.handleProcessDetail = this.handleProcessDetail.bind(this);
  }

  componentDidMount() {
    const { activeTab } = this.state;
    this.getOpenCasesList(activeTab);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.chartData !== this.props.chartData && Object.keys(this.props.chartData).length) {
      this.setState({ totalPages: this.calcTotalPages(this.props.chartData) });
    }
  }

  calcTotalPages(chartData) {
    const totalPages = {};
    const categories = Object.keys(chartData);
    categories.forEach((cat) => {
      const pages = Math.ceil(chartData[cat] / 20);
      totalPages[cat] = pages;
    });
    return totalPages;
  }

  generateButtons(list) {
    return list.map((openCase) => {
      const { numeroMprj, numeroExterno } = openCase;
      const processNumberBtn = (
        <button
          type="button"
          onClick={() => {
            this.handleProcessDetail(numeroMprj, numeroExterno);
          }}
          className="process-detail-btn"
        >
          {numeroMprj}
        </button>
      );
      return { ...openCase, numeroMprj: processNumberBtn };
    });
  }
  /**
   * Generic function that fetches the detailed data from each of the 3 time periods
   * @param  {string}  tab one of [under20, between20And30, over30]
   * @return {void}     just saves to state
   */
  async getOpenCasesList(tab, nextPage, searchString) {
    const { buildRequestParams } = this.props;
    let error = false;
    let res;
    const page = nextPage || this.state.currentPage;

    try {
      res = await Api.getOpenCasesList(buildRequestParams(), TAB_MATCHER[tab], page, searchString);
    } catch (e) {
      error = true;
    } finally {
      const newState = {};
      const totalPages = {};
      totalPages[`${tab}`] = res ? res.pages : null;
      newState[`${tab}Details`] = this.generateButtons(res.procedures);
      newState[`${tab}Error`] = error;
      this.setState({ ...newState, currentPage: page, totalPages });
    }
  }

  handlePageClick(page) {
    if (page < 1 || page > this.state.totalPages[this.state.activeTab]) return;
    const { chartData } = this.props;
    const tabName = this.state.activeTab;
    const hasItems = chartData[tabName];

    if (hasItems) {
      const newState = {};
      newState[`${tabName}Details`] = null;
      this.setState({ ...newState }, () => {
        this.getOpenCasesList(tabName, page, this.state.searchString);
      });
    }
  }

  /**
   * [cleanChartData description]
   * @param  {json} data the chartData prop
   * @return {json}      same keys as chartData, each key has again same keys as
   *                     chartData and point to an object with x/y/color values
   */
  cleanChartData(data) {
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
  handleChangeActiveTab(tabName) {
    const { chartData } = this.props;
    const hasItems = chartData[tabName];

    if (hasItems && !this.state[`${tabName}Details`]) {
      this.getOpenCasesList(tabName, 1);
    }
    this.setState({ activeTab: tabName, currentPage: 1 });
  }

  /**
   * Cleans chartData prop data, then draws PieChart buttons
   * @param  {[type]} data chartData prop
   * @return {Array}      JSX for PieChart buttons
   */
  renderCharts(data) {
    const { activeTab } = this.state;
    const cleanData = this.cleanChartData(data);
    const categories = Object.keys(data);

    return categories.map((cat) => (
      <DeskCasesChart
        key={cat}
        active={activeTab === cat}
        buttonPressed={(tab) => this.handleChangeActiveTab(tab)}
        category={cat}
        color={MAIN_DATA[cat][0]}
        data={cleanData[cat]}
        name={MAIN_DATA[cat][1]}
      />
    ));
  }

  handleSearch(searchStr) {
    this.setState({ searchString: searchStr });
    this.getOpenCasesList(this.state.activeTab, 1, searchStr);
  }

  handleProcessDetail(numeroMprj, numeroExterno) {
    this.setState(prevState => ({numeroMprj, numeroExterno, isProcessDetailOpen: !prevState.isProcessDetailOpen}));
  }

  render() {
    const { isLoading, chartData } = this.props;
    const { activeTab, totalPages } = this.state;

    if (isLoading) {
      return <Spinner size="large" />;
    }

    const emptyTab = !chartData[activeTab];
    const tabLoading =
      !emptyTab && !this.state[`${activeTab}Details`] && !this.state[`${activeTab}Error`];

    return (
      <>
        <div className="openCases-chartsWrapper">{this.renderCharts(chartData)}</div>
        {!emptyTab && <SearchBox onSearch={this.handleSearch.bind(this)}></SearchBox>}
        <div className={`openCases-tableWrapper ${emptyTab ? 'empty-table' : ''}`}>
          {tabLoading && <Spinner size="medium" />}
          {!emptyTab && this.state[`${activeTab}Details`] && (
            <CustomTable
              data={this.state[`${activeTab}Details`]}
              columns={TABLE_COLUMNS}
              showHeader
            />
          )}
          {emptyTab && (
            // Fills an array with 20 empty lines (ES6 JavaScript) and insert the array with empty lines in the table
            <>
              <p className="no-openCases"> Nenhuma vista aberta até o momento</p>
              <CustomTable data={Array(20).fill({content: ''})} columns={TABLE_COLUMNS} showHeader />
            </>
          )}

          {!emptyTab && (
            <Pagination
              totalPages={totalPages[activeTab] || 0}
              handlePageClick={(page) => this.handlePageClick(page)}
              currentPage={this.state.currentPage}
            />
          )}
          {
            this.state.isProcessDetailOpen &&
            <Modal close={this.handleProcessDetail}>
              <ProcessDetail docuNrExterno={this.state.numeroExterno} docuNrMp={this.state.numeroMprj} close={this.handleProcessDetail}/>
            </Modal>
          }          
        </div>
      </>
    );
  }
}

OpenCasesDetail.propTypes = propTypes;
export default OpenCasesDetail;
