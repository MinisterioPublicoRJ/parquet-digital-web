import React from 'react';
import PropTypes from 'prop-types';

import { PinVermelho, PinAmarelo } from '../../../../../assets/svg';

// This props are supplied by Victory itself
// https://formidable.com/open-source/victory/docs/common-props/#labelcomponent
const proptypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  datum: PropTypes.shape({ type: PropTypes.string }).isRequired,
};

function ChartPins({ x, y, datum }) {
  const { type } = datum;
  let point;

  switch (type) {
    case 'min':
      point = <PinAmarelo width="25" height="25" x={x} y={y} />;
      break;
    case 'max':
      point = <PinVermelho width="25" height="25" x={x} y={y} />;
      break;
    default:
      point = null;
      break;
  }

  return point;
}

ChartPins.proptypes = proptypes;
export default ChartPins;
