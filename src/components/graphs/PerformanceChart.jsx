import React from 'react';
import PropTypes from 'prop-types';
import { VictoryChart, VictoryPolarAxis, VictoryArea, VictoryGroup, VictoryLabel } from 'victory';

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

const buildLabelStyles = (labels, isGood) =>
  labels.map((_, i) => {
    if (i !== labels.length - 1) return CHART_THEME.axisLabel;

    if (isGood) return CHART_THEME.axisLabelGood;

    if (isGood != null) return CHART_THEME.axisLabelBad;

    return CHART_THEME.axisLabelNeutral;
  });

const buildLabel = (str, val) => [...str.toLocaleUpperCase().split('_'), val];

const labelPositionsTable = {
  N: {
    order: 1,
    dx: 0,
    dy: 20,
    textAnchor: 'middle',
  },
  W: {
    order: 2,
    dx: 15,
    dy: 0,
    textAnchor: 'end',
  },
  SW: {
    order: 3,
    dx: 10,
    dy: -15,
    textAnchor: 'end',
  },
  SE: {
    order: 4,
    dx: -10,
    dy: -15,
    textAnchor: 'start',
  },
  E: {
    order: 5,
    dx: -15,
    dy: 0,
    textAnchor: 'start',
  },
};

const axisLabelsTable = {
  archives: {
    label: 'Arquivamentos',
    position: 'N',
  },
  actions: {
    label: 'Ações_Civil_Públicas',
    position: 'E',
  },
  rejections: {
    label: 'Indeferimentos_de Plano',
    position: 'SE',
  },
  instaurations: {
    label: 'Instauração de_Investigações',
    position: 'SW',
  },
  tac: {
    label: 'Termos_de Ajuste_de Conduta',
    position: 'W',
  },
};

const generateAreaData = data => data.map(({ chart }) => chart);

const generateAxis = data =>
  data
    .map(({ axis }) => {
      const { category, value, isAboveAverage } = axis;
      const { label, position } = axisLabelsTable[category];
      const { dx, dy, textAnchor, order } = labelPositionsTable[position];

      return {
        category,
        label: buildLabel(label, value),
        isGood: isAboveAverage,
        dx,
        dy,
        textAnchor,
        order,
      };
    })
    .sort((a, b) => a.order - b.order);

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ x: PropTypes.string, y: PropTypes.number, label: PropTypes.number }),
  ).isRequired,
  axis: PropTypes.shape({ category: PropTypes.string }).isRequired,
};

function PerformanceChart({ data }) {
  const areaData = generateAreaData(data);
  const xAxis = generateAxis(data);
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
        </defs>
      </svg>
      <VictoryChart
        polar
        domain={{ y: [0, 100] }}
        responsive
        startAngle={90}
        endAngle={450}
        padding={{ top: 60, left: -10, right: -10, bottom: 50 }}
      >
        {xAxis.map(({ category, label, isGood, dx, dy, textAnchor }) => (
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
                style={buildLabelStyles(label, isGood)}
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
          data={areaData}
          style={{
            data: { fill: 'url(#myGradient)' },
          }}
          labelComponent={<AreaLabel />}
        />
      </VictoryChart>
    </>
  );
}

const AreaLabel = props => {
  const { datum, style } = props;

  delete datum._x;
  delete datum._x0;
  delete datum._x1;
  delete datum._y;
  delete datum._y0;
  delete datum._y1;
  datum.x = 0;
  datum.y = 0;

  return (
    <g>
      <VictoryLabel
        {...props}
        datum={datum}
        className="chart-inner-label"
        labelPlacement="vertical"
        style={{
          ...style,
          fill: '#009bff',
          fontWeight: 'bold',
        }}
      />
    </g>
  );
};

PerformanceChart.propTypes = propTypes;
export default PerformanceChart;
