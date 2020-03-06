import React, { useState, useEffect } from 'react';
import { VictoryChart, VictoryPolarAxis, VictoryArea, VictoryGroup } from 'victory';

import CHART_THEME from '../../themes/chartThemes';

export default function PerformanceChart(props) {
  const { data } = props;
  const xAxis = [
    'arquivamentos',
    'ações civil públicas',
    'indeferimentos de plano',
    'instauração de investigações',
    'termos de ajuste de conduuta',
  ];
  // useEffect(
  //   () => {}, [data]
  // )
  // let grid;

  const sqrAxis = [
    [
      { x: 'arquivamentos', y: 100 },
      { x: 'ações civil públicas', y: 100 },
      { x: 'indeferimentos de plano', y: 100 },
      { x: 'instauração de investigações', y: 100 },
      { x: 'termos de ajuste de conduuta', y: 100 },
    ],
    [
      { x: 'arquivamentos', y: 200 },
      { x: 'ações civil públicas', y: 200 },
      { x: 'indeferimentos de plano', y: 200 },
      { x: 'instauração de investigações', y: 200 },
      { x: 'termos de ajuste de conduuta', y: 200 },
    ],
    [
      { x: 'arquivamentos', y: 300 },
      { x: 'ações civil públicas', y: 300 },
      { x: 'indeferimentos de plano', y: 300 },
      { x: 'instauração de investigações', y: 300 },
      { x: 'termos de ajuste de conduuta', y: 300 },
    ],
    [
      { x: 'arquivamentos', y: 400 },
      { x: 'ações civil públicas', y: 400 },
      { x: 'indeferimentos de plano', y: 400 },
      { x: 'instauração de investigações', y: 400 },
      { x: 'termos de ajuste de conduuta', y: 400 },
    ],
  ];

  // TODO: animate VictoryChart
  return (
    <VictoryChart polar domain={{ y: [0, 400] }}>
      {xAxis.map(name => (
        <VictoryPolarAxis
          key={name}
          dependentAxis
          label={name}
          labelPlacement="perpendicular"
          axisValue={name}
          style={CHART_THEME.polarAxis}
        />
      ))}
      <VictoryGroup style={CHART_THEME.gridGroup}>
        {sqrAxis.map((data1, i) => {
          return <VictoryArea key={i} data={data1} />;
        })}
      </VictoryGroup>
      <VictoryGroup
        colorScale={['gold', 'orange', 'tomato']}
        style={{ data: { fillOpacity: 0.5, strokeWidth: 0 } }}
      >
        {data.map((data1, i) => {
          return <VictoryArea key={i} data={data1} />;
        })}
      </VictoryGroup>
    </VictoryChart>
  );
}
