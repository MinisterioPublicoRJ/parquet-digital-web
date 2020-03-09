import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { VictoryPie, VictoryContainer } from 'victory';

import { leftPad, getViewWidth } from '../../../utils';
import './styles.css';

const propTypes = {
  type: PropTypes.oneOf(['sumUntil20', 'sumBetween20And30', 'sumBeyond30']).isRequired,
  data: PropTypes.shape({
    sumUntil20: PropTypes.number.isRequired,
    sumBetween20And30: PropTypes.number.isRequired,
    sumBeyond30: PropTypes.number.isRequired,
  }).isRequired,
  selected: PropTypes.oneOf(['ate-20-dias', '20-a-30-dias', '30-ou-mais-dias']),
};

const defaultProps = {
  selected: 'ate-20-dias',
};

const CasesIndicatorItem = ({ type, data, selected }) => {
  const { sumUntil20, sumBetween20And30, sumBeyond30 } = data;

  const cssVars = window.getComputedStyle(window.document.documentElement);

  const colorPrimary = cssVars.getPropertyValue('--primary');
  const colorWarning = cssVars.getPropertyValue('--warning');
  const colorDanger = cssVars.getPropertyValue('--danger');
  const colorGray = cssVars.getPropertyValue('--grayLight');

  const vw = getViewWidth();
  const radius = 3 * vw;
  const innerRadius = radius * 0.75;
  const canvasSize = radius * 2;

  const typeTable = {
    sumUntil20: {
      colorScale: [colorPrimary, colorGray, colorGray],
      color: colorPrimary,
      label: 'Até 20 dias',
      to: 'ate-20-dias',
    },
    sumBetween20And30: {
      colorScale: [colorGray, colorWarning, colorGray],
      color: colorWarning,
      label: '20 a 30 dias',
      to: '20-a-30-dias',
    },
    sumBeyond30: {
      colorScale: [colorGray, colorGray, colorDanger],
      color: colorDanger,
      label: '30+ dias',
      to: '30-ou-mais-dias',
    },
  };

  const { colorScale, color, label, to } = typeTable[type];

  const Wrapper =
    selected === to
      ? ({ children }) => <div className="process-item process-item--selected">{children}</div>
      : ({ children }) => (
          <NavLink className="process-item" to={`/suamesa/vistas-abertas/${to}`}>
            {children}
          </NavLink>
        );

  return (
    <Wrapper>
      <VictoryPie
        data={[
          { x: '', y: sumUntil20 },
          { x: '', y: sumBetween20And30 },
          { x: '', y: sumBeyond30 },
        ]}
        colorScale={colorScale}
        labels={[]}
        innerRadius={innerRadius}
        radius={radius}
        containerComponent={
          <VictoryContainer responsive={false} width={canvasSize} height={canvasSize} />
        }
        origin={{ x: radius, y: radius }}
      />

      <div className="process-item-days">
        <div className="process-count" style={{ color }}>
          {leftPad(data[type], 2, 0)}
        </div>
        <div className="process-days" style={{ color }}>
          {label}
        </div>
      </div>
    </Wrapper>
  );
};

CasesIndicatorItem.propTypes = propTypes;
CasesIndicatorItem.defaultProps = defaultProps;

export default CasesIndicatorItem;
