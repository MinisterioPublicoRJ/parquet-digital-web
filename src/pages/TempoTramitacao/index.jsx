import React from 'react';
import ProTypes from 'prop-types';

import './styles.css';
import Api from '../../api';
import { getUser } from '../../user';
import { formatPercent } from '../../utils';
import { ProcessingTimeChart } from '../../components/graphs';

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
        <div className="tramitacao-texts">
          <h3>Tempo de tramitação</h3>
          <p>
            Avaliei que o período de tramitação de processos na sua promotoria está mais rápido que
            a média da casa entre aquelas de mesma atribuição. Muito Bom!
          </p>
        </div>
        <div className="ProcessingTimeChart" />
        <ProcessingTimeChart />
        <div />
      </article>
    );
  }
}

/* TempoTramitacao.propTypes = propTypes; */
export default TempoTramitacao;
