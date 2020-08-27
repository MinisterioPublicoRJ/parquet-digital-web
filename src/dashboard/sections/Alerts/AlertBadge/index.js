import React from 'react';
import PropTypes from 'prop-types';
import ActionButtons from './ActionButtons';

import './styles.css';

const propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      actionType: PropTypes.string.isRequired,
      background: PropTypes.string,
      icon: PropTypes.node.isRequired,
      text: PropTypes.node.isRequired,
      link: PropTypes.string,
    }),
  ).isRequired,
  backgroundColor: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  message: PropTypes.node.isRequired,
  key: PropTypes.string.isRequired,
  hideHover: PropTypes.bool,
};

const defaultProps = { hideHover: false };

const AlertBadge = ({ actions, backgroundColor, icon, message, key, hideHover }) => {
  // in case we got something from the backend that we don't know how to handle yet
  if (!message) {
    return null;
  }

  function handleActionPress(alert) {
    console.log('i was pressed!', alert);
  }
  const showHover = !hideHover && actions[0];

  return (
    <div className="alertBadge-outerContainer">
      {showHover && (
        <div className="alertBadge-hoverContainer">
          {actions.map(alert => (
            <ActionButtons
              key={`${key}-${alert.actionType}`}
              clickCallback={() => handleActionPress(alert)}
              {...alert}
            />
          ))}
        </div>
      )}
      <div className="alertBadge-leftContainer" style={{ backgroundColor }}>
        {icon}
      </div>
      <div className="alertBadge-rightContainer">{message}</div>
    </div>
  );
};

AlertBadge.propTypes = propTypes;
AlertBadge.defaultProps = defaultProps;
export default AlertBadge;
