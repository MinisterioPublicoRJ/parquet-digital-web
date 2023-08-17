import React from 'react';
import PropTypes from 'prop-types';

import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from 'victory';

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
  /* 
    Remove os dados do gráfico onde y = 0 e usa o método reverse para colocar 
    as categorias em modo crescente de dias de vistas abertas.
  */
  const datahWithoutZeros = data.filter(({y}) => y > 0).reverse();


  return (
    <div className={deskCasesChartOuter}>
      <div className={deskCasesChartGraph}>
        <VictoryChart 
          height={datahWithoutZeros.length === 2 ? 50 : 70} 
          padding={{ top: 10, bottom: 10, left: 100, right: 0 }}
        >
          <VictoryAxis
            dependentAxis
            invertAxis
            tickFormat={() => null}
            style={{
              axis: { stroke: 'none' },
            }}
          />

          <VictoryBar
            horizontal
            data={datahWithoutZeros}
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
            labelComponent={<VictoryLabel textAnchor="end" dx={-10} />}
            labels={({ datum }) => `${datum.y} vistas`}
          />
        </VictoryChart>
      </div>
    </div>
  );
}

DeskGraph.propTypes = propTypes;
export default DeskGraph;
