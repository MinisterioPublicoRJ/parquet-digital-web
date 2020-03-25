import React from 'react';

import { ProcessingTimeChart } from '../../components/graphs/ProcessingTimeChart';
import './styles.css';

class TempoTramitacao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getTempoTramitacaoData();
  }

  getTempoTramitacaoData() {
    console.log('I HELPS!');
  }

  render() {
    const { dashboard } = this.props;

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
            <ProcessingTimeChart data={characterData} />
          </div>
        </article>
      );
    }
    return (
      <article className="page page-radar columns-2">
        <div className="radarLeft">
          <ProcessingTimeChart data={characterData} />
        </div>
      </article>
    );
  }
}

export default TempoTramitacao;
