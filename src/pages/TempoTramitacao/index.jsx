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
      </article>
    );
  }
}

/* TempoTramitacao.propTypes = propTypes; */
export default TempoTramitacao;
