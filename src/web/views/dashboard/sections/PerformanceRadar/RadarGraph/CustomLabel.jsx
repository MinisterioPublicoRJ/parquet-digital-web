/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { VictoryPortal, VictoryLabel } from 'victory';

import { GRAPH_LABELS_TABLE } from '../radarConstants';

// ALL PROPS COME FROM VICOTRY ITSELF
const propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  index: PropTypes.string,
  datum: PropTypes.shape({ y: PropTypes.number, label: PropTypes.stirng }),
};

const defaultProps = {
  x: undefined,
  y: undefined,
  index: undefined,
  datum: undefined,
};

function CustomLabel(props) {
  const { datum, x, y, index } = props;
  const yPercentage = datum.y;
  const dataSize = yPercentage > 60 ? 'large' : 'small';
  const [dx, dy] = GRAPH_LABELS_TABLE[index][dataSize];

  const labelSize = datum.label.toString().length;

  return (
    <VictoryPortal>
      <g>
        <rect
          fill="rgba(0,155,255, .7)"
          stroke="#ffffff"
          strokeWidth={1}
          height={25}
          width={10 * labelSize + 20}
          x={x + dx + (-10 + 5 * labelSize) - 10 * labelSize}
          y={y + dy - 12}
        />
        <VictoryLabel
          {...props}
          className="chart-inner-label"
          labelPlacement="vertical"
          verticalAnchor="middle"
          textAnchor="middle"
          dx={dx}
          dy={dy}
          style={{
            fill: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          }}
        />
      </g>
    </VictoryPortal>
  );
}

CustomLabel.propTypes = propTypes;
CustomLabel.defaultProps = defaultProps;
export default CustomLabel;
