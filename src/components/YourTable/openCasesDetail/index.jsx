import React from 'react';
import PropTypes from 'prop-types';

import { Spinner } from '../../layoutPieces';
import { DeskCasesChart } from '../../graphs';
import Api from '../../../api';
import { Table } from '../../index';

import './styles.css';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

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
          fill: item === cat ? this.mainData[cat][0] : '#E8E8E8',
        };
      });
      cleanData[cat] = categoryChart;
    });

    return cleanData;
  }

  renderCharts(data) {
    const cleanData = this.cleanChartData(data);
    const categories = Object.keys(data);

    return categories.map(cat => (
      <DeskCasesChart
        data={cleanData[cat]}
        name={this.mainData[cat][1]}
        color={this.mainData[cat][0]}
      />
    ));
  }

  render() {
    const { isLoading, chartData } = this.props;
    const { under20Details } = this.state;

    if (isLoading) {
      return <Spinner size="large" />;
    }

    return (
      <>
        <div className="time-charts-view">{/*this.renderCharts(chartData)*/}</div>
        <div className="open-cases-table-view">
          {under20Details && <Table data={under20Details} columns={this.tableColumns} showHeader />}
        </div>
      </>
    );
  }
}

OpenCasesDetail.propTypes = propTypes;
export default OpenCasesDetail;
