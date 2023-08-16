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

const CATEGORIES = ['over30', 'between20And30', 'under20'];

function DeskGraph({ data }) {
  return (
    <div className={deskCasesChartOuter}>
      <div className={deskCasesChartGraph}>
        <VictoryChart height={90} padding={{ top: 8, bottom: 35, left: 100, right: 0 }}>
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
            data={data}
            barWidth={15}
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
            categories={{ x: CATEGORIES }}
          />
        </VictoryChart>
      </div>
    </div>
  );
}

DeskGraph.propTypes = propTypes;
export default DeskGraph;
