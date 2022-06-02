import React from 'react';
import PropTypes from 'prop-types';

import { mainTitle, mainTitleGlued } from './styles.module.css';

const propTypes = {
  value: PropTypes.string.isRequired,
  glueToTop: PropTypes.bool,
};

const defaultProps = {
  glueToTop: false,
};
function MainTitle({ value, glueToTop }) {
  return <h1 className={`${mainTitle} ${glueToTop ? mainTitleGlued : ''}`}>{value}</h1>;
}

MainTitle.propTypes = propTypes;
MainTitle.defaultProps = defaultProps;
export default MainTitle;
