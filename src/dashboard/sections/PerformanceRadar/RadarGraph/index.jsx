import React from 'react';
import PropTypes from 'prop-types';
import {
  VictoryChart,
  // VictoryPortal,
  VictoryPolarAxis,
  VictoryArea,
  VictoryGroup,
  VictoryLabel,
} from 'victory';

import CHART_THEME from '../../../../themes/chartThemes';

const propTypes = {
  xAxis: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      dx: PropTypes.number,
      dy: PropTypes.number,
      position: PropTypes.number,
      textAnchor: PropTypes.oneOf(['start', 'middle', 'end']),
      label: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
};

function RadarGraph(props) {
  const { xAxis, userGraph, comparisionGraph } = props;
  const grid = generateGrid(xAxis);

  /**
   * makes a fake grid to replicate the design's star shape
   * @param  {Array} axisData the xAxis prop
   * @return {Array}          Array with five smaller arrays, each with five objects
   *                          in every child array all the objects have the same y value
   *                          and the x values are the categories of the graph
   */
  function generateGrid(axisData) {
    const axisGrid = [];
    for (let i = 0; i < 5; i++) {
      const gridLevel = [];
      axisData.forEach((axis) =>
        gridLevel.push({
          x: axis.category,
          y: (i + 1) * 20,
        }),
      );
      axisGrid.push(gridLevel);
    }
    return axisGrid;
  }

  /**
   * picks different styles for each part of a label
   * @param  {Array} fullLabel Array of strings, each string is written in a new line
   * @return {JSON}           object with styles for that part of the label
   */
  function styleLabels(fullLabel) {
    return fullLabel.map((labelPieceStr) => {
      if (labelPieceStr.includes('máx')) {
        return CHART_THEME.axisMaxLabel;
      }
      return CHART_THEME.axisLabel;
    });
  }

  return (
    <VictoryChart
      polar
      responsive
      domain={{ y: [-5, 100], x: [0, 5] }}
      startAngle={90}
      endAngle={450}
      padding={{ top: 40, left: 0, right: 0, bottom: 10 }}
    >
      {xAxis.map(({ category, label, position, textAnchor, dx, dy }, i) => {
        return (
          <VictoryPolarAxis
            dependentAxis
            key={category}
            label={label}
            labelRadius={10}
            labelPlacement="vertical"
            axisAngle={90 + i * 72}
            style={CHART_THEME.polarAxis}
            axisLabelComponent={
              <VictoryLabel textAnchor={textAnchor} dx={dx} dy={dy} style={styleLabels(label)} />
            }
          />
        );
      })}
      {/* JUST DRAWS THE GRAY GRID */}
      <VictoryGroup style={CHART_THEME.gridGroup}>
        {grid.map((gridRow) => (
          <VictoryArea key={gridRow[0].y} data={gridRow} />
        ))}
      </VictoryGroup>
    </VictoryChart>
  );
}

RadarGraph.propTypes = propTypes;
export default RadarGraph;
