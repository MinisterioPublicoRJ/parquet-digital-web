import React from 'react';

import { PerformanceChart } from '../../components';
import { COD_PROM } from '../../constants';
import Api from '../../api';
import './styles.css';

class PerformanceRadar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getPerformanceData();
  }

  async getPerformanceData() {
    const res = await Api.getRadarData(COD_PROM)
    console.log('I HELPS!', res);
  }

  cleanGraphData(data) {

  }

  render() {
    const { dashboard } = this.props;
    const { percentagePhrase, movements } = this.state;

    if (!percentagePhrase || !movements) return <div>Carregando</div>;

    const characterData = [
      { x: 'arquivamentos', y: 50 },
      { x: 'ações civil públicas', y: 103 },
      { x: 'indeferimentos de plano', y: 250 },
      { x: 'instauração de investigações', y: 60 },
      { x: 'termos de ajuste de conduta', y: 103 },
    ];

    if (!dashboard) {
      return (
        <article className="page radar">
          <div className="radarLeft">
            <PerformanceChart data={characterData} />
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
          <PerformanceChart data={characterData} />
        </div>
      </article>
    );
  }
}

export default PerformanceRadar;
