import React from 'react';
import { VictoryChart, VictoryPolarAxis, VictoryArea, VictoryGroup, VictoryLabel } from 'victory';

import CHART_THEME from '../../themes/chartThemes';

// export default class PerformanceChart {
//   constructor() {
//     this.xAxis = [
//       { category: 'archives', label: 'arquivamentos' },
//       { category: 'actions', label: 'ações\ncivil\npúblicas' },
//       { category: 'rejections', label: 'indeferimentos\nde plano' },
//       { category: 'instaurations', label: 'instauração de\ninvestigações' },
//       { category: 'tac', label: 'termos\nde ajuste\nde conduta' },
//     ];
//
//     this.grid = this.generateGrid(this.xAxis);
//   }
//
//   generateGrid(xAxis) {
//     const axisGrid = [];
//     for (let i = 0; i < 5; i++) {
//       const gridLevel = [];
//       xAxis.forEach(catObj =>
//         gridLevel.push({
//           x: catObj.category,
//           y: (i + 1) * 20,
//         }),
//       );
//       axisGrid.push(gridLevel);
//     }
//     return axisGrid;
//   }
//
//   render() {
//
//   }
// }

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

function generateAxis(axisExpansion) {
  return [
    { category: 'archives', label: `arquivamentos\n${axisExpansion.archives}` },
    { category: 'actions', label: `ações\ncivil\npúblicas\n${axisExpansion.actions}` },
    { category: 'rejections', label: `indeferimentos\nde plano\n${axisExpansion.rejections}` },
    {
      category: 'instaurations',
      label: `instauração de\ninvestigações\n${axisExpansion.instaurations}`,
    },
    { category: 'tac', label: `termos\nde ajuste\nde conduta\n${axisExpansion.tac}` },
  ];
}

export default function PerformanceChart2({ data, axis }) {
  console.log('chartData', data, axis);
  const xAxis = generateAxis(axis);
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
            <stop offset="0" stopColor="#ff36f0" />
            <stop offset="1" stopColor="#009bff" />
          </linearGradient>
        </defs>
      </svg>
      <VictoryChart
        polar
        domain={{ y: [0, 100] }}
        responsive
        startAngle={90}
        endAngle={450}
        padding={25}
      >
        {xAxis.map(item => (
          <VictoryPolarAxis
            dependentAxis
            key={item.category}
            label={item.label.toLocaleUpperCase()}
            labelRadius={0}
            labelPlacement="vertical"
            axisValue={item.category}
            style={CHART_THEME.polarAxis}
            axisLabelComponent={<VictoryLabel style={CHART_THEME.axisLabel} />}
          />
        ))}
        <VictoryGroup style={CHART_THEME.gridGroup}>
          {grid.map((data1, i) => {
            return <VictoryArea key={i} data={data1} />;
          })}
        </VictoryGroup>
        <VictoryArea
          data={data}
          style={{
            data: { fill: 'url(#myGradient)' },
          }}
        />
      </VictoryChart>
    </>
  );
}
