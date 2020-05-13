/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

import { VictoryPie, VictoryLabel, VictoryChart, VictoryAxis } from 'victory';
import { ChartPoints, LabelWrapper } from '../ProcessingTime';
import ProcessingTimeArrow from '../../assets/svg/processingTimeArrow';

const graphicColor = ['#F8F9FB']; // Colors

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
  labelCompliment: PropTypes.string.isRequired,
  domain: PropTypes.shape({ min: PropTypes.number, max: PropTypes.number }).isRequired,
};

function TempoTramitacaoChart({
  data,
  scatter,
  labelText,
  domain,
  labelCompliment,
  pointerPosition,
}) {
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
    labelRadius: 105,
    labelPosition: 'endAngle',
    radius: 100,
    startAngle: -110,
    padAngle: 2,
    sortKey: 'x',
    style: {
      labels: {
        fontSize: 12,
        fontWeight: '400',
        height: 12,
        fill: ({ datum }) => datum.color,
      },
      data: { fill: ({ datum }) => datum.color },
    },
  };

  const labelsPieSettings = {
    endAngle: 80,
    height: 200,
    innerRadius: 90,
    labelComponent: <ChartPoints />,
    labelPosition: 'endAngle',
    labelRadius: 95,
    radius: 100,
    sortKey: 'x',
    startAngle: -110,
    style: { data: { opacity: 0 } },
  };

  const labelTextStyle = {
    fontSize: 18,
    fontWeight: '600',
  };

  const labelComplimentStyle = {
    fontSize: 10,
    fill: '#3FA9F5',
  };

  const pointerPieSettings = {
    colorScale: ['transparent', '#3FA9F5'],
    endAngle: 80,
    height: 200,
    innerRadius: 50,
    radius: 60,
    labelComponent: <ChartPoints />,
    labelRadius: 50,
    sortKey: 'x',
    startAngle: -110,
    // style: { data: { opacity: 0 } },
  };

  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200">
      <VictoryChart polar {...victoryChartSettings}>
        {/* DECORATIONS */}
        <circle cx="100" cy="140" r="40" fill="none" stroke="#B3B3B3" />
        <VictoryLabel textAnchor="middle" x={100} y={133} text={labelText} style={labelTextStyle} />
        <VictoryLabel
          textAnchor="middle"
          x={100}
          y={148}
          text={labelCompliment}
          style={labelComplimentStyle}
        />
        <VictoryPie {...decorationPieSettings} />

        {/* GRAPHS AND AXIS */}
        <VictoryAxis style={{ axis: { stroke: 'none' } }} />
        <VictoryPie {...chartPieSettings} data={data} />
        <VictoryPie {...labelsPieSettings} data={scatter} />
        <VictoryPie {...pointerPieSettings} data={pointerPosition} />
      </VictoryChart>
    </svg>
  );
}

TempoTramitacaoChart.propTypes = propTypes;
export default TempoTramitacaoChart;
