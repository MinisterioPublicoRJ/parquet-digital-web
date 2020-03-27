import React from 'react';
import PropTypes from 'prop-types';
import { VictoryPie } from 'victory';
import CHART_THEME from '../../themes/chartThemes';

function TempoTramitacaoChart() {
  // TODO: animate VictoryChart
  return (
    <>
      <VictoryPie
        colorScale={['FC2A61 ', '6D86EC', '40B8D9 ', '40B8D9']}
        data={[
          { x: 'A', y: 33 },
          { x: 'B', y: 33 },
          { x: 'C', y: 33 },
        ]}
        startAngle={90}
        endAngle={-90}
        height={400}
      />
    </>
  );
}
/* TempoTramitacaoChart.propTypes = propTypes; */
export default TempoTramitacaoChart;
