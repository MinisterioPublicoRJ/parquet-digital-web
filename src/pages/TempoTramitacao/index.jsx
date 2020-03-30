import React from 'react';

import './styles.css';
import Api from '../../api';
import { getUser } from '../../user';
import { formatPercent } from '../../utils';
import { ProcessingTimeChart } from '../../components/graphs';

class TempoTramitacao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getTempoTramitacaoData();
  }

  async getTempoTramitacaoData() {
    const res = await Api.getTempoTramitacaoData(getUser());
    this.buildGraphData(res);
    // eslint-disable-next-line no-console
    console.log(res);
  }

  buildGraphData(data) {
    const chartData = [];
    const axisData = {};
    const time = Object.keys(data);

    time.forEach(t => {
      if (t === 'meta') return;
      const chartRow = { x: t, y: data[t].percentages, label: data[t].numbers };
      axisData[t] = formatPercent(data[t].variations);
      chartData.push(chartRow);
    });

    this.setState({ chartData, axisData });
  }

  render() {
    const { number, chartData, axisData } = this.state

    if (!chartData || !axisData) return <div>Carregando</div>;

    return (
      <article className="page-tramitacao">
        <div className="tramitacao-texts">
          <h3>Tempo de tramitação</h3>
          <p>
            Avaliei que o período de tramitação de processos na sua promotoria está mais rápido que
            a média da casa entre aquelas de mesma atribuição. Muito Bom!
          </p>
        </div>
        <div className="processingTimeChart" />
        <ProcessingTimeChart data={chartData} axis={axisData} />
        <div />
        <div className="box-time">
          <p>620 dias</p>
        </div>
      </article>
    );
  }
}

export default TempoTramitacao;
