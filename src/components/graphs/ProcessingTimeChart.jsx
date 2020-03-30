import React from 'react';
import { VictoryPie, VictoryPolarAxis, VictoryLabel } from 'victory';
import CHART_THEME from '../../themes/chartThemes';

function generateGrid(xAxis) {
  const axisGrid = [];
  for (let i = 0; i < 5; i++) {
    const gridLevel = [];
    xAxis.forEach(catObj =>
      gridLevel.push({
        x: catObj.time,
        y: (i + 1) * 20,
      }),
    );
    axisGrid.push(gridLevel);
  }
  return axisGrid;
}
function generateGraph(axisExpansion) {
  return [{ time: 'time', label: `arquivamentos\n${axisExpansion.archives}` }];
}

function TempoTramitacaoChart({ data, axis }) {
  const xAxis = generateGraph(axis);
  const grid = generateGrid(xAxis);

  // TODO: animate VictoryPie
  return (
    <>
      <VictoryPie
        colorScale={['FC2A61 ', '6D86EC', '40B8D9 ', '40B8D9']}
        startAngle={90}
        endAngle={-90}
        height={400}
      />
      {xAxis.map(item => (
        <VictoryPolarAxis
          dependentAxis
          key={item.category}
          label={item.label.toLocaleUpperCase()}
          labelRadius={0}
          labelPlacement="vertical"
          axisValue={item.category}
          style={CHART_THEME.polarAxis}
          axisLabelComponent={<VictoryLabel style={CHART_THEME.axisLabel} />}
        />
      ))}
    </>
  );
}
/* TempoTramitacaoChart.propTypes = propTypes; */
export default TempoTramitacaoChart;
