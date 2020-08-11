import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const propTypes = {
  value: PropTypes.string.isRequired,
  glueToTop: PropTypes.bool,
};

const defaultProps = {
  glueToTop: false,
};

const MainTitle = ({ value, glueToTop }) => (
  <h1 className={glueToTop ? 'mainTitle--glued' : ''}>{value}</h1>
);

MainTitle.propTypes = propTypes;
MainTitle.defaultProps = defaultProps;
export default MainTitle;
