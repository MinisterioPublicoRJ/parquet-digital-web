import React from 'react';
import PropTypes from 'prop-types';

import { MarkMind, Markfaster, MarkSlower } from '../../../../../assets/svg';

// This props are supplied by Victory itself
// https://formidable.com/open-source/victory/docs/common-props/#labelcomponent
const proptypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  datum: PropTypes.shape({ type: PropTypes.string }).isRequired,
};

const ChartPoints = ({ x, y, datum }) => {
  const { type } = datum;
  let point;

  switch (type) {
    case 'min':
      point = <Markfaster width="20" height="20" x={x + 5} y={y} />;
      break;
    case 'average':
      point = <MarkMind width="20" height="20" x={x} y={y} />;
      break;
    case 'max':
      point = <MarkSlower width="20" height="20" x={x} y={y} />;
      break;
    default:
      point = null;
      break;
  }

  return point;
};

ChartPoints.proptypes = proptypes;
export default ChartPoints;
