import React from 'react';
import { VictoryBar } from 'victory';

function SuccessIndicatorsChart() {
  return (
    <div className="box-chart-success">
      <p style={{fontSize: 20}}>Sua Taxa de <strong>Resolutividade</strong></p>
      <p>[Denuncias + arquivamentos + acordo/vistas abertas]</p>
        <VictoryBar maxDomain={{ x: 1 }} horizontal style={{ data: { fill: '#c43a31' } }} />
    </div>
  );
}
export default SuccessIndicatorsChart;
