import React from 'react';

import './styles.css';
import Api from '../../api';
import { getUser } from '../../user';
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

  buildGraphData() {
    const chartData = [];
    const axisData = {};
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
        <div className="processingTimeChart" />
        <ProcessingTimeChart />
        <div />
        <div className="box-time">
          <p>620 dias</p>
        </div>
      </article>
    );
  }
}

export default TempoTramitacao;
