import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
};

function Spinner({ size }) {
  return <div className={`spinner--${size}`} />
}

Spinner.propTypes = propTypes;
export default Spinner;
