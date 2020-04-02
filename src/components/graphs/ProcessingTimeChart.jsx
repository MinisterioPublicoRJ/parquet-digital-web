import React from 'react';
import { VictoryPie, VictoryLabel, VictoryTooltip } from 'victory';

function TempoTramitacaoChart() {
  // TODO: animate VictoryPie
  return (
    <>
      <svg width={180} height={180}>
        <circle cx={100} cy={100} r={30} fill="#c43a31" />
        <VictoryPie
          standalone={false}
          width={200}
          height={200}
          innerRadius={65}
          endAngle={90}
          startAngle={-90}
          colorScale={['FC2A61 ', '6D86EC', '40B8D9 ', '40B8D9']}
        />
      </svg>
    </>
  );
}
/* TempoTramitacaoChart.propTypes = propTypes; */
export default TempoTramitacaoChart;
