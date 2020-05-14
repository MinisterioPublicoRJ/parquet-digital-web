import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const propTypes = {
  value: PropTypes.string.isRequired,
};

const SectionTitle = ({ value }) => (
  <h2 className="sectionTitle-text">{value.toLocaleUpperCase()}</h2>
);

SectionTitle.propTypes = propTypes;
export default SectionTitle;
