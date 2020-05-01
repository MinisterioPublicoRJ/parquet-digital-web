/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

import { VictoryPie, VictoryLabel, VictoryChart, VictoryAxis } from 'victory';
import ChartPointComponent from '../../sections/ProcessingTime/chartPointComponent';

const graphicColor = ['#F8F9FB']; // Colors

// workaround to use dynamic angles when placing the labels outside the pie
// props come from Victory itself
// https://formidable.com/open-source/victory/docs/victory-label/
function LabelWrapper(props) {
  return <VictoryLabel {...props} angle={props.datum.startAngle} />;
}

const propTypes = {
  data: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    label: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  scatter: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    type: PropTypes.string,
  }).isRequired,
  labelText: PropTypes.string.isRequired,
  domain: PropTypes.shape({ min: PropTypes.number, max: PropTypes.number }).isRequired,
};

function TempoTramitacaoChart({ data, scatter, labelText, domain }) {
  const { min, max } = domain;

  const victoryChartSettings = {
    domain: { x: [min, max], y: [0, 100] },
    endAngle: 200,
    height: 200,
    padding: { top: 20, bottom: -20, left: 0, right: 0 },
    standalone: false,
    startAngle: 10,
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
    },
  };

  const chartPieSettings = {
    endAngle: 80,
    innerRadius: 90,
    height: 200,
    labelComponent: <LabelWrapper />,
    labelRadius: 110,
    labelPosition: 'endAngle',
    radius: 100,
    startAngle: -110,
    padAngle: 2,
    sortKey: 'x',
    style: {
      labels: {
        fontSize: 15,
        fontWeight: '400',
        height: 10,
        fill: ({ datum }) => datum.color,
      },
      data: { fill: ({ datum }) => datum.color },
    },
  };

  const labelsPieSettings = {
    endAngle: 80,
    height: 200,
    innerRadius: 90,
    labelComponent: <ChartPointComponent />,
    labelPosition: 'endAngle',
    labelRadius: 95,
    radius: 100,
    sortKey: 'x',
    startAngle: -110,
    style: { data: { opacity: 0 } },
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
        <VictoryPie {...labelsPieSettings} data={scatter} />
      </VictoryChart>
    </svg>
  );
}

TempoTramitacaoChart.propTypes = propTypes;
export default TempoTramitacaoChart;
