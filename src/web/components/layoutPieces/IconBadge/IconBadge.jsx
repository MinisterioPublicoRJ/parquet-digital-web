import React from 'react';
import PropTypes from 'prop-types';
import styles from './IconBadge.module.css';

const { iconBadgeMain } = styles;

function IconBadge({ backgroundColor, text, icon }) {
  const outerStyles = {
    backgroundColor,
  };

  return (
    <div className={iconBadgeMain} style={outerStyles}>
      {icon && <div>{icon}</div>}
      {text && <div>{text}</div>}
    </div>
  );
}

IconBadge.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  icon: PropTypes.node,
  text: PropTypes.node,
};

IconBadge.defaultProps = {
  icon: undefined,
  text: undefined,
};

export default IconBadge;