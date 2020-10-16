import React from 'react';
import PropTypes from 'prop-types';

import { MAIN_DATA, TABLE_COLUMNS, TAB_MATCHER } from './openCasesConstants';
import Api from '../../../../api';
import { Spinner, CustomTable, Pagination } from '../../../../components';
import DeskCasesChart from '../deskCases';

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
      //total: 0
    };
  }

  componentDidMount() {
    const { activeTab } = this.state;
    this.getOpenCasesList(activeTab);
  }

  /**
   * Generic function that fetches the detailed data from each of the 3 time periods
   * @param  {string}  tab one of [under20, between20And30, over30]
   * @return {void}     just saves to state
   */
  async getOpenCasesList(tab) {
    const { buildRequestParams } = this.props;
    let error = false;
    let res;

    try {
      res = await Api.getOpenCasesList(buildRequestParams(), TAB_MATCHER[tab]);
    } catch (e) {
      error = true;
    } finally {
      const newState = {};
      newState[`${tab}Details`] = res;
      newState[`${tab}Error`] = error;
      this.setState({ ...newState });
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
    categories.forEach(cat => {
      const categoryChart = {};
      categories.forEach(item => {
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
      this.getOpenCasesList(tabName);
    }
    this.setState({ activeTab: tabName });
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

    return categories.map(cat => (
      <DeskCasesChart
        key={cat}
        active={activeTab === cat}
        buttonPressed={tab => this.handleChangeActiveTab(tab)}
        category={cat}
        color={MAIN_DATA[cat][0]}
        data={cleanData[cat]}
        name={MAIN_DATA[cat][1]}
      />
    ));
  }

  render() {
    const { isLoading, chartData } = this.props;
    const { activeTab } = this.state;

    if (isLoading) {
      return <Spinner size="large" />;
    }

    const emptyTab = !chartData[activeTab];
    const tabLoading =
      !emptyTab && !this.state[`${activeTab}Details`] && !this.state[`${activeTab}Error`];

    return (
      <>
        <div className="openCases-chartsWrapper">{this.renderCharts(chartData)}</div>
        <div className="openCases-tableWrapper">
          {tabLoading && <Spinner size="medium" />}
          {!emptyTab && this.state[`${activeTab}Details`] && (
            <CustomTable
              data={this.state[`${activeTab}Details`]}
              columns={TABLE_COLUMNS}
              showHeader
            />

          )}
          <Pagination />
          {emptyTab && <p className="paragraphWrapper"> Nenhum processo para exibir </p>}
        </div>
      </>
    );
  }
}

OpenCasesDetail.propTypes = propTypes;
export default OpenCasesDetail;
