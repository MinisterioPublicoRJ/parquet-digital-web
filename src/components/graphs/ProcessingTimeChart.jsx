import React, { useState, useEffect } from 'react';
import { VictoryPie, VictoryLabel, VictoryChart, VictoryScatter } from 'victory';
import ScatterComponent from '../../pages/ProcessingTime/scatterComponent';

const graphicColorMain = ['#A256BA', '#56E8E1', '#A256BA', '#42DCA7']; // Colors
const graphicColor = ['#F8F9FB']; // Colors
const wantedGraphicData = [{ y: 310 }, { y: 350 }, { y: 740 }, { y: 120 }]; // Data that we want to display

function TempoTramitacaoChart() {
  // TODO: animate VictoryPie
  const [graphicData, setGraphicData] = useState(wantedGraphicData);

  useEffect(() => {
    setGraphicData(wantedGraphicData); // Setting the data that we want to display
  }, []);
  return (
    <>
      <svg width={380} height={300}>
        <VictoryChart domain={{ x: [0, 5], y: [0, 8] }} width={300} height={300} standalone={false}>
          <VictoryPie
            width={480}
            height={450}
            innerRadius={50}
            endAngle={120}
            startAngle={-120}
            colorScale={graphicColor}
            opacity={0.1}
            padding={5}
          />
          <circle cx="150" cy="150" r="40" fill="none" stroke="#B3B3B3" strokeWidth={1} />
          <VictoryLabel textAnchor="middle" x={150} y={150} text="620" />
          <VictoryScatter dataComponent={<ScatterComponent />} />
          <VictoryPie
            width={380}
            height={400}
            innerRadius={110}
            endAngle={80}
            startAngle={-110}
            padAngle={2}
            opacity={0.1}
            colorScale={graphicColorMain}
            padding={5}
            data={graphicData}
            labels={({ datum }) => datum.y}
            style={{
              labels: { fontSize: 15, fontWeight: '400', height: 10 },
            }}
          />
        </VictoryChart>
      </svg>
    </>
  );
}
export default TempoTramitacaoChart;
