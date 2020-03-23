import React from 'react';
import PropTypes from 'prop-types';

import './styles.css'

function AlertBadge({ icon, message, action, actionLink,iconBg }) {
  return (
    <div className="alertBadgeContainer">
      <div className="badgeLeft" style={{backgroundColor: iconBg }}>{icon}</div>
      <div className="badgeRight">
        {message}
        {action && <a href={actionLink}>{action}</a>}
      </div>
    </div>
  );
}

export default AlertBadge;
