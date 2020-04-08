import React, { useState, useEffect } from 'react';
import { VictoryPie, VictoryLabel, VictoryChart, VictoryPolarAxis } from 'victory';

const graphicColorMain = ['#A256BA', '#56E8E1', '#A256BA', '#42DCA7']; // Colors
const graphicColor = ['#56E8E1']; // Colors
const wantedGraphicData = [{ y: 10 }, { y: 50 }, { y: 40 }, { y: 20 }]; // Data that we want to display
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }, { y: 90 }]; // Data used to make the animate prop work

function TempoTramitacaoChart() {
  // TODO: animate VictoryPie
  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  useEffect(() => {
    setGraphicData(wantedGraphicData); // Setting the data that we want to display
  }, []);

  return (
    <div>
      <VictoryChart padding={5} height={300} width={300} startAngle={0} endAngle={180}>
        <VictoryPolarAxis
          colorScale={graphicColorMain}
          tickValues={[0, 45, 90, 135, 180]}
          labelPlacement="vertical"
          width={400}
          height={400}
          padding={5}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 30, border: '1px solid #ccc' }}
          x={140}
          y={140}
          text="620"
        />
        <VictoryPie
          standalone={false}
          width={290}
          height={320}
          innerRadius={45}
          endAngle={130}
          startAngle={-130}
          colorScale={graphicColor}
          style={{ fontSize: 30, Opacity: 0.1, border: '1px solid #ccc' }}
        />
      </VictoryChart>
    </div>
  );
}
/* TempoTramitacaoChart.propTypes = propTypes; */
export default TempoTramitacaoChart;
