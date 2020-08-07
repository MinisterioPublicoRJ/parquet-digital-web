import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const propTypes = {
  icon: PropTypes.node.isRequired,
  message: PropTypes.string.isRequired,
  action: PropTypes.bool,
  actionLink: PropTypes.string,
  iconBg: PropTypes.string.isRequired,
};
const defaultProps = {
  action: false,
  actionLink: undefined,
};

function AlertBadge({ icon, message, action, actionLink, iconBg }) {
  if (!iconBg) {
    return null;
  }
  
  return (
    <div className="alertBadge-outerContainer">
      <div className="alertBadge-leftContainer" style={{ backgroundColor: iconBg }}>
        {icon}
      </div>
      <div className="alertBadge-rightContainer">
        {message}
        {action && <a href={actionLink}>{action}</a>}
      </div>
    </div>
  );
}

AlertBadge.propTypes = propTypes;
AlertBadge.defaultProps = defaultProps;
export default AlertBadge;
