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
    const response = await Api.getTempoTramitacaoData(getUser());
    this.buildGraphData(response);
    this.setState({ medias: response });
    // eslint-disable-next-line no-console
    console.log(response);
  }

  buildGraphData(data) {
    const chartData = [];
    const axisData = {};
    const timeTramitation = Object.keys(data);

    this.setState({ chartData, axisData });
  }

  render() {
    const { chartData, axisData } = this.state;

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
        <div className="main-box-time">
          <div className="texts-box-time">
            <p>140 dias</p>
            <p>Transito mais rápido da sua promotoria</p>
            <p>2100 dias</p>
            <p>Transito mais lento da sua promotoria</p>
            <p>620 dias</p>
            <p>Transito médio da sua promotoria</p>
          </div>
          <div className="box-time">
            <p>120 dias</p>
            <p>Transito mais rápido da sua atribuição</p>
            <p>2800 dias</p>
            <p>Transito mais lento da sua atribuição</p>
            <p>548 dias</p>
            <p>Transito médio da sua atribuição</p>
          </div>
        </div>
      </article>
    );
  }
}

export default TempoTramitacao;
