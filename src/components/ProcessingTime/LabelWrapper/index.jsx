import React from 'react';
import { VictoryPie, VictoryLabel, VictoryChart, VictoryAxis } from 'victory';

import './styles.css';

// workaround to use dynamic angles when placing the labels outside the pie
// props come from Victory itself
// https://formidable.com/open-source/victory/docs/victory-label/
export default function LabelWrapper(props) {
  let customProps;
  const { datum, text, x, y, heigth, slice } = props;
  console.log('props', props);

  switch (datum.x) {
    case 0: // max value
      customProps = {
        text: `${text}\ndias`,
        y: y - 20,
        x: x + 40,
        verticalAnchor: 'start',
      };
      break;
    case 2: // min value
      customProps = {
        text: `${text}\ndias`,
        y: y + 20,
        x: x - 43,
        verticalAnchor: 'start',
      };
      // customProps.text = `${text}\ndias`;
      // customProps.y = y + 25;
      // customProps.x = x - 45;
      // customProps.verticalAnchor = 'start';
      break;
    default:
  }

  return <VictoryLabel {...props} {...customProps} />;
}
