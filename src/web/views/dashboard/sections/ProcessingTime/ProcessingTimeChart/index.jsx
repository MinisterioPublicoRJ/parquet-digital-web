/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { VictoryPie, VictoryLabel, VictoryChart, VictoryAxis, VictoryTooltip } from 'victory';
import ChartPoints from '../ChartPoint';
import LabelWrapper from '../LabelWrapper';

const fillerData = [
  { y: 0, color: '#B3B3B3' },
  { y: 0, color: '#B3B3B3' },
  { y: 100, color: '#B3B3B3' },
];

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
  labelText: PropTypes.string.isRequired,
  labelCompliment: PropTypes.string.isRequired,
  domain: PropTypes.shape({ min: PropTypes.number, max: PropTypes.number }).isRequired,
};

function TempoTramitacaoChart({
  data,
  points,
  labelText,
  domain,
  labelCompliment,
  pointerPosition,
}) {
  const [chartData, setChartData] = useState(fillerData);
  const { min, max } = domain;

  // anti prop, but the only way to force victory to animate :/
  useEffect(() => {
    if (chartData === fillerData) {
      setChartData(data);
    }
  }, [data]);

  const chartTooltipLabels = [
    {
      label: "trânsito mais rápido\n da sua atribuição",
      type: "min",
      x: points[0].x,
      y: points[0].y
    },
    {
      label: "trânsito médio\n da sua atribuição",
      type: "average",
      x: points[1].x,
      y: points[1].y
    },
    {
      label: "trânsito mais lento\n da sua atribuição",
      type: "max",
      x: points[2].x,
      y: points[2].y
    }
  ]

  const victoryChartSettings = {
    domain: { x: [min, max], y: [0, 100] },
    startAngle: 10,
    endAngle: 200,
    width: 200,
    height: 200,
    padding: { top: 100, bottom: 0, left: 0, right: 0 },
    standalone: false,
  };

  const chartPieSettings = {
    width: 200,
    height: 200,
    radius: 100,
    startAngle: -100,
    endAngle: 75,
    innerRadius: 94,
    labelComponent: <LabelWrapper />,
    labelRadius: 105,
    labelPosition: ({ index }) => (index === 2 ? 'endAngle' : 'startAngle'),
    padAngle: 1,
    sortKey: 'x',
    animate: { easing: 'exp' },
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
    width: 200,
    height: 200,
    startAngle: -100,
    endAngle: 80,
    innerRadius: 90,
    labelComponent: <ChartPoints />,
    labelPosition: 'endAngle',
    labelRadius: 95,
    radius: 100,
    sortKey: 'x',
    style: { data: { opacity: 0 } },
  };

  const labelTextStyle = {
    fontSize: 29,
    fill: '#3C3C4D',
  };

  const labelComplimentStyle = {
    fontSize: 6,
    fill: '#3FA9F5',
  };

  const chartTooltipsSettings = {
    width: 200,
    height: 200,
    radius: 100,
    innerRadius: 94,
    sortKey: "x",
    startAngle: -102,
    endAngle: 84,
    style: {
      data: { opacity: 0 },
      labels: { fontSize: 6.5, fill: "#AFAFAF", fontFamily: "Roboto" }
    },
    labelComponent: (
      <VictoryTooltip
        active
        flyoutWidth={70}
        flyoutHeight={25}
        flyoutStyle={{ stroke: "#AFAFAF", strokeWidth: 0.2, fill: "#FFF" }}
        orientation={(datum) => datum.index === 2 || datum.index === 0 ? "bottom" : "right"}
        cornerRadius={2}
        pointerLength={6}
      />
    ),
    labelPosition: "endAngle",
    labelRadius: 95,

  }

  return (
    <svg width="100%" height="100%" viewBox="0 0 220 240">
      {/* SVG DECORATIONS */}
      {/* Gray circular background */}
      <svg width="280" height="255" x="-35" y="-10" viewBox="0 0 380 255" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M379.834 189.775C379.86 211.919 375.995 233.895 368.415 254.701L187.124 191.884L11.4958 252.732C2.32973 226.703 -1.04267 198.987 1.61433 171.52C4.27133 144.053 12.8936 117.497 26.8787 93.7078C40.8638 69.9187 59.8746 49.47 82.5827 33.7905C105.291 18.1109 131.149 7.57854 158.349 2.92931C185.55 -1.71992 213.438 -0.373942 240.065 6.87324C266.692 14.1204 291.415 27.0941 312.508 44.8877C333.6 62.6812 350.553 84.8657 362.182 109.891C373.812 134.916 379.836 162.179 379.836 189.775H379.834Z" fill="#F4F5FA" />
      </svg>
      {/* The circles in the center */}
      <circle cx="110" cy="130" r="62" fill="#FFF" />
      <circle cx="110" cy="130" r="50" fill="none" stroke="#000" strokeWidth="0.5" />

      <VictoryChart {...victoryChartSettings}>
        {/* DECORATIONS */}
        {/* Number in the center text */}
        <VictoryLabel textAnchor="middle" x={108} y={120} text={labelText} style={labelTextStyle} />
        {/* Congratulation text */}
        <VictoryLabel
          textAnchor="middle"
          x={108}
          y={150}
          text={labelCompliment}
          style={labelComplimentStyle}
        />

        {/* GRAPHS AND AXIS */}
        {/* This hides the axis from showing */}
        <VictoryAxis style={{ axis: { stroke: 'none' } }} tickFormat={() => null} />
        {/* This is the actual pie chart that renders the bars and the labels around it */}
        <VictoryPie data={chartData} {...chartPieSettings} />
        {/* This pie has the circles */}
        <VictoryPie {...labelsPieSettings} data={points} />
      </VictoryChart>

      <VictoryChart {...victoryChartSettings}>
        {/* The tooltips of the chart  */}
        <VictoryPie data={chartTooltipLabels} {...chartTooltipsSettings} />
        {/* This hides the axis from showing */}
        <VictoryAxis style={{ axis: { stroke: 'none' } }} tickFormat={() => null} />
      </VictoryChart>

      {/* Pointer */}
      <line x1="112" y1="51" x2="112" y2="80" strokeWidth="2" stroke="#474757" />
    </svg>
  );
}

TempoTramitacaoChart.propTypes = propTypes;
export default TempoTramitacaoChart;
