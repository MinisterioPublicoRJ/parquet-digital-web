import React from 'react';
import PropTypes from 'prop-types';

import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryStack } from 'victory';

import { deskCasesChartOuter, deskCasesChartGraph } from './DeskGraph.module.css';

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.string,
      y: PropTypes.number,
      color: PropTypes.string,
    }),
  ).isRequired,
};

function DeskGraph({ data }) {
  // Método reverse para deixar os dados do gráfico em ordem crescente de dias.
  const reverseData = data.reverse();

  // Preenche as barras que possuem valor zero (y = 0).
  const maxDaysView = reverseData.reduce((total, days) => days.y > total ? days.y : total, 0);
  const fillerData = reverseData.map((chartData) => (
    chartData.y === 0 ? { x: chartData.x, y: maxDaysView } : { x: chartData.x, y: 0 }
  ));


  return (
    <div className={deskCasesChartOuter}>
      <div className={deskCasesChartGraph}>
        <VictoryChart 
          height={80} 
          padding={{ top: 0, bottom: 4, left: 100, right: 0 }}
        >
          <VictoryAxis
            dependentAxis
            invertAxis
            tickFormat={() => null}
            style={{
              axis: { stroke: 'none' },
            }}
          />
          <VictoryStack horizontal>
            <VictoryBar
              data={reverseData}
              barWidth={18}
              style={{
                data: {
                  fill: ({ datum }) => datum.color,
                },
                labels: {
                  fill: ({ datum }) => datum.color,
                  fontWeight: 700,
                  fontSize: '16px',
                  fontFamily: 'Roboto',
                },
              }}
              labelComponent={<VictoryLabel textAnchor="start" dx={-90} />}
              labels={({ datum }) => datum.y >= 0  ? `${datum.y} vistas` : null}
              
            />
            <VictoryBar
              data={fillerData}
              barWidth={18}
              style={{ data: { fill: '#F4F5FA' } }}
            />
          </VictoryStack>
        </VictoryChart>
      </div>
    </div>
  );
}

DeskGraph.propTypes = propTypes;
export default DeskGraph;
