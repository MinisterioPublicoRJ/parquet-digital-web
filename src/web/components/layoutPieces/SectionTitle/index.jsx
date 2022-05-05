import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

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
        className={`${styles.sectionTitleText} ${glueToTop && styles.sectionTitleGlued} ${
          subtitle && styles.sectionTitleWithSubs
        }`}
      >
        {value.toLocaleUpperCase()}
      </h2>
      {subtitle && <span className={styles.sectionTitleSubtitle}>{subtitle}</span>}
    </>
  );
}
SectionTitle.propTypes = propTypes;
SectionTitle.defaultProps = defaultProps;
export default SectionTitle;
