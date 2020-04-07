import React, { useState, useEffect } from 'react';
import { VictoryPie, VictoryLabel } from 'victory';

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
        <VictoryPie
          labelComponent={<VictoryLabel dy={30} />}
          standalone={false}
          width={280}
          height={300}
          innerRadius={80}
          endAngle={80}
          startAngle={-110}
          padAngle={2}
          colorScale={graphicColorMain}
          data={graphicData}
          padding={5}
          labels={d => `${d.agent} : ${d.reqCount}`}
          style={{
            labels: { fontSize: 15, fontWeight: '400', height: 10 },
            data: {
              fillOpacity: 0.7,
            },
          }}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 30, border: '1px solid #ccc' }}
          x={150}
          y={150}
          text="620"
        />
        <VictoryPie
          standalone={false}
          width={300}
          height={315}
          innerRadius={65}
          endAngle={130}
          startAngle={-130}
          colorScale={graphicColor}
          style={{ fontSize: 30, Opacity: 0.1, border: '1px solid #ccc' }}
        />
      </svg>
    </>
  );
}
/* TempoTramitacaoChart.propTypes = propTypes; */
export default TempoTramitacaoChart;
