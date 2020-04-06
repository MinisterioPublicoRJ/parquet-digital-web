import React from 'react';
import PropTypes from 'prop-types';

import { VictoryPie } from 'victory';
import { leftPad } from '../../utils';

function DeskCasesChart({ data, name, color }) {
  console.log('DeskCasesChart ', data, name, color);
  return (
    <>
      <VictoryPie />
      <div className="process-item-days">
        <div className="process-count" style={{ color }}>
          {leftPad(data[name], 2, 0)}
        </div>
        <div className="process-days" style={{ color }}>
          {name}
        </div>
      </div>
    </>
  );
}

export default DeskCasesChart;
