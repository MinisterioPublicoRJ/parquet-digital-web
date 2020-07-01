import React from 'react';
import { VictoryPie, VictoryLabel, VictoryChart, VictoryAxis } from 'victory';

import './styles.css';

// manually change labels position to make them fit the design in a way Victory wouldn't let me
// props come from Victory itself
// https://formidable.com/open-source/victory/docs/victory-label/
export default function LabelWrapper(props) {
  let customProps;
  const { datum, text, x, y, heigth, slice } = props;

  switch (datum.x) {
    case 0: // max value
      customProps = {
        text: `${text}\ndias`,
        y: y - 20,
        x: x + 27,
        verticalAnchor: 'start',
        textAnchor: 'start',
      };
      break;
    case 2: // min value
      customProps = {
        text: `${text}\ndias`,
        y: y + 25,
        x: x - 13,
        verticalAnchor: 'start',
        textAnchor: 'end',
      };
      break;
    default:
  }

  return <VictoryLabel {...props} {...customProps} />;
}
