/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { VictoryLabel } from 'victory';

// manually change labels position to make them fit the design in a way Victory wouldn't let me
// props come from Victory itself
// https://formidable.com/open-source/victory/docs/victory-label/
export default function LabelWrapper(props) {
  let customProps;
  const { datum, text, x, y } = props;

  switch (datum.x) {
    case 0: // max value
      customProps = {
        y: y - 20,
        x: x + 20,
      };
      break;
    case 2: // min value
      customProps = {
        y,
        x: x + 10,
      };
      break;
    default:
  }

  return (
    <>
      <VictoryLabel {...props} {...customProps} />

      {/* max value or min value */}
      {datum.x === 0 || datum.x === 2 ? (
        <VictoryLabel
          {...props}
          x={customProps.x}
          y={customProps.y + 8}
          text={`\ndias`}
          style={{
            fontSize: 6,
            fill: () => datum.color,
          }}
        />
      ) : ''}
    </>
  );
}
