import React from 'react';
import PropTypes from 'prop-types';
import { VictoryBar, VictoryStack } from 'victory';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ x: PropTypes.number, y: PropTypes.number })).isRequired,
  color: PropTypes.string.isRequired,
};

function SuccessIndicatorsChart({ data, color }) {
  const barConfig = {
    alignment: 'start',
    barWidth: 10,
    data,
    style: { data: { fill: color } },
  };

  const grayBarConfig = {
    alignment: 'start',
    barWidth: 10,
    data: [{ x: 1, y: 1 }],
    style: { data: { fill: '#F4F5FA' } },
  };

  const chartConfig = {
    domain: { x: [1, 1.1], y: [0, 1] },
    domainPadding: 0,
    height: 10,
    horizontal: true,
    padding: 0,
  };

  return (
    <>
      <VictoryStack {...chartConfig} animate={{ onLoad: { duration: 1000 } }}>
        <VictoryBar {...barConfig} />
        <VictoryBar {...grayBarConfig} />
      </VictoryStack>
    </>
  );
}
SuccessIndicatorsChart.propTypes = propTypes;
export default SuccessIndicatorsChart;
