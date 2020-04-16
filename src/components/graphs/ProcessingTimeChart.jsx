import React, { useState, useEffect } from 'react';
import { VictoryPie, VictoryLabel, VictoryChart, VictoryScatter, VictoryAxis } from 'victory';
import ChartPointComponent from '../../pages/ProcessingTime/chartPointComponent';
import CHART_THEME from '../../themes/chartThemes';

const graphicColorMain = ['#A256BA', '#56E8E1', '#A256BA', '#42DCA7']; // Colors
const graphicColor = ['#F8F9FB']; // Colors
// const wantedGraphicData = [{ y: 310 }, { y: 350 }, { y: 740 }, { y: 120 }]; // Data that we want to display

function TempoTramitacaoChart({ data, scatter, labelText, domain }) {
  const { min, max } = domain;
  console.log('domain', min, max, scatter);
  // TODO: animate VictoryPie
  // const [graphicData, setGraphicData] = useState(data);
  //
  // useEffect(() => {
  //   setGraphicData(wantedGraphicData); // Setting the data that we want to display
  // }, []);

  const victoryChartSettings = {
    domain: { x: [min, max], y: [0, 100] },
    endAngle: 200,
    height: 200,
    padding: { top: 20, bottom: -20, left: 0, right: 0 },
    standalone: false,
    startAngle: 10,
    style: {
      parent: {
        maxHeight: '100%',
        padding: 0,
        margin: 0,
      },
    },
    width: 200,
  };

  const decorationPieSettings = {
    colorScale: graphicColor,
    endAngle: 120,
    innerRadius: 50,
    labels: () => null,
    opacity: 1,
    padding: 5,
    startAngle: -120,
    style: {
      data: { fill: '#F4F5FA' },
    }
  };

  const chartPieSettings = {
    endAngle: 80,
    innerRadius: 90,
    height: 200,
    labelPosition: 'endAngle',
    radius: 100,
    startAngle: -110,
    padAngle: 2,
    sortKey: 'x',
    style: {
      labels: { fontSize: 15, fontWeight: '400', height: 10, fill: ({ datum }) => datum.color },
      data: { fill: ({ datum }) => datum.color },
    },
  };

  const scatterSettings = {
    style: { data: { fill: '#c43a31' } },
  };

  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200">
      <VictoryChart polar {...victoryChartSettings}>
        {/* DECORATIONS */}
        <circle cx="100" cy="140" r="40" fill="none" stroke="#B3B3B3" />
        <VictoryLabel textAnchor="middle" x={100} y={140} text={labelText} />
        <VictoryPie {...decorationPieSettings} />

        {/* GRAPHS AND AXIS */}
        <VictoryAxis style={{ axis: { stroke: 'none' } }} />
        <VictoryPie {...chartPieSettings} data={data} />
        <VictoryScatter data={scatter} {...scatterSettings} />
      </VictoryChart>
    </svg>
  );
}
export default TempoTramitacaoChart;
