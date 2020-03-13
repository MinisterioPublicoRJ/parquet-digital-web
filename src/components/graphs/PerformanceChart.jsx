import React from 'react';
import { VictoryChart, VictoryPolarAxis, VictoryArea, VictoryGroup, VictoryLabel } from 'victory';

import CHART_THEME from '../../themes/chartThemes';

export default class PerformanceChart {
  constructor() {
    this.xAxis = [
      { category: 'archives', label: 'arquivamentos' },
      { category: 'actions', label: 'ações\ncivil\npúblicas' },
      { category: 'rejections', label: 'indeferimentos\nde plano' },
      { category: 'instaurations', label: 'instauração de\ninvestigações' },
      { category: 'tac', label: 'termos\nde ajuste\nde conduta' },
    ];

    this.grid = this.generateGrid(this.xAxis);
  }

  generateGrid(xAxis) {
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

  render() {

  }
}

export function PerformanceChart2({ data }) {
  const xAxis = [
    { category: 'archives', label: 'arquivamentos' },
    { category: 'actions', label: 'ações\ncivil\npúblicas' },
    { category: 'rejections', label: 'indeferimentos\nde plano' },
    { category: 'instaurations', label: 'instauração de\ninvestigações' },
    { category: 'tac', label: 'termos\nde ajuste\nde conduta' },
  ];

  // TODO: use effect hook to enhance component performance
  // useEffect(
  //   () => {}, [data]
  // )
  // let grid;

  // TODO: improve gird creation
  const grid = [
    [
      { x: 'arquivamentos', y: 100 },
      { x: 'ações civil públicas', y: 100 },
      { x: 'indeferimentos de plano', y: 100 },
      { x: 'instauração de investigações', y: 100 },
      { x: 'termos de ajuste de conduta', y: 100 },
    ],
    [
      { x: 'arquivamentos', y: 200 },
      { x: 'ações civil públicas', y: 200 },
      { x: 'indeferimentos de plano', y: 200 },
      { x: 'instauração de investigações', y: 200 },
      { x: 'termos de ajuste de conduta', y: 200 },
    ],
    [
      { x: 'arquivamentos', y: 300 },
      { x: 'ações civil públicas', y: 300 },
      { x: 'indeferimentos de plano', y: 300 },
      { x: 'instauração de investigações', y: 300 },
      { x: 'termos de ajuste de conduta', y: 300 },
    ],
    [
      { x: 'arquivamentos', y: 400 },
      { x: 'ações civil públicas', y: 400 },
      { x: 'indeferimentos de plano', y: 400 },
      { x: 'instauração de investigações', y: 400 },
      { x: 'termos de ajuste de conduta', y: 400 },
    ],
  ];

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
      <VictoryChart polar domain={{ y: [0, 400] }} height={250} width={250}>
        {xAxis.map(item => (
          <VictoryPolarAxis
            key={item.category}
            dependentAxis
            label={item.label.toLocaleUpperCase()}
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
