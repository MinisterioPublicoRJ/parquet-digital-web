import React from 'react';
import PropTypes from 'prop-types';

import {
  sectionTitleText,
  sectionTitleGlued,
  sectionTitleWithSubs,
  sectionTitleSubtitle,
} from './styles.module.css';

const propTypes = {
  value: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  glueToTop: PropTypes.bool,
};

const defaultProps = {
  subtitle: null,
  glueToTop: false,
};

function SectionTitle({ value, subtitle, glueToTop }) {
  return (
    <>
      <h2
        className={`${sectionTitleText} ${glueToTop && sectionTitleGlued} ${
          subtitle && sectionTitleWithSubs
        }`}
      >
        {value.toLocaleUpperCase()}
      </h2>
      {subtitle && <span className={sectionTitleSubtitle}>{subtitle}</span>}
    </>
  );
}
SectionTitle.propTypes = propTypes;
SectionTitle.defaultProps = defaultProps;
export default SectionTitle;
