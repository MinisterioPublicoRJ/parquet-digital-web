import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const propTypes = {
  value: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  glueToTop: PropTypes.string,
};

const defaultProps = {
  subtitle: null,
  glueToTop: false,
};

const SectionTitle = ({ value, subtitle, glueToTop }) => (
  <h2 className={`sectionTitle-text ${glueToTop ? 'sectionTitle--glued' : ''}`}>
    {value.toLocaleUpperCase()}
    {subtitle && <span className="sectionTitle-subtitle">{subtitle}</span>}
  </h2>
);

SectionTitle.propTypes = propTypes;
SectionTitle.defaultProps = defaultProps;

export default SectionTitle;
