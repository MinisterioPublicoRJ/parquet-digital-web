import React from 'react';

import { SectionTitle } from '../components';
import './performanceRadarStyles.css';

class PerformanceRadar extends React.Component {
  constructor(props) {
    super(props);
    const percentagePhrase = ' 10% abaixo ';
    const movements = 58;
    this.state = { percentagePhrase, movements};
    this.getPerformanceData();
  }

  getPerformanceData() {
    console.log('I HELPS!');
  }

  render() {
    const { dashboard } = this.props;
    const { percentagePhrase, movements } = this.state;

    if (!percentagePhrase || !movements) return <div>Carregando</div>;

    return (
      <article className="page radar">
        <div className="radarLeft">graph goes here</div>
        <div className="radarRight">
          {/* <SectionTitle value="resumo do dia" /> */}
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
}

export default PerformanceRadar;
