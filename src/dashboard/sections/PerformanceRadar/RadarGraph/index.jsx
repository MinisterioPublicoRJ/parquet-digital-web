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

import CustomLabel from './CustomLabel';
import CHART_THEME from '../../../../themes/chartThemes';

const propTypes = {
  xAxis: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      dx: PropTypes.number,
      dy: PropTypes.number,
      textAnchor: PropTypes.oneOf(['start', 'middle', 'end']),
      label: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  userGraph: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.string,
      y: PropTypes.number,
      total: PropTypes.number,
    }),
  ).isRequired,
  comparisionGraph: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.string,
      y: PropTypes.number,
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
    <>
      <svg height={0} width={0}>
        <defs>
          <linearGradient
            id="myGradient"
            x1="1"
            x2="0.029"
            y2="0.976"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stopColor="#ff36f0" stopOpacity=".8" />
            <stop offset="1" stopColor="#009bff" stopOpacity=".8" />
          </linearGradient>
          <linearGradient
            id="medianGradient"
            x1="1"
            x2="0.029"
            y2="0.976"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stopColor="#f00" stopOpacity=".3" />
            <stop offset="1" stopColor="#c43a31" stopOpacity=".3" />
          </linearGradient>
        </defs>
      </svg>
      <VictoryChart
        polar
        responsive
        domain={{ y: [-5, 100], x: [0, 5] }}
        startAngle={18}
        endAngle={383}
        padding={{ top: 40, left: 0, right: 0, bottom: 10 }}
      >
        {xAxis.map(({ category, label, textAnchor, dx, dy }, i) => {
          return (
            <VictoryPolarAxis
              dependentAxis
              key={category}
              label={label}
              labelRadius={10}
              labelPlacement="vertical"
              axisAngle={i * 72}
              axisValue={category}
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

        {/* filler pro centro do gráfico */}
        {userGraph.length ? (
          <VictoryArea
            data={[{ y: -5 }, { y: -5 }, { y: -5 }, { y: -5 }, { y: -5 }]}
            style={{
              data: { fill: '#ac5fba' },
            }}
          />
        ) : null}

        {/* GRÁFICO DO USUÁRIO */}
        {userGraph.length ? (
          <VictoryArea
            data={userGraph}
            labelComponent={<CustomLabel />}
            style={{
              data: { fill: 'url(#myGradient)' },
            }}
          />
        ) : null}

        {/* AQUI É O GRÁFICO DA MÉDIA */}
        {userGraph.length ? (
          <VictoryArea
            data={comparisionGraph}
            style={{
              data: {
                fill: 'url(#medianGradient)',
                stroke: '#c43a31',
                strokeWidth: 2,
                strokeLinecap: 'round',
              },
            }}
          />
        ) : null}
      </VictoryChart>
    </>
  );
}

RadarGraph.propTypes = propTypes;
export default RadarGraph;
