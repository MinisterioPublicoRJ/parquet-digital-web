import React from 'react';
import PropTypes from 'prop-types';

import { Spinner } from '../../layoutPieces';
import { DeskCasesChart } from '../../graphs';
import Api from '../../../api';
import { Table } from '../../index';

import './styles.css';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
  chartData: PropTypes.shape({
    under20: PropTypes.number,
    between20And30: PropTypes.number,
    over30: PropTypes.number,
  }).isRequired,
};
const defaultProps = {};

class OpenCasesDetail extends React.Component {
  constructor(props) {
    super(props);
    this.mainData = {
      under20: ['#28A7E0', 'até 20 dias'],
      over30: ['#F86C72', '20 a 30 dias'],
      between20And30: ['#F8BD6C', '30+ dias'],
    };
    this.tableColumns = {
      MPRJ: 'numero_mprj',
      'Nº Externo': 'numero_externo',
      'Último Andamento': 'dt_abertura',
      Classe: 'classe',
    };
    this.state = {
      activeTab: 'under20',
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
    const { getUser } = this.props;
    const tabMatcher = {
      under20: 'ate_vinte',
      between20And30: 'vinte_trinta',
      over30: 'trinta_mais',
    };
    let error = false;
    let res;

    try {
      res = await Api.getOpenCasesList(getUser(), tabMatcher[tab]);
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
          color: item === cat ? this.mainData[cat][0] : '#E8E8E8',
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
        color={this.mainData[cat][0]}
        data={cleanData[cat]}
        name={this.mainData[cat][1]}
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

      console.log('sua mesa', this.state[`${activeTab}Details`]);
    return (
      <>
        <div className="time-charts-view">{this.renderCharts(chartData)}</div>
        <div className="open-cases-table-view">
          {tabLoading && <Spinner size="medium" />}
          {!emptyTab && this.state[`${activeTab}Details`] && (
            <Table
              data={this.state[`${activeTab}Details`]}
              columns={this.tableColumns}
              showHeader
            />
          )}
          {emptyTab && <p className="paragraphWrapper"> Nenhum processo para exibir </p>}
        </div>
      </>
    );
  }
}

OpenCasesDetail.propTypes = propTypes;
OpenCasesDetail.defaultProps = defaultProps;
export default OpenCasesDetail;
