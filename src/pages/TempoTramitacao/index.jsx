import React, { useState, useEffect } from 'react';

import './styles.css';
import Api from '../../api';
import { getUser } from '../../user';
import { ProcessingTimeChart } from '../../components/graphs';
import PinAzul from '../../assets/svg/pinAzul';
import PinPreto from '../../assets/svg/pinPreto';
import PinVermelho from '../../assets/svg/pinVermelho';

const TempoTramitacao = () => {
  const [tempoTramitacao, setTempoTramitacao] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const response = await Api.getTempoTramitacaoData(getUser());
      setTempoTramitacao(response.data);
      console.log(response);
    };
    loadData();
  }, []);

  return (
    <article className="page-tramitacao">
      <div className="tramitacao-texts">
        <h3>Tempo de tramitação</h3>
        <p>
          Avaliei que o período de tramitação de processos na sua promotoria
          <strong> está mais rápido que a média da casa </strong>
          entre aquelas de mesma atribuição.<strong>Muito Bom</strong>
        </p>
      </div>
      <div className="processingTimeChart" />
      <ProcessingTimeChart data={tempoTramitacao} />
      <div />
      <div className="main-box-time">
        <div className="second-box-time">
          <PinPreto />
          <div className="third-box-time">
            <h3 style={{ color: '#474757' }}>
              {tempoTramitacao.minimo_orgao} dias</h3>
            <p>Transito mais rápido da sua promotoria</p>
          </div>
        </div>
        <div className="second-box-time">
          <PinAzul />
          <div className="third-box-time">
            <h3 style={{ color: '#56E8E1' }}>
            {tempoTramitacao.maximo_orgao} dias</h3>
            <p>Transito mais lento da sua promotoria</p>
          </div>
        </div>
        <div className="second-box-time">
          <PinVermelho />
          <div className="third-box-time">
            <h3 style={{ color: '#FF0086' }}>
            {tempoTramitacao.mediana_orgao} dias</h3>
            <p>Transito médio da sua promotoria</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TempoTramitacao;
