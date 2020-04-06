import React from 'react';
import PropTypes from 'prop-types';

import { VictoryPie } from 'victory';
import { leftPad } from '../../utils';

import './deskCasesStyles.css';

const propTypes = {
  active: PropTypes.bool.isRequired,
  buttonPressed: PropTypes.func.isRequired,
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

function DeskCasesChart({ active, buttonPressed, category, color, data, name }) {
  const activeclass = active ? 'cases-button-active' : 'cases-button-inactive';
  return (
    <button
      style={{ borderColor: color }}
      className={`cases-chart-outer ${activeclass}`}
      type="button"
      onClick={() => buttonPressed(category)}
    >
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

DeskCasesChart.propTypes = propTypes;
export default DeskCasesChart;
