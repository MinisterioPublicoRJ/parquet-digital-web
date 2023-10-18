import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { VictoryChart, VictoryAxis, VictoryLegend, VictoryStack, VictoryBar } from 'victory';

import { deskCasesChart } from './DeskGraphResponsive.module.css';

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.oneOf(['under20', 'between20And30', 'over30']),
      y: PropTypes.number,
      color: PropTypes.string,
    }),
  ).isRequired,
};

const legend = {
  under20: '-20 dias',
  between20And30: '20 a 30 dias',
  over30: '+30 dias',
};

const responsiveSizes = {
  chartHeight: { tablet: 90, mobile: 140 },
  chartPadding: { tablet: 10, mobile: 15 },
  legendFontSize: { tablet: 10, mobile: 20 },
  legendAlign: { tablet: 240, mobile: 80 },
  legendGutter: { tablet: 8, mobile: 20 },
  barWidth: { tablet: 25, mobile: 50 },
};

function DeskGraphResponsive({ data }) {
  const [screenWidth, setScreenWidth] = useState();

  useEffect(() => {
    setScreenWidth(window.screen.width);

    window.addEventListener('resize', () => {
      setScreenWidth(window.screen.width);
    });
  }, []);

  function getResponsiveSize(type) {
    if (screenWidth && screenWidth < 480) {
      if (responsiveSizes[type]) {
        return responsiveSizes[type].mobile;
      }
    }

    if (responsiveSizes[type]) {
      return responsiveSizes[type].tablet;
    }

    return undefined;
  }

  const legendData = data.map((item) => {
    if (legend[item.x]) {
      return {
        name: legend[item.x],
        symbol: { fill: item.color },
        labels: {
          fill: item.color,
          fontSize: getResponsiveSize('legendFontSize'),
          fontWeight: 700,
          fontFamily: 'Roboto, sans-serif',
        },
      };
    }
    return undefined;
  });

  return (
    <div className={deskCasesChart}>
      <VictoryChart
        height={getResponsiveSize('chartHeight')}
        padding={getResponsiveSize('chartPadding')}
      >
        <VictoryAxis style={{ axis: { stroke: 'none' } }} tickFormat={() => null} />

        <VictoryLegend
          x={getResponsiveSize('legendAlign')}
          y={10}
          orientation="horizontal"
          symbolSpacer={10}
          gutter={getResponsiveSize('legendGutter')}
          data={legendData}
          style={{
            data: {
              fill: ({ datum }) => datum.color,
            },
          }}
        />
        <VictoryStack horizontal>
          {data.map(({ x, y, color }) => (
            <VictoryBar
              key={x}
              barWidth={getResponsiveSize('barWidth')}
              data={[{ x: 'open_cases', y, color }]}
              style={{
                data: {
                  fill: ({ datum }) => datum.color,
                },
              }}
            />
          ))}
        </VictoryStack>
      </VictoryChart>
    </div>
  );
}

DeskGraphResponsive.propTypes = propTypes;
export default DeskGraphResponsive;
