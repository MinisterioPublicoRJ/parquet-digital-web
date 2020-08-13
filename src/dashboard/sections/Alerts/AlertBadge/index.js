import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AlertsLinks } from '../alertsLinks';

import './styles.css';

const propTypes = {
  icon: PropTypes.node.isRequired,
  message: PropTypes.string.isRequired,
  action: PropTypes.bool,
  actionLink: PropTypes.string,
  iconBg: PropTypes.string.isRequired,
};
const defaultProps = {
  action: true,
  actionLink: undefined,
};

const AlertBadge = ({ icon, message, action, actionLink, iconBg, closeAction }) => {
  const [actionHover, setActionHover] = useState(false);

  if (!iconBg) {
    return null;
  }

  return (
    <div
      className="alertBadge-outerContainer"
      onMouseEnter={() => setActionHover(true)}
      onMouseLeave={() => setActionHover(false)}
    >
      <div className="alertBadge-leftContainer" style={{ backgroundColor: iconBg }}>
        {icon}
      </div>
      <div className="alertBadge-rightContainer">{message}</div>
      {actionHover && <AlertsLinks actionLink={actionLink} closeAction={closeAction} />}
    </div>
  );
};

AlertBadge.propTypes = propTypes;
AlertBadge.defaultProps = defaultProps;
export default AlertBadge;
