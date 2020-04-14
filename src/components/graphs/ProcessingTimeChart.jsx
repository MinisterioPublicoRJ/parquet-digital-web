import React, { useState, useEffect } from 'react';
import { VictoryPie, VictoryLabel, VictoryChart, VictoryScatter } from 'victory';

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
      <svg width={380} height={300}>
        <VictoryChart width={300} height={300} standalone={false}>
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
          <VictoryScatter
            style={{ data: { fill: '#FF0086' } }}
            size={9}
            data={[
              { x: 1, y: 20 },
              { x: 2, y: 50 },
              { x: 3, y: 50 },
              { x: 4, y: 50 },
            ]}
          />
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
