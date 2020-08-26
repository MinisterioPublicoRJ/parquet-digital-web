import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AlertsLinks } from '../alertsLinks';

import './styles.css';

const propTypes = {
  icon: PropTypes.node.isRequired,
  message: PropTypes.node.isRequired,
  action: PropTypes.bool,
  actionLink: PropTypes.string,
  iconBg: PropTypes.string.isRequired,
};
const defaultProps = {
  action: true,
  actionLink: undefined,
};

const AlertBadge = ({ icon, message, action, actionLink, iconBg, closeAction, compId }) => {
  // in case we got something from the backend that we don't know how to handle yet
  if (!iconBg) {
    return null;
  }

  // const [actionHover, setActionHover] = useState(false);

  return (
    <div className="alertBadge-outerContainer">
      <div className="alertBadge-hoverContainer">hover</div>
      <div className="alertBadge-leftContainer" style={{ backgroundColor: iconBg }}>
        {icon}
      </div>
      <div className="alertBadge-rightContainer">{message}</div>
      {/* actionHover && (
        <AlertsLinks actionLink={actionLink} closeAction={closeAction} compId={compId} />
      ) */}
    </div>
  );
};

AlertBadge.propTypes = propTypes;
AlertBadge.defaultProps = defaultProps;
export default AlertBadge;
