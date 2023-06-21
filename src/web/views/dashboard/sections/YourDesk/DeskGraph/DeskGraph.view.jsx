import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { VictoryBar, VictoryStack } from 'victory';
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
  name: PropTypes.string.isRequired,
};

const fillerData = [
  { y: 0, color: 'transparent' },
  { y: 0, color: 'transparent' },
  { y: 100, color: 'transparent' },
];

function DeskGraph({ category, color, data, name }) {
  const [buttonChartData, setButtonChartData] = useState(fillerData);
  const [colors, setColors] = useState(buttonChartData.map((item) => item.color));
  // anti prop, but it's the only way to force VictoryPie to animate
  useEffect(() => {
    if (buttonChartData === fillerData) {
      setButtonChartData(Object.values(data));
      console.log('data: ', data);
      console.log('values: ', Object.values(data));
    }
  }, [data]);

  useEffect(() => {
    const c = buttonChartData.map((item) => item.color);
    console.log('colors c: ', c);
    setColors(c);
    console.log('buttonchart data in colors: ', buttonChartData);
  }, [buttonChartData]);

  return (
    <div style={{ borderTopColor: color }} className={deskCasesChartOuter}>
      <div className={deskCasesChartGraph}>
        <VictoryStack horizontal colorScale={colors} width={220} height={100} padding={0}>
          {/*             <VictoryBar horizontal data={buttonChartData} /> */}

          {buttonChartData.map((chartData, i) => {
            console.log('chartData, i: ', chartData, i);
            return (
              <VictoryBar
                horizontal
                data={[{ y: chartData.y }]}
                animate={{ duration: 2000 }}
                barRatio={1}
                barWidth={50}
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
