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
  const [chartData, setChartData] = useState(null);

  const cleanChartData = raw => {
    const { min, max, average } = raw.pacoteData;
    console.log('min, max, average', min, max, average);

    // calculating the points exactly between the values
    const halfMinAvg = (average - min) / 2;
    const halfMaxAvg = (max - average) / 2;

    // using the midpoints, make three sections to draw "good", "average" and "bad" time ranges
    const pieData = [
      // 'good' section from min until halfway to average
      { x: 2, y: halfMinAvg / max, color: '#42DCA7' },
      // 'average' section, from the end of the last section until halfway to max
      { x: 1, y: (halfMaxAvg - halfMinAvg) / max, color: '#6D86EC' },
      // 'bad' section, from the last section all the way to max
      { x: 0, y: (max - halfMaxAvg) / max, color: '#A256BA' },
    ];

    const points = null;
    setChartData({ pieData, points });
  };

  useEffect(() => {
    const loadData = async () => {
      const response = await Api.getProcessingTimeData(getUser());
      setProcessingTime(response);
      cleanChartData(response);
    };
    loadData();
  }, []);

  if (!processingTime.meta || !chartData) {
    return <div>loading</div>;
  }

  return (
    <article className="page-tramitacao">
      <div className="tramitacao-texts">
        <h3>Tempo de tramitação</h3>
        <p>
          Avaliei que o período de tramitação de processos na sua promotoria
          <strong> está mais rápido que a média da casa </strong>
          entre aquelas de mesma atribuição.
          <strong>Muito Bom</strong>
        </p>
      </div>
      <div className="processingTimeChart" />
      <ProcessingTimeChart data={chartData.pieData} />
      <div />
      <div className="main-box-time">
        <div className="second-box-time">
          <div className="pin">
            <PinPreto />
          </div>
          <div className="third-box-time">
            <h3 style={{ color: '#474757' }}>{processingTime.orgaoData.min} dias</h3>
            <p>Transito mais rápido da sua promotoria</p>
          </div>
        </div>
        <div className="second-box-time">
         <div className="pin">
            <PinAzul />
         </div>
          <div className="third-box-time">
            <h3 style={{ color: '#56E8E1' }}>{processingTime.orgaoData.max} dias</h3>
            <p>Transito mais lento da sua promotoria</p>
          </div>
        </div>
        <div className="second-box-time">
        <div className="pin">
          <PinVermelho />
        </div>
          <div className="third-box-time">
            <h3 style={{ color: '#FF0086' }}>{processingTime.orgaoData.average} dias</h3>
            <p>Transito médio da sua promotoria</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProcessingTime;
