import React from 'react';
import PropTypes from 'prop-types';
// import { AlertsLinks } from '../alertsLinks';
// import ActionButtons from './ActionButtons';

import './styles.css';

const propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  backgroundColor: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  message: PropTypes.node.isRequired,
};

const AlertBadge = ({ actions, backgroundColor, icon, message }) => {
  // in case we got something from the backend that we don't know how to handle yet
  if (!message) {
    return null;
  }

  return (
    <div className="alertBadge-outerContainer">
      <div className="alertBadge-hoverContainer">hover</div>
      <div className="alertBadge-leftContainer" style={{ backgroundColor }}>
        {icon}
      </div>
      <div className="alertBadge-rightContainer">{message}</div>
    </div>
  );
};

AlertBadge.propTypes = propTypes;
export default AlertBadge;
