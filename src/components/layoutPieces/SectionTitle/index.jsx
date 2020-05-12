import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const propTypes = {
  value: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

const defaultProps = {
  subtitle: null,
};

const renderSubtitle = subtitle =>
  subtitle ? (
    <>
      <br />
      <span className="sectionTitle-subtitle">{subtitle}</span>
    </>
  ) : null;

const SectionTitle = ({ value, subtitle }) => (
  <h2 className="sectionTitle-text">
    {value.toLocaleUpperCase()}
    {renderSubtitle(subtitle)}
  </h2>
);

SectionTitle.propTypes = propTypes;
SectionTitle.defaultProps = defaultProps;

export default SectionTitle;
