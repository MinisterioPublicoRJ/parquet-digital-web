/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

import { VictoryPie, VictoryLabel, VictoryChart, VictoryAxis } from 'victory';

import ChartPoints from '../ChartPoint';
import ChartPins from '../ChartPins';

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      label: PropTypes.string,
      color: PropTypes.string,
    }),
  ).isRequired,
  points: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      type: PropTypes.string,
    }),
  ).isRequired,
  pins: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      type: PropTypes.string,
    }),
  ).isRequired,
  labelText: PropTypes.string.isRequired,
  labelCompliment: PropTypes.string.isRequired,
  domain: PropTypes.shape({ min: PropTypes.number, max: PropTypes.number }).isRequired,
  pointerPosition: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      type: PropTypes.string,
    }),
  ).isRequired,
};

function TempoTramitacaoChart({ data, points, pins, labelText, domain, pointerPosition }) {
  const { min, max } = domain;

  const victoryChartSettings = {
    domain: { x: [min, max], y: [0, 100] },
    startAngle: 0,
    endAngle: 180,
    width: 200,
    height: 200,
    padding: { top: 100, bottom: 0, left: 15, right: 0 },
    standalone: false,
  };

  // Spacing for chart labels
  const chartPieLabelsDx = [-40, 40, 8];
  const chartPieLabelsDy = [-10, 15, 15];

  const chartPieSettings = {
    radius: 100,
    startAngle: -90,
    endAngle: 90,
    innerRadius: 90,
    labelComponent: (
      <VictoryLabel
        text={({ datum }) => [datum.label, 'dias']}
        style={[
          { fill: ({ datum }) => datum.color, fontFamily: 'Roboto', fontSize: 15, fontWeight: 700 },
          { fill: ({ datum }) => datum.color, fontFamily: 'Roboto', fontSize: 9 },
        ]}
        dx={({ datum }) => chartPieLabelsDx[datum.x]}
        dy={({ datum }) => chartPieLabelsDy[datum.x]}
      />
    ),
    labelPosition: ({ datum }) => (datum.x !== 2 ? 'startAngle' : 'centroid'),
    labelRadius: 110,
    sortKey: 'x',
    style: {
      data: { fill: ({ datum }) => `url(#chartGradient${datum.x})` },
    },
  };

  const pointsSettings = {
    startAngle: -90,
    endAngle: 90,
    innerRadius: 90,
    labelComponent: <ChartPoints />,
    labelPosition: 'startAngle',
    labelRadius: 95,
    sortKey: 'x',
    style: { data: { opacity: 0 } },
  };

  const pinsSettings = {
    startAngle: -90,
    endAngle: 90,
    innerRadius: 90,
    labelComponent: <ChartPins />,
    labelPosition: 'centroid',
    labelRadius: 100,
    sortKey: 'x',
    style: { data: { opacity: 0 } },
  };

  const labelTextStyle = {
    fontSize: 23,
    fontFamily: 'Roboto',
    fontWeight: 700,
    fill: '#3C3C4D',
  };

  const blackLayerPieSettings = {
    startAngle: -86,
    endAngle: 86,
    innerRadius: 100,
    labels: () => null,
    radius: 56,
    style: {
      data: { fill: '#474757' },
    },
  };

  const pointerPieSettings = {
    startAngle: -90,
    endAngle: 90,
    innerRadius: 100,
    labels: () => null,
    labelPosition: 'startAngle',
    radius: 55,
    padAngle: 2,
    sortKey: 'x',
    style: { data: { fill: '#fff' } },
  };

  return (
    <svg width="100%" height="100%" viewBox="0 0 220 240">
      {/* Gradients to fill the chart */}
      <defs>
        <linearGradient id="chartGradient0">
          <stop offset="0%" stopColor="#8A63D3" />
          <stop offset="100%" stopColor="#57A8E2" />
        </linearGradient>

        <linearGradient id="chartGradient1">
          <stop offset="0%" stopColor="#57A8E2" />
          <stop offset="50%" stopColor="#4CB7E5" />
          <stop offset="100%" stopColor="#55B75B" />
        </linearGradient>

        <linearGradient id="chartGradient2">
          <stop offset="0%" stopColor="#55B75B" />
          <stop offset="100%" stopColor="#64B967" />
        </linearGradient>
      </defs>

      {/* Circle in the center */}
      <circle cx="115" cy="150" r="55" fill="#F6F6F6" />

      <VictoryChart polar {...victoryChartSettings}>
        {/* This hides the axis from showing */}
        <VictoryAxis style={{ axis: { stroke: 'none' } }} tickFormat={() => null} />

        {/* Number in the center text */}
        <VictoryLabel textAnchor="middle" x={115} y={150} text={labelText} style={labelTextStyle} />

        {/* Black layer to make a fake pointer */}
        <VictoryPie {...blackLayerPieSettings} data={[{ x: 0, y: 1 }]} />

        {/* This chart covers the previous chart with gray to create a pointer effect */}
        <VictoryPie {...pointerPieSettings} data={pointerPosition} />

        {/* This is the actual pie chart that renders the bars and the labels around it */}
        <VictoryPie {...chartPieSettings} data={data} />

        {/* This pie has the points */}
        <VictoryPie {...pointsSettings} data={points} />

        {/* This pie has the pins */}
        <VictoryPie {...pinsSettings} data={pins} />
      </VictoryChart>
    </svg>
  );
}

TempoTramitacaoChart.propTypes = propTypes;
export default TempoTramitacaoChart;
