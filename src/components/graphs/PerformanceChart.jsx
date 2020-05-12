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

const buildLabelStyles = (labels, isGood, invert) =>
  labels.map((_, i) => {
    if ((invert && i !== 0) || (!invert && i !== labels.length - 1)) return CHART_THEME.axisLabel;

    if (isGood) return CHART_THEME.axisLabelGood;

    if (isGood != null) return CHART_THEME.axisLabelBad;

    return CHART_THEME.axisLabelNeutral;
  });

const buildLabel = (str, val, invert) =>
  invert
    ? [val, ...str.toLocaleUpperCase().split('_')]
    : [...str.toLocaleUpperCase().split('_'), val];

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
    dy: -15,
    textAnchor: 'end',
  },
  SW: {
    order: 3,
    dx: 10,
    dy: -15,
    textAnchor: 'end',
    invert: true,
  },
  SE: {
    order: 4,
    dx: -10,
    dy: -15,
    textAnchor: 'start',
    invert: true,
  },
  E: {
    order: 5,
    dx: -15,
    dy: -15,
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

const generateAreasData = data =>
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

// const generateMedData = data => {
//   return data
//     .map(({ med }) => {
//       const { position } = axisLabelsTable[med.x];
//       const { order } = labelPositionsTable[position];

//       return { ...med, order };
//     })
//     .sort((a, b) => a.order - b.order)
//     .map(({ y, x }) => ({ y, x }));
// };

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ x: PropTypes.string, y: PropTypes.number, label: PropTypes.number }),
  ).isRequired,
  axis: PropTypes.shape({ category: PropTypes.string }).isRequired,
};

function PerformanceChart({ data }) {
  console.log('>>>>>>>>>>>>>>>>>', data);
  const [xAxis, medianData, areaData] = generateAreasData(data);
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
        domain={{ y: [-5, 100] }}
        responsive
        startAngle={90}
        endAngle={450}
        padding={{ top: 40, left: -40, right: -40, bottom: 10 }}
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
          data={areaData}
          style={{
            data: { fill: 'url(#myGradient)' },
          }}
          labelComponent={<AreaLabel />}
        />

        <VictoryArea
          data={medianData}
          style={{
            data: {
              fill: 'transparent',
              stroke: '#c43a31',
              strokeWidth: 2,
              strokeLinecap: 'round',
            },
          }}
          labelComponent={<AreaLabel />}
        />

        <VictoryArea
          data={[{ y: -5 }, { y: -5 }, { y: -5 }, { y: -5 }, { y: -5 }]}
          style={{
            data: { fill: 'rgb(92, 111, 217, .6)' },
          }}
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
