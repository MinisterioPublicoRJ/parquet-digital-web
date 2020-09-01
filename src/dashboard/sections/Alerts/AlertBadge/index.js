import React from 'react';
import PropTypes from 'prop-types';
import ActionButtons from './AlertActionButtons';

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
  customKey: PropTypes.string.isRequired,
  hideHover: PropTypes.bool,
  onDeletion: PropTypes.func,
  count: PropTypes.number,
};

const defaultProps = { hideHover: false, onDeletion: null, count: null };

const AlertBadge = ({
  actions,
  backgroundColor,
  icon,
  message,
  customKey,
  hideHover,
  onDeletion,
  count,
}) => {
  // in case we got something from the backend that we don't know how to handle yet
  if (!message) {
    return null;
  }

  function handleDeletion(key) {
    console.log(`deleting ${key}`);
    onDeletion(key);
  }

  function handleDownload(alert) {
    window.open(alert.link);
  }

  function handleActionPress(alert, key) {
    const { actionType } = alert;
    switch (actionType) {
      case 'delete':
        return handleDeletion(key);
      case 'download':
        return handleDownload(alert);
      default:
        window.alert('Em breve! :)');
    }
  }

  const showHover = !hideHover && actions[0];

  return (
    <div className="alertBadge-outerContainer">
      {showHover && (
        <div className="alertBadge-hoverContainer">
          {actions.map(alert => (
            <ActionButtons
              key={`${customKey}-${alert.actionType}`}
              clickCallback={() => handleActionPress(alert, customKey)}
              {...alert}
            />
          ))}
        </div>
      )}
      <div className="alertBadge-leftContainer" style={{ backgroundColor }}>
        {icon}
      </div>
      <div className="alertBadge-rightContainer">
        <span>{message}</span>
        {!showHover && (
          <div className="alertBadge-countWrapper" style={{ backgroundColor }}>
            <span className="alertBadge-arrow" />
            {count}
          </div>
        )}
      </div>
    </div>
  );
};

AlertBadge.propTypes = propTypes;
AlertBadge.defaultProps = defaultProps;
export default AlertBadge;
