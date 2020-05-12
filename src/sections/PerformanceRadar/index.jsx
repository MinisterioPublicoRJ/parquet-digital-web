import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import Api from '../../api';
import { getUser } from '../../user';
import { PerformanceChart, SectionTitle } from '../../components';

const propTypes = {};

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
        category,
        value: `max: ${maxValues}`, // variations == null || variations === -1 ? '—' : formatPercent(variations),
        isAboveAverage: null, // variations == null || variations === -1 ? null : variations >= 0,
        median: 100 * (averages / maxValues),
        x: category,
        y: percentages * 100,
        numbers,
      }));

    this.setState({ chartData });
  }

  render() {
    const { chartData } = this.state;

    if (!chartData) return <div>Carregando</div>;

    return (
      <article className="page-radar-dashboard">
        <div className="radar-header">
          <SectionTitle value="Radar de Performance" subtitle="(últimos 180 dias)" />
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
