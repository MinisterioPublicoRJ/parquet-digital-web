import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import Api from '../../api';
import { getUser } from '../../user';
import { formatPercent } from '../../utils';
import { PerformanceChart, SectionTitle } from '../../components';

const propTypes = {
  dashboard: PropTypes.bool.isRequired,
};

class PerformanceRadar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getPerformanceData();
  }

  async getPerformanceData() {
    const res = await Api.getRadarData(getUser());
    this.cleanGraphData(res);
  }

  cleanGraphData(data) {
    const chartData = Object.entries(data)
      .filter(cat => cat[0] !== 'meta')
      .map(([category, { maxValues, averages, variations, percentages, numbers }]) => ({
        axis: {
          category,
          value: numbers, // variations == null || variations === -1 ? '—' : formatPercent(variations),
          isAboveAverage: true, // variations == null || variations === -1 ? null : variations >= 0,
        },
        chart: {
          x: category,
          y: percentages * 100,
          label: `${Math.round(percentages * 100)}%`,
        },
        med: {
          x: category,
          y: 100 * (averages / maxValues),
        },
      }));

    this.setState({ chartData });
  }

  render() {
    const { dashboard } = this.props;
    const { percentagePhrase, movements, chartData } = this.state;

    if (!chartData) return <div>Carregando</div>;

    return (
      <article className="page-radar-dashboard">
        <div className="radar-header">
          <SectionTitle value="Radar de Performance" />
        </div>
        <div className="radar-graph">
          <PerformanceChart data={chartData} />
        </div>
      </article>
    );
  }
}

PerformanceRadar.propTypes = propTypes;
export default PerformanceRadar;
