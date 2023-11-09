import React, { useState, useEffect } from 'react';

import {
  pageTramitacao,
  spinnerWrapper,
  ptHeader,
  ptHeaderContent,
  ptHeaderImage,
  ptGraph,
  ptGraphWrapper,
  ptGraphSeparator,
  ptGraphLabels,
  ptGraphLabelsTitle,
  ptGraphLabelsTitleText,
  ptLegendsWrapper,
  ptLegends,
  ptLegendsIcon,
  ptLegendsText,
  ptLegendsHighlight,
  ptLegendsHighlightEmpty,
  ptLegendsCurrentTraffic,
  colorTurquoise,
  colorPink,
  colorModalGreen,
  colorModalBlue,
  colorModalYellow,
  colorPurple,
} from './styles.module.css';
import { useAppContext } from '../../../../../core/app/App.context';
import { SectionTitle, Spinner } from '../../../../components';
import ProcessingTimeChart from './ProcessingTimeChart';
import { PT_PIE_COLORS } from '../../../../themes/chartThemes';

import { PinVermelho, PinBranco, PinAmarelo, MarkMind, Markfaster, MarkSlower, ProcessingTimeHeader } from '../../../../assets';

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

function ProcessingTime() {
  const { currentOffice, buildRequestParams, Api } = useAppContext();
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

  if (!chartData || loading && !currentOffice.tipo === 7) {
    return (
      <article className={pageTramitacao}>
        {loading ? (
          <div className={spinnerWrapper}>
            <Spinner size="large" />
          </div>
        ) : <p>Gráfico em desenvolvimento para essa promotoria</p>}
      </article>
    );
  }

  
  const typeDisplayableName = processTypeDict[mainCategory];
  const categoryProcessingTime = processingTime[mainCategory];
  const isBetter =
    categoryProcessingTime.orgaoData.average <= categoryProcessingTime.pacoteData.average;
  const pinSize = { width: '40px', height: '40px' };

  return (
    <article className={pageTramitacao}>
      {!chartData && <strong>Muito Bom!</strong>}
      <div className={ptHeader}>
        <div className={ptHeaderContent}>
          <SectionTitle value="tempo de tramitação" glueToTop />
          <p>
            Avaliei que o período de tramitação de processos na sua promotoria
            <strong>
              {isBetter
                ? ` está mais rápido `
                : ` está mais lento `}
            </strong>
            que a média da casa entre aquelas de mesma atribuição.
            {'\n'}
            {isBetter && <strong>Muito Bom!</strong>}
          </p>
        </div>
        <div className={ptHeaderImage}>
          <ProcessingTimeHeader />
        </div>
      </div>

      <div className={ptGraph}>
        <div className={ptGraphWrapper}>
          <ProcessingTimeChart
            data={chartData.pieData}
            points={chartData.points}
            domain={chartData.domain}
            labelText={chartData.organAvg}
            pointerPosition={chartData.pointerPosition}
            labelCompliment={isBetter ? 'Muito bom' : ''}
          />
        </div>
        <div className={ptGraphSeparator} />
        <div className={ptGraphLabels}>
          <div className={ptGraphLabelsTitle}> 
              <h3 className={ptGraphLabelsTitleText}> Referente ao pacote </h3>
          </div>
          <div className={ptLegendsWrapper}>
            <div className={ptLegends}>
              <div className={ptLegendsIcon}>
                <MarkSlower width={pinSize.width} height={pinSize.height} />
              </div>
              <div className={ptLegendsText}>
                <span className={`${ptLegendsHighlight} ${colorModalGreen}`}>
                  <span>{categoryProcessingTime.pacoteData.max.toFixed(0)}</span>
                </span>
                trânsito mais lento 
                <span className={`${ptLegendsHighlight}`}>
                  do seu pacote
                </span>
              </div>
            </div>
            <div className={ptLegends}>
              <div className={ptLegendsIcon}>
                <MarkMind width={pinSize.width} height={pinSize.height} />
              </div>
              <div className={ptLegendsText}>
                <span className={`${ptLegendsHighlight} ${colorModalBlue}`}>
                  <span>{categoryProcessingTime.pacoteData.average.toFixed(0)}</span>
                </span>
                trânsito médio 
                <span className={`${ptLegendsHighlight}`}>
                  do seu pacote
                </span>
              </div>
            </div>
            <div className={ptLegends}>
              <div className={ptLegendsIcon}>
                <Markfaster width={pinSize.width} height={pinSize.height} />
              </div>
              <div className={ptLegendsText}>
                <span className={`${ptLegendsHighlight} ${colorPurple}`}>
                  <span>{categoryProcessingTime.pacoteData.min.toFixed(0)}</span>
                </span>
                trânsito mais rápido               
                <span className={`${ptLegendsHighlight}`}>
                  do seu pacote
                </span>
              </div>
            </div>
            
            
          </div>
          <div className={ptGraphLabelsTitle}> 
              <h3 className={ptGraphLabelsTitleText}> Referente a sua promotoria </h3>
          </div>
          <div className={ptLegendsWrapper}>
            <div className={ptLegends}>
              <div className={ptLegendsIcon}>
                <PinVermelho width={pinSize.width} height={pinSize.height} />
              </div>
              <div className={ptLegendsText}>
                <span className={`${ptLegendsHighlight} ${colorPink}`}>
                  <span>{categoryProcessingTime.orgaoData.max.toFixed(0)}</span>
                </span>
                  trânsito mais lento 
                <span className={`${ptLegendsHighlight}`}>
                  da sua promotoria
                </span>
              </div>
            </div>
            <div className={ptLegends}>
              <div className={ptLegendsIcon}>
                <PinAmarelo width={pinSize.width} height={pinSize.height} />
              </div>
              <div className={ptLegendsText}>
                <span className={`${ptLegendsHighlight} ${colorModalYellow}`}>
                  <span>{categoryProcessingTime.orgaoData.min.toFixed(0)}</span>
                </span>
                trânsito mais rápido 
                <span className={`${ptLegendsHighlight}`}>
                  da sua promotoria
                </span>
              </div>
            </div>
            <div className={ptLegends}>
              <div className={ptLegendsIcon}>
                <PinBranco width={pinSize.width} height={pinSize.height} />
              </div>
              <div className={ptLegendsText}>
                trânsito atual 
                <span className={`${ptLegendsHighlight}`}>
                  da sua promotoria
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProcessingTime;
