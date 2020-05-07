import React from 'react';
import { VictoryBar, VictoryStack, VictoryChart } from 'victory';

function SuccessIndicatorsChart() {
  const data = [
    {
      user: 'John',
      apples: 50,
      oranges: 10,
    },
  ];

  const chartStyle = {
    style: {
      data: { fill: 'rgb(248, 108, 114)' },
      height: 100,
    },
  };
  const chartStyleSecond = {
    style: {
      data: { fill: '#F8F9FB' },
    },
  };
  const victoryChartSettings = {
    padding: { top: 40, bottom: 320 },
  };

  return (
    <div className="box-chart-success">
      <p style={{ fontSize: 20 }}>Sua Taxa de <strong> Resolutividade </strong></p>
      <p>[Denuncias + arquivamentos + acordo/vistas abertas]</p>
      <VictoryChart {...victoryChartSettings}>
        <VictoryStack {...chartStyle} maxDomain={{ x: 1 }} horizontal>
          <VictoryBar {...chartStyle} maxDomain={{ x: 1 }} data={data} x="user" y="oranges" />
          <VictoryBar {...chartStyleSecond} maxDomain={{ x: 1 }} data={data} x="user" y="oranges" />
        </VictoryStack>
      </VictoryChart>
    </div>
  );
}
export default SuccessIndicatorsChart;
