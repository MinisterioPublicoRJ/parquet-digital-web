import React from 'react';
import PropTypes from 'prop-types';

import './styles.css'

function AlertBadge({ type, message, action, actionLink }) {
  return (
    <div className="alertBadgeContainer">
      <div className="badgeLeft">icon</div>
      <div className="badgeRight">
        {message}
        {action && <a href={actionLink}>{action}</a>}
      </div>
    </div>
  );
}

export default AlertBadge;
