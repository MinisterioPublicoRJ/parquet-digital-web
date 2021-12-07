import React, { useState, useEffect } from 'react';

import './styles.css';
import Api from '../../../api';
import { useAuth } from '../../../app/authContext';
import { SectionTitle, Spinner } from '../../../components';
import ProcessingTimeChart from './ProcessingTimeChart';
import { PT_PIE_COLORS } from '../../../themes/chartThemes';

import { PinAzul, PinVermelho, MarkMind, Markfaster, MarkSlower } from '../../../assets';

import processTypeDict from './processingTimeConstants';

const getCategoryByType = ({ tipo }) => {
  switch (tipo) {
    case 1:
      return 'tutelaInqueritosCivis';
    case 2:
      return 'pipInvestigacoes';
    default:
      return '';
  }
};

const ProcessingTime = () => {
  const { currentOffice, buildRequestParams } = useAuth();
  const [processingTime, setProcessingTime] = useState({});
  const [chartData, setChartData] = useState(null);
  const mainCategory = getCategoryByType(currentOffice);
  const [loading, setLoading] = useState(true);

  const cleanChartData = (raw) => {
    const organAvg = Number(raw.orgaoData.average).toFixed(0);
    const { min, max, average } = raw.pacoteData;
    const domain = { min, max };

    // calculating the points exactly between the values
    const halfMinAvg = (average - min) / 2;
    const halfMaxAvg = (max - average) / 2;

    // using the midpoints, make three sections to draw "good", "average" and "bad" time ranges
    const pieData = [
      // 'good' section from min until halfway to average
      { x: 2, y: halfMinAvg / max, color: PT_PIE_COLORS[0], label: Number(min).toFixed(0) },
      // 'average' section, from the end of the last section until halfway to max
      {
        x: 1,
        y: (halfMaxAvg - halfMinAvg) / max,
        color: PT_PIE_COLORS[1],
        label: halfMaxAvg.toFixed(0),
      },
      // 'bad' section, from the last section all the way to max
      { x: 0, y: (max - halfMaxAvg) / max, color: PT_PIE_COLORS[2], label: Number(max).toFixed(0) },
    ];

    const points = [
      { x: 2, y: average, type: 'min', label: max },
      { x: 1, y: max - average, type: 'average', label: max - average },
      { x: 0, y: 0, type: 'max', label: 0 },
    ];

    const pointerPosition = [
      { x: 1, y: organAvg / max, type: 'pointer' },
      { x: 0, y: (max - organAvg) / max },
    ];
    setChartData({ pieData, points, domain, organAvg, pointerPosition });
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await Api.getProcessingTimeData(buildRequestParams());
        setProcessingTime(response);
        cleanChartData(response[mainCategory]);
      } catch (e) {
        setChartData(false);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  if (!chartData || loading) {
    return (
      <article className="page-tramitacao">
        <div className="pt-texts">
          <SectionTitle value="tempo de tramitação" />
          {loading ? <Spinner size="large" /> : <p>Nenhum dado para exibir</p>}
        </div>
      </article>
    );
  }

  const typeDisplayableName = processTypeDict[mainCategory];
  const categoryProcessingTime = processingTime[mainCategory];
  const isBetter =
    categoryProcessingTime.orgaoData.average <= categoryProcessingTime.pacoteData.average;
  const pinWidth = '65%';

  return (
    <article className="page-tramitacao">
      <div className="pt-texts">
        <SectionTitle value="tempo de tramitação" glueToTop />
        <p>
          Avaliei que o tempo médio de tramitação de
          {` ${typeDisplayableName} `}
          na sua promotoria,
          {` ${chartData.organAvg}  dias,`}
          <strong>
            {isBetter
              ? ` está mais rápido que a média da casa `
              : ` está mais lento que a média da casa `}
          </strong>
          para o seu grupo (promotorias de mesma atribuição).
          {'\n'}
          {isBetter && <strong>Muito Bom!</strong>}
        </p>
      </div>
      <div className="pt-graph">
        <ProcessingTimeChart
          data={chartData.pieData}
          points={chartData.points}
          domain={chartData.domain}
          labelText={chartData.organAvg}
          pointerPosition={chartData.pointerPosition}
          labelCompliment={isBetter ? 'Muito bom' : ''}
        />
      </div>
      <div className="pt-mainBox">
        <div className="pt-legends">
          <div className="pt-legends-icon">
            <PinAzul width={pinWidth} />
          </div>
          <div className="pt-legends-text">
            <span className="pt-legends-highlight turquoise">
              <span>{`${categoryProcessingTime.orgaoData.min.toFixed(0)}`}</span>
              <span>{` dias`}</span>
            </span>
            mais rápido da sua promotoria
          </div>
        </div>
        <div className="pt-legends">
          <div className="pt-legends-icon">
            <PinVermelho width={pinWidth} />
          </div>
          <div className="pt-legends-text">
            <span className="pt-legends-highlight pink">
              <span>{`${categoryProcessingTime.orgaoData.max.toFixed(0)}`}</span>
              <span>{` dias`}</span>
            </span>
            mais lento da sua promotoria
          </div>
        </div>
        <div className="pt-legends">
          <div className="pt-legends-icon">
            <Markfaster width={pinWidth} />
          </div>
          <div className="pt-legends-text">
            <span className="pt-legends-highlight green">
              <span>{`${categoryProcessingTime.pacoteData.min.toFixed(0)}`}</span>
              <span>{` dias`}</span>
            </span>
            mais rápido do grupo
          </div>
        </div>
        <div className="pt-legends">
          <div className="pt-legends-icon">
            <MarkMind width={pinWidth} />
          </div>
          <div className="pt-legends-text">
            <span className="pt-legends-highlight purple">
              <span>{`${categoryProcessingTime.pacoteData.average.toFixed(0)}`}</span>
              <span>{` dias`}</span>
            </span>
            médio do seu grupo
          </div>
        </div>
        <div className="pt-legends">
          <div className="pt-legends-icon">
            <MarkSlower width={pinWidth} />
          </div>
          <div className="pt-legends-text">
            <span className="pt-legends-highlight pink">
              <span>{`${categoryProcessingTime.pacoteData.max.toFixed(0)}`}</span>
              <span>{` dias`}</span>
            </span>
            mais lento do seu grupo
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProcessingTime;
