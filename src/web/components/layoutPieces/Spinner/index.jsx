import React from 'react';
import PropTypes from 'prop-types';

import { spinner, small, medium, large } from './styles.module.css';

const propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
};

function Spinner({ size }) {
  const spinnerSizes = { small, medium, large };
  return <div className={`${spinner} ${spinnerSizes[size]}`} />;
}

Spinner.propTypes = propTypes;
export default Spinner;
