import React from 'react';
import PropTypes from 'prop-types';

import MarkMind from '../../../../../assets/svg/markMind';
import Markfaster from '../../../../../assets/svg/markFaster';
import MarkSlower from '../../../../../assets/svg/markSlower';
// import ProcessingTimeArrow from '../../../assets/svg/processingTimeArrow';

// This props are supplied by Victory itself
// https://formidable.com/open-source/victory/docs/common-props/#labelcomponent
const proptypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  datum: PropTypes.shape({ type: PropTypes.string }).isRequired,
};

const ChartPoints = ({ x, y, datum, ...props }) => {
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

ChartPoints.proptypes = proptypes;
export default ChartPoints;
