import React from 'react';
import './styles.css';
import MarkMind from '../../assets/svg/markMind';
import Markfaster from '../../assets/svg/markFaster';
import MarkSlower from '../../assets/svg/markSlower';

const ChartPointComponent = ({ x, y, datum, origin, ...props }) => {
  const { type } = datum;
  let point;
  console.log('origin', x, y, datum);

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

export default ChartPointComponent;
