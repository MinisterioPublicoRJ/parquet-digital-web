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

const MainTitleIntroduction = ({ value, glueToTop }) => (
  <h1 className={glueToTop ? 'mainTitleIntroduction--glued' : ''}>{value}</h1>
);

MainTitleIntroduction.propTypes = propTypes;
MainTitleIntroduction.defaultProps = defaultProps;
export default MainTitleIntroduction;
