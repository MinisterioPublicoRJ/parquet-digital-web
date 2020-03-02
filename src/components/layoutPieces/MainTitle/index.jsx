import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const propTypes = {
  value: PropTypes.string.isRequired,
};

const MainTitle = ({ value }) => <h1 className="mainTitleText">{value}</h1>;

MainTitle.propTypes = propTypes;
export default MainTitle;
