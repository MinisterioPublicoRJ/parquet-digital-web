import React from 'react';

import '../styles.css';
import Api from '../../../api';
import { getUser } from '../../../user';
import { Spinner, PerformanceChart, SectionTitle } from '../../../components';

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
        value: `(máx atribuição ${maxValues})`, // variations == null || variations === -1 ? '—' : formatPercent(variations),
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

    if (!chartData) return <Spinner />;

    return (
      <article className="page-radar-dashboard">
        <div className="radar-header">
          <SectionTitle value="Radar de Performance" subtitle="(últimos 180 dias)" />
        </div>
        <figure className="radar-wrapper">
          <div className="radar-graph">
            <PerformanceChart data={chartData} />
          </div>
          <figcaption className="radar-subtitles">
            <div className="radar-subtitles-item radar-subtitles-item-yourData">Sua Promotoria</div>
            <div className="radar-subtitles-item radar-subtitles-item-MPData">Perfil do MP</div>
          </figcaption>
        </figure>
      </article>
    );
  }
}

PerformanceRadar.propTypes = propTypes;
export default PerformanceRadar;
