import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import Api from '../../api';
import { getUser } from '../../user';
import { formatPercent } from '../../utils';
import { PerformanceChart } from '../../components';

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
    const chartData = [];
    const axisData = {};
    const categories = Object.keys(data);

    categories.forEach(cat => {
      if (cat === 'meta') return;
      const chartRow = { x: cat, y: data[cat].percentages, label: data[cat].numbers };
      axisData[cat] = formatPercent(data[cat].variations);
      chartData.push(chartRow);
    });

    this.setState({ chartData, axisData });
  }

  render() {
    const { dashboard } = this.props;
    const { percentagePhrase, movements, chartData, axisData } = this.state;

    if (!chartData || !axisData) return <div>Carregando</div>;

    if (!dashboard) {
      return (
        <article className="page radar">
          <div className="radarLeft">
            <PerformanceChart data={chartData} axis={axisData} />
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
      <article className="page page-radar columns-2">
        <div className="radarLeft">
          <PerformanceChart data={chartData} axis={axisData} />
        </div>
      </article>
    );
  }
}

PerformanceRadar.propTypes = propTypes;
export default PerformanceRadar;
