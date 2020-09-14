import React from 'react';
// import PropTypes from 'prop-types';
import {
  VictoryChart,
  // VictoryPortal,
  VictoryPolarAxis,
  // VictoryArea,
  // VictoryGroup,
  // VictoryLabel,
} from 'victory';

import CHART_THEME from '../../../../themes/chartThemes';

function RadarGraph(props) {
  const { xAxis, userGraph, comparisionGraph } = props;
  // const grid = generateGrid(xAxis);

  return (
    <VictoryChart
      polar
      responsive
      domain={{ y: [-5, 100], x: [0, 5] }}
      startAngle={90}
      endAngle={450}
      padding={{ top: 40, left: 0, right: 0, bottom: 10 }}
    >
      {xAxis.map((test, i) => (
        <VictoryPolarAxis
          dependentAxis
          label="hello"
          axisAngle={90 + i * 72}
          style={CHART_THEME.polarAxis}
        />
      ))}
    </VictoryChart>
  );
}

export default RadarGraph;
