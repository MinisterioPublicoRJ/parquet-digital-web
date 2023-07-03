/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { VictoryBar, VictoryLabel, VictoryStack } from 'victory';
import { leftPad } from '../../../../../utils';

import { deskCasesChartOuter, deskCasesChartGraph } from './DeskGraph.module.css';

const propTypes = {
  category: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  data: PropTypes.shape({
    under20: PropTypes.shape({ x: PropTypes.string, y: PropTypes.number, color: PropTypes.string }),
    between20And30: PropTypes.shape({
      x: PropTypes.string,
      y: PropTypes.number,
      color: PropTypes.string,
    }),
    over30: PropTypes.shape({ x: PropTypes.string, y: PropTypes.number, color: PropTypes.string }),
  }).isRequired,
};

const fillerData = [
  { y: 0, color: 'transparent' },
  { y: 0, color: 'transparent' },
  { y: 100, color: 'transparent' },
];

const LABELS = ['Até 20 dias', '20 a 30 dias', '+30 dias'];

function MyLabel(props) {
    const x = props.scale.x(props.x);
    const y = props.scale.y(props.y)

    return <VictoryLabel {...props} x={x} y={y}/>
  }


function DeskGraph({ category, color, data, totalSum }) {
  const [buttonChartData, setButtonChartData] = useState(fillerData);
  const [colors, setColors] = useState(buttonChartData.map((item) => item.color));
  // anti prop, but it's the only way to force VictoryPie to animate
  useEffect(() => {
    if (buttonChartData === fillerData) {
      setButtonChartData(Object.values(data));
    }
  }, [data]);

  useEffect(() => {
    const c = buttonChartData.map((item) => item.color);
    setColors(c);
  }, [buttonChartData]);
  let sum = 0;
  const total = Object.values(buttonChartData).reduce((a, b) => a + b, 0);

  const POSITION_LABEL =['start', 'middle', 'end']


  return (
    <div style={{ borderTopColor: color }} className={deskCasesChartOuter}>
      <div className={deskCasesChartGraph}>
        <VictoryStack
          horizontal
          colorScale={colors}
          height={42}
          padding={0}
          disableInlineStyles
        >
          {/*<VictoryBar horizontal data={buttonChartData} /> */}

          {buttonChartData.map((chartData, i) => {
            sum += chartData.y;
            return (
              <VictoryBar
                horizontal
                data={[{ y: chartData.y }]}
                animate={{ duration: 2000 }}
                barWidth={80}
                //labels={LABELS[i]}
                labelComponent={
                  <VictoryLabel
                    inline
                    labelPlacement="perpendicular"
                    verticalAnchor="start"
                    textAnchor={POSITION_LABEL[i]}
                    y={0}
                    dy={0}
                    //x={(sum - chartData.y) *  (220 / totalSum) }
                    x={`${33 * i}%`}
                    dx={0}
                    padding={0}
                    style={[
                        { fill: chartData.color, fontSize: 12 }
                      ]}
                  />
                }
              />
            );
          })}
          {/*   <VictoryBar horizontal data={[{y: 20}]} />
          <VictoryBar horizontal data={[{y: 50}]} />
          <VictoryBar horizontal data={[{y: 55}]} /> */}
        </VictoryStack>
      </div>
    </div>
  );
}

DeskGraph.propTypes = propTypes;
export default DeskGraph;