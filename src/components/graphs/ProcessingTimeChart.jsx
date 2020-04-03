import React, { useState, useEffect } from 'react';
import { VictoryPie, VictoryLabel, VictoryTooltip } from 'victory';

const graphicColorMain = ['#A256BA', '#56E8E1', '#A256BA', '#42DCA7']; // Colors
const graphicColor = ['#F8F9FB']; // Colors
const wantedGraphicData = [{ y: 10 }, { y: 50 }, { y: 40 }, { y: 20 }]; // Data that we want to display
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }, { y: 90 }]; // Data used to make the animate prop work

function TempoTramitacaoChart() {
  // TODO: animate VictoryPie
  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  useEffect(() => {
    setGraphicData(wantedGraphicData); // Setting the data that we want to display
  }, []);

  return (
    <>
      <svg width={350} height={300}>
        <circle cx={150} cy={150} r={40} fill="#E1377B" />
        <VictoryPie
          labelComponent={<VictoryLabel dy={30} />}
          standalone={false}
          width={280}
          height={300}
          innerRadius={100}
          endAngle={90}
          startAngle={-120}
          colorScale={graphicColorMain}
          data={graphicData}
        />
        <VictoryPie
          standalone={false}
          width={300}
          height={315}
          innerRadius={65}
          endAngle={110}
          startAngle={-110}
          colorScale={graphicColor}
        />
      </svg>
    </>
  );
}
/* TempoTramitacaoChart.propTypes = propTypes; */
export default TempoTramitacaoChart;
