import React from 'react';
import { VictoryPie, VictoryPolarAxis } from 'victory';

function generateGraph(axisExpansion) {
  return [{ time: 'time', label: `arquivamentos\n${axisExpansion.archives}` }];
}

function TempoTramitacaoChart({ data, axis }) {
  const xAxis = generateGraph(axis);
  
  // TODO: animate VictoryPie
  return (
    <>
      <VictoryPie
        colorScale={['FC2A61 ', '6D86EC', '40B8D9 ', '40B8D9']}
        innerRadius={140}
        endAngle={90}
        startAngle={-90}
        height={400}
        styles={{ labels: { fontSize: 20 } }}
      />
    </>
  );
}
/* TempoTramitacaoChart.propTypes = propTypes; */
export default TempoTramitacaoChart;
