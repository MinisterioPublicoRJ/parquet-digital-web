import React from 'react';

import './styles.css';
import Api from '../../api';
import { getUser } from '../../user';
import { formatPercent } from '../../utils';
import { ProcessingTimeChart } from '../../components/graphs';

import MarkFaster from '../../assets/svg/markFaster';
import MarkMind from '../../assets/svg/markMind';
import PinAzul from '../../assets/svg/pinAzul';
import PinPreto from '../../assets/svg/pinPreto';
import PinVermelho from '../../assets/svg/pinVermelho';

class TempoTramitacao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: [],
    };
    this.getTempoTramitacaoData = this.getTempoTramitacaoData.bind(this);
  }

  componentDidMount() {
    this.getTempoTramitacaoData();
  }

  async getTempoTramitacaoData() {
    const response = await Api.getTempoTramitacaoData(getUser());
    this.buildGraphData(response);
    this.setState({ medias: response });
    console.log(response);
  }

  buildGraphData(data) {
    const chartData = [];
    const axisData = {};
    const timeTramitation = Object.keys(data);

    this.setState({ chartData, axisData });
  }

  render() {
    const { chartData, axisData, medias } = this.state;

    console.log(this.state);
    if (!chartData || !axisData) return <div>Carregando</div>;

    return (
      <article className="page-tramitacao">
        <div className="tramitacao-texts">
          <h3>Tempo de tramitação</h3>
          <p>
            Avaliei que o período de tramitação de processos na sua promotoria
            <span> está mais rápido que a média da casa </span>
            entre aquelas de mesma atribuição.Muito Bom!
          </p>
        </div>
        <div className="processingTimeChart" />
        <ProcessingTimeChart data={chartData} axis={axisData} />
        <div />
        <div className="main-box-time">
          <div className="texts-box-time">
            <div className="second-box-time">
              <PinAzul />
              <p>{this.state.maxTimeOrgao}</p>
              <p>Transito mais rápido da sua promotoria</p>
            </div>
            <div className="second-box-time">
              <PinVermelho />
              <p>{this.state.minTimeOrgao}</p>
              <p>Transito mais lento da sua promotoria</p>
            </div>
            <div className="second-box-time">
              <PinPreto />
              <p>{this.state.mediaTimeOrgao}</p>
              <p>Transito médio da sua promotoria</p>
            </div>
          </div>
          <div className="box-time">
            <div className="second-box-time">
              <MarkFaster />
              <span>{this.state.maxTime}</span>
              <p>Transito mais rápido da sua atribuição</p>
            </div>
            <div className="second-box-time">
              <MarkMind />
              <p>{this.state.minTime}</p>
              <p>Transito mais lento da sua atribuição</p>
            </div>
            <div className="second-box-time">
              <MarkMind />
              <p>{this.state.mediaPromo}</p>
              <p>Transito médio da sua atribuição</p>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default TempoTramitacao;
