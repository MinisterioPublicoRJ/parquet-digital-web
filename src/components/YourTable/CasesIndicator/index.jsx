import React from 'react';
import PropTypes from 'prop-types';

import CasesIndicatorItem from './CasesIndicatorItem';
import './styles.css';

const propTypes = {
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

const CasesIndicator = ({ data, selected }) => {
  return (
    <div className="container">
      <CasesIndicatorItem type="sumUntil20" data={data} selected={selected} />
      <CasesIndicatorItem type="sumBetween20And30" data={data} selected={selected} />
      <CasesIndicatorItem type="sumBeyond30" data={data} selected={selected} />
    </div>
  );
};

CasesIndicator.propTypes = propTypes;
CasesIndicator.defaultProps = defaultProps;

export default CasesIndicator;
