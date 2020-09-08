import React from 'react';
import PropTypes from 'prop-types';
import {
  VictoryPortal,
  VictoryChart,
  VictoryPolarAxis,
  VictoryArea,
  VictoryGroup,
  VictoryLabel,
} from 'victory';

import CHART_THEME from '../../themes/chartThemes';

function generateGrid(xAxis) {
  const axisGrid = [];
  for (let i = 0; i < 5; i++) {
    const gridLevel = [];
    xAxis.forEach(catObj =>
      gridLevel.push({
        x: catObj.category,
        y: (i + 1) * 20,
      }),
    );
    axisGrid.push(gridLevel);
  }
  return axisGrid;
}

const buildLabelStyles = (labels, isGood, invert) =>
  labels.map((_, i) => {
    if ((invert && i !== 0) || (!invert && i !== labels.length - 1)) return CHART_THEME.axisLabel;

    if (isGood) return CHART_THEME.axisLabelGood;

    if (isGood != null) return CHART_THEME.axisLabelBad;

    return CHART_THEME.axisLabelNeutral;
  });

const buildLabel = (str, val, invert) => {
  const text = str.toLocaleUpperCase().split('_');

  return invert ? [val, ...text] : [...text, val];
};

const labelPositionsTable = {
  N: {
    order: 1,
    dx: 0,
    dy: 20,
    textAnchor: 'middle',
    internalLabel: {
      normal: {
        dx: 0,
        dy: -15,
      },
      inverted: {
        dx: 0,
        dy: 25,
      },
    },
  },
  W: {
    order: 2,
    dx: 15,
    dy: -15,
    textAnchor: 'end',
    internalLabel: {
      normal: {
        dx: -15,
        dy: -15,
      },
      inverted: {
        dx: 10,
        dy: 10,
      },
    },
  },
  SW: {
    order: 3,
    dx: 10,
    dy: -15,
    textAnchor: 'end',
    invert: true,
    internalLabel: {
      normal: {
        dx: -5,
        dy: 10,
      },
      inverted: {
        dx: -20,
        dy: -20,
      },
    },
  },
  SE: {
    order: 4,
    dx: -10,
    dy: -15,
    textAnchor: 'start',
    invert: true,
    internalLabel: {
      normal: {
        dx: 5,
        dy: 10,
      },
      inverted: {
        dx: 20,
        dy: -20,
      },
    },
  },
  E: {
    order: 5,
    dx: -15,
    dy: -15,
    textAnchor: 'start',
    internalLabel: {
      normal: {
        dx: 15,
        dy: 15,
      },
      inverted: {
        dx: -20,
        dy: 10,
      },
    },
  },
};

const generateAreasData = (data, axisLabelsTable) =>
  data
    .map(({ category, value, isAboveAverage, median, numbers, y }) => {
      const { label, position } = axisLabelsTable[category];
      const { dx, dy, textAnchor, order, invert } = labelPositionsTable[position];

      return [
        order,
        {
          // xAxis
          category,
          label: buildLabel(label, value, invert),
          invert,
          isGood: isAboveAverage,
          dx,
          dy,
          textAnchor,
        },
        {
          // medianData
          x: category,
          y: median,
        },
        {
          // areaData
          x: category,
          y,
          label: numbers,
        },
      ];
    })
    .sort((a, b) => a[0] - b[0])
    .reduce(
      (acc, it) => {
        acc[0].push(it[1]);
        acc[1].push(it[2]);
        acc[2].push(it[3]);

        return acc;
      },
      [[], [], []],
    );

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ x: PropTypes.string, y: PropTypes.number, label: PropTypes.number }),
  ).isRequired,
  axisLabelsTable: PropTypes.shape({}).isRequired,
};

function PerformanceChart({ data, axisLabelsTable }) {
  const [xAxis, medianData, areaData] = generateAreasData(data, axisLabelsTable);
  const grid = generateGrid(xAxis);

  // TODO: animate VictoryChart
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
        domain={{ y: [-5, 100] }}
        responsive
        startAngle={90}
        endAngle={450}
        padding={{ top: 40, left: 0, right: 0, bottom: 10 }}
      >
        {xAxis.map(({ category, label, isGood, dx, dy, textAnchor, invert }) => (
          <VictoryPolarAxis
            dependentAxis
            key={category}
            label={label}
            labelRadius={10}
            labelPlacement="vertical"
            axisValue={category}
            style={CHART_THEME.polarAxis}
            axisLabelComponent={
              <VictoryLabel
                textAnchor={textAnchor}
                dx={dx}
                dy={dy}
                style={buildLabelStyles(label, isGood, invert)}
              />
            }
          />
        ))}

        <VictoryGroup style={CHART_THEME.gridGroup}>
          {grid.map((data1, i) => (
            <VictoryArea key={i} data={data1} />
          ))}
        </VictoryGroup>

        <VictoryArea
          data={[{ y: -5 }, { y: -5 }, { y: -5 }, { y: -5 }, { y: -5 }]}
          style={{
            data: { fill: '#ac5fba' },
          }}
        />

        <VictoryArea
          data={areaData}
          style={{
            data: { fill: 'url(#myGradient)' },
          }}
          labelComponent={<AreaLabel axisLabelsTable={axisLabelsTable} />}
        />
        <VictoryArea
          data={medianData}
          style={{
            data: {
              fill: 'url(#medianGradient)',
              stroke: '#c43a31',
              strokeWidth: 2,
              strokeLinecap: 'round',
            },
          }}
        />
      </VictoryChart>
    </>
  );
}

const AreaLabel = props => {
  const { datum, style, axisLabelsTable } = props;
  const { x, y } = datum;

  const { position } = axisLabelsTable[x];
  const { internalLabel } = labelPositionsTable[position];
  const { dx, dy } = internalLabel[y > 60 ? 'inverted' : 'normal'];

  const labelSize = datum.label.toString().length;

  return (
    <VictoryPortal>
      <g>
        <rect
          fill="rgba(0,155,255, .7)"
          stroke="#ffffff"
          strokeWidth={1}
          x={props.x + dx + (-10 + 5 * labelSize) - 10 * labelSize}
          y={props.y + dy - 12}
          width={10 * labelSize + 20}
          height={25}
        />
        <VictoryLabel
          {...props}
          className="chart-inner-label"
          labelPlacement="vertical"
          verticalAnchor="middle"
          textAnchor="middle"
          dx={dx}
          dy={dy}
          style={{
            ...style,
            fill: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          }}
        />
      </g>
    </VictoryPortal>
  );
};

PerformanceChart.propTypes = propTypes;
export default PerformanceChart;
