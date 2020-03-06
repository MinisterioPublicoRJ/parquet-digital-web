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
};

const CasesIndicator = ({ data }) => {
  return (
    <div className="container">
      <CasesIndicatorItem type="sumUntil20" data={data} />
      <CasesIndicatorItem type="sumBetween20And30" data={data} />
      <CasesIndicatorItem type="sumBeyond30" data={data} />
    </div>
  );
};

CasesIndicator.propTypes = propTypes;

export default CasesIndicator;
