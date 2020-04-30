import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import MarkMind from '../../assets/svg/markMind';
import Markfaster from '../../assets/svg/markFaster';
import MarkSlower from '../../assets/svg/markSlower';

// This props are supplied by Victory itself
// https://formidable.com/open-source/victory/docs/common-props/#labelcomponent
const proptypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  datum: PropTypes.shape({ type: PropTypes.string }).isRequired,
};

const ChartPointComponent = ({ x, y, datum }) => {
  const { type } = datum;
  let point;

  switch (type) {
    case 'min':
      point = <Markfaster x={x} y={y} />;
      break;
    case 'average':
      point = <MarkMind x={x} y={y} />;
      break;
    case 'max':
      point = <MarkSlower x={x} y={y} />;
      break;
    default:
      point = null;
      break;
  }
  return point;
};

ChartPointComponent.proptypes = proptypes;
export default ChartPointComponent;
