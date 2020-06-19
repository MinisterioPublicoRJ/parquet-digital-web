import React from 'react';
import { VictoryBar, VictoryStack } from 'victory';


function SuccessIndicatorsChart() {

 

  return (
    <div className="box-chart-success">
        <VictoryStack {...chartStyle} maxDomain={{ x: 1 }} horizontal>
          <VictoryBar {...chartStyle} maxDomain={{ x: 1 }} data={data} x="user"  />
        </VictoryStack>
    </div>
  );
}
export default SuccessIndicatorsChart;
