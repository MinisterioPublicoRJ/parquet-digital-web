import React, { useState, useEffect } from 'react';

import './styles.css';
import Api from '../../api';
import { getUser } from '../../user';
import { SectionTitle } from '../../components';
import { ProcessingTimeChart } from '../../components/graphs';
import PinAzul from '../../assets/svg/pinAzul';
import PinVermelho from '../../assets/svg/pinVermelho';
import MarkMind from '../../assets/svg/markMind';
import Markfaster from '../../assets/svg/markFaster';
import MarkSlower from '../../assets/svg/markSlower';
// import ChartPointComponent from './chartPointComponent';

const ProcessingTime = () => {
  const [processingTime, setProcessingTime] = useState({});
  const [chartData, setChartData] = useState(null);

  const cleanChartData = raw => {
    const organAvg = raw.orgaoData.average.toFixed(2);
    const { min, max, average } = raw.pacoteData;
    const domain = { min, max };

    // calculating the points exactly between the values
    const halfMinAvg = (average - min) / 2;
    const halfMaxAvg = (max - average) / 2;

    // using the midpoints, make three sections to draw "good", "average" and "bad" time ranges
    const pieData = [
      // 'good' section from min until halfway to average
      { x: 2, y: halfMinAvg / max, color: '#42DCA7', label: halfMinAvg.toFixed(0) },
      // 'average' section, from the end of the last section until halfway to max
      { x: 1, y: (halfMaxAvg - halfMinAvg) / max, color: '#6D86EC', label: halfMaxAvg.toFixed(0) },
      // 'bad' section, from the last section all the way to max
      { x: 0, y: (max - halfMaxAvg) / max, color: '#A256BA', label: max.toFixed(0) },
    ];

    const points = [
      { x: 2, y: min / max, type: 'min' },
      { x: 1, y: (average - min) / max, type: 'average' },
      { x: 0, y: (max - average) / max, type: 'max' },
    ];
    setChartData({ pieData, points, domain, organAvg });
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

  const isBetter = processingTime.orgaoData.average >= processingTime.pacoteData.average;
  // return (
  //   <article className="page-tramitacao">
  //     <div className="tramitacao-texts">
  //       <ChartPointComponent />
  //       <h3>Tempo de tramitação</h3>
  //       <p>
  //         Avaliei que o período de tramitação de processos na sua promotoria
  //         <strong> está mais rápido que a média da casa </strong>
  //         entre aquelas de mesma atribuição.
  //         <strong>Muito Bom</strong>
  //       </p>
  //     </div>
  //     <div className="processingTimeChart" />
  //     <ProcessingTimeChart data={chartData.pieData} />
  //     <div />
  //     <div className="main-box-time">
  //       <div className="second-box-time">
  //         <div className="pin">
  //           <PinPreto />
  //         </div>
  //         <div className="third-box-time">
  //           <h3 style={{ color: '#474757' }}>{processingTime.orgaoData.min} dias</h3>
  //           <p>Transito mais rápido da sua promotoria</p>
  //         </div>
  //       </div>
  //       <div className="second-box-time">
  //        <div className="pin">
  //           <PinAzul />
  //        </div>
  //         <div className="third-box-time">
  //           <h3 style={{ color: '#56E8E1' }}>{processingTime.orgaoData.max} dias</h3>
  //           <p>Transito mais lento da sua promotoria</p>
  //         </div>
  //       </div>
  //       <div className="second-box-time">
  //       <div className="pin">
  //         <PinVermelho />
  //       </div>
  //         <div className="third-box-time">
  //           <h3 style={{ color: '#FF0086' }}>{processingTime.orgaoData.average} dias</h3>
  //           <p>Transito médio da sua promotoria</p>
  //         </div>
  //       </div>
  //     </div>
  //   </article>
  // );

  return (
    <article className="page-tramitacao">
      <div className="pt-Texts">
        <SectionTitle value="tempo de tramitação" />
        <p>
          Avaliei que o período de tramitação de processos na sua promotoria
          <strong>
            {isBetter ? ' está mais rápido que a média da casa ' : 'está abaixo da média da casa'}
          </strong>
          entre aquelas de mesma atribuição.
          {'\n'}
          {isBetter && <strong>Muito Bom!</strong>}
        </p>
      </div>
      <div className="pt-graph">
        <ProcessingTimeChart
          data={chartData.pieData}
          scatter={chartData.points}
          domain={chartData.domain}
          labelText={isBetter ? `${chartData.organAvg}\nMuito bom` : chartData.organAvg}
        />
      </div>
      <div className="pt-mainBox">
        <div className="pt-legends">
          <div className="pt-legends-icon">
            <PinAzul />
          </div>
          <div className="pt-legends-text">
            <span className="pt-legends-highlight" style={{ color: '#56E8E1' }}>
              {processingTime.orgaoData.min.toFixed(0)}
            </span>
            trânsito mais rápido da sua promotoria
          </div>
        </div>
        <div className="pt-legends">
          <div className="pt-legends-icon">
            <PinVermelho />
          </div>
          <div className="pt-legends-text">
            <span className="pt-legends-highlight" style={{ color: '#FF0086' }}>
              {processingTime.orgaoData.max.toFixed(0)}
            </span>
            trânsito mais lento da sua promotoria
          </div>
        </div>
        <div className="pt-legends">
          <div className="pt-legends-icon">
            <Markfaster />
          </div>
          <div className="pt-legends-text">
            <span className="pt-legends-highlight" style={{ color: '#42DCA7' }}>
              {processingTime.pacoteData.min.toFixed(0)}
            </span>
            trânsito mais rápido do pacote
          </div>
        </div>
        <div className="pt-legends">
          <div className="pt-legends-icon">
            <MarkMind />
          </div>
          <div className="pt-legends-text">
            <span className="pt-legends-highlight" style={{ color: '#6D86EC' }}>
              {processingTime.pacoteData.average.toFixed(0)}
            </span>
            trânsito médio do seu pacote
          </div>
        </div>
        <div className="pt-legends">
          <div className="pt-legends-icon">
            <MarkSlower />
          </div>
          <div className="pt-legends-text">
            <span className="pt-legends-highlight" style={{ color: '#FF0086' }}>
              {processingTime.pacoteData.max.toFixed(0)}
            </span>
            trânsito mais lento do seu pacote
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProcessingTime;
