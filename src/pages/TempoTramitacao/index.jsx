import React from 'react';
import ProTypes from 'prop-types';

import './styles.css';
import Api from '../../api';
import { getUser } from '../../user';
import { formatPercent } from '../../utils';
import { ProcessingTimeChart } from '../../components/graphs/ProcessingTimeChart';

/* const propTypes = {
  dashboard: PropTypes.bool.isRequired,
}; */

class TempoTramitacao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getTramitacaoData();
  }

  async getTramitacaoData() {
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
    return (
      <article className="page-tramitacao">
        <p>Tempo de tramitação (em dias)</p>
        <div className="tramitacao-chart" />
        <span style={{ fontWeight: 'bold' }}>Frase</span>
      </article>
    );
  }
}

/*TempoTramitacao.propTypes = propTypes;*/
export default TempoTramitacao;
