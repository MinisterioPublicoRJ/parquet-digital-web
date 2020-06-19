import React from 'react';
import { VictoryBar, VictoryStack } from 'victory';


function SuccessIndicatorsChart() {
  const data = [
    {
      user: '',
    },
  ];

  const chartStyle = {
    style: {
      data: { fill: 'rgb(248, 108, 114)' },
      height: 100,
    },
  };
 

  return (
    <div className="box-chart-success">
        <VictoryStack {...chartStyle} maxDomain={{ x: 1 }} horizontal>
          <VictoryBar {...chartStyle} maxDomain={{ x: 1 }} data={data} x="user"  />
        </VictoryStack>
    </div>
  );
}
export default SuccessIndicatorsChart;
