import React, { useState, useEffect } from 'react';

import './styles.css';
import Api from '../../api';
import { getUser } from '../../user';
import { ProcessingTimeChart } from '../../components/graphs';
import PinAzul from '../../assets/svg/pinAzul';
import PinPreto from '../../assets/svg/pinPreto';
import PinVermelho from '../../assets/svg/pinVermelho';

const ProcessingTime = () => {
  const [processingTime, setProcessingTime] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const response = await Api.getProcessingTimeData(getUser());
      setProcessingTime(response);
      console.log(response);
    };
    loadData();
  }, []);

  if (!processingTime.meta) {
    return <div>loading</div>
  }

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
      <ProcessingTimeChart data={processingTime} />
      <div />
      <div className="main-box-time">
        <div className="second-box-time">
          <PinPreto />
          <div className="third-box-time">
            <h3 style={{ color: '#474757' }}>
              {processingTime.orgaoData.min} dias</h3>
            <p>Transito mais rápido da sua promotoria</p>
          </div>
        </div>
        <div className="second-box-time">
          <PinAzul />
          <div className="third-box-time">
            <h3 style={{ color: '#56E8E1' }}>
            {processingTime.orgaoData.max} dias</h3>
            <p>Transito mais lento da sua promotoria</p>
          </div>
        </div>
        <div className="second-box-time">
          <PinVermelho />
          <div className="third-box-time">
            <h3 style={{ color: '#FF0086' }}>
            {processingTime.orgaoData.average} dias</h3>
            <p>Transito médio da sua promotoria</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProcessingTime;
