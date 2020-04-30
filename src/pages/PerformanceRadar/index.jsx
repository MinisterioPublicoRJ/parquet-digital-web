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
      .map(([category, { variations, percentages, numbers }]) => ({
        axis: {
          category,
          value: variations == null || variations === -1 ? '—' : formatPercent(variations),
          isAboveAverage: variations == null || variations === -1 ? null : variations >= 0,
        },
        chart: {
          x: category,
          y: percentages * 100,
          label: numbers,
        },
      }));

    this.setState({ chartData });
  }

  render() {
    const { dashboard } = this.props;
    const { percentagePhrase, movements, chartData } = this.state;

    if (!chartData) return <div>Carregando</div>;

    if (!dashboard) {
      return (
        <article className="page radar page-radar">
          <div className="radarLeft">
            <PerformanceChart data={chartData} />
          </div>
          <div className="radarRight">
            <p className="paragraphWrapper">
              Analisamos a atuação da sua promotoria e percebemos que a quantidade de arquivamento
              está
              <span style={{ fontWeight: 'bold' }}>{percentagePhrase}</span>
              da média da casa.
            </p>
            <p className="paragraphWrapper">
              <span style={{ fontWeight: 'bold' }}>Parabéns </span>
              pela instauração dos novos TACs. ACPs e investigações, totalizando
              <span style={{ fontWeight: 'bold' }}>{` ${movements} movimentos `}</span>
              em prol da sociedade nos últimos dias.
            </p>
          </div>
        </article>
      );
    }

    return (
      <article className="page page-radar-dashboard">
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
