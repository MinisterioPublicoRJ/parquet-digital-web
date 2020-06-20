import React from 'react';
import { VictoryBar, VictoryStack } from 'victory';

function SuccessIndicatorsChart() {
  const data = [{ x: 1, y: 0.08196721311475409 }];

  const barConfig = {
    alignment: 'center',
    barWidth: 10,
    data,
    style: { data: { fill: 'red' } },
  };

  const grayBarConfig = {
    alignment: 'center',
    barWidth: 10,
    data: [{ x: 1, y: 1 }],
    style: { data: { fill: '#F4F5FA' } },
  };

  const chartConfig = {
    domain: { x: [1, 1], y: [0, 1] },
    domainPadding: 0,
    height: 10,
    horizontal: true,
    padding: 0,
  };

  return (
    <div>
      <VictoryStack {...chartConfig}>
        <VictoryBar {...barConfig} />
        <VictoryBar {...grayBarConfig} />
      </VictoryStack>
    </div>
  );
}
export default SuccessIndicatorsChart;
