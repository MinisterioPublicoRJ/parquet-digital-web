import React from 'react';
import PropTypes from 'prop-types';

import { VictoryPie } from 'victory';
import { leftPad } from '../../utils';

import './deskCasesStyles.css';

function DeskCasesChart({ data, name, color, category, buttonPressed }) {
  console.log('DeskCasesChart ', data, name, color, category);
  return (
    <button className="cases-chart-outer" type="button" onClick={() => buttonPressed(category)}>
      <div className="cases-chart-graph">
        <VictoryPie
          data={Object.values(data)}
          labels={() => null}
          innerRadius={120}
          origin={{ x: 200, y: 200 }}
          style={{
            data: {
              fill: ({ datum }) => datum.color,
            },
          }}
        />
      </div>
      <div className="cases-chart-subs">
        <div className="process-count" style={{ color }}>
          {leftPad(data[category].y, 2, 0)}
        </div>
        <div className="process-days" style={{ color }}>
          {name}
        </div>
      </div>
    </button>
  );
}

export default DeskCasesChart;
