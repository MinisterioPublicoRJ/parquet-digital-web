import React from 'react';
import { VictoryBar, VictoryStack, VictoryChart } from 'victory';
import Api from '../../api';


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
 

  return (
    <div className="box-chart-success">
      <p style={{ fontSize: 15 }}>Sua Taxa de <strong> Resolutividade </strong></p>
      <p  style={{ fontSize: 10 }}>[Denuncias + arquivamentos + acordo/vistas abertas]</p>
        <VictoryStack {...chartStyle} maxDomain={{ x: 1 }} horizontal>
          <VictoryBar {...chartStyle} maxDomain={{ x: 1 }} data={data} x="user" y="oranges" />
        </VictoryStack>
    </div>
  );
}
export default SuccessIndicatorsChart;
