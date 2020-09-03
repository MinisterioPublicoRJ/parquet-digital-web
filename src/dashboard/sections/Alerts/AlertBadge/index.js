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
  type: PropTypes.string,
  onDeletion: PropTypes.func,
  count: PropTypes.number,
  isOpen: PropTypes.bool,
  isDeleting: PropTypes.bool,
};

const defaultProps = { hideHover: false, onDeletion: null, count: null, isOpen: false };

const AlertBadge = ({
  actions,
  backgroundColor,
  icon,
  message,
  customKey,
  hideHover,
  onDeletion,
  setOverlay,
  type,
  count,
  isOpen,
  isDeleting,
}) => {
  // in case we got something from the backend that we don't know how to handle yet
  if (!message) {
    return null;
  }

  function handleDeletion(key, isDeleting) {
    onDeletion(key, isDeleting);
  }

  function handleDownload(alert) {
    window.open(alert.link);
  }

  function handleActionPress(alert, key, type) {
    const { actionType } = alert;
    switch (actionType) {
      case 'delete':
        return handleDeletion(key);
      case 'download':
        return handleDownload(alert);
      case 'openOverlay':
        return setOverlay(type);
      default:
        window.alert('Em breve! :)');
    }
  }

  const showHover = !hideHover && actions[0];

  return (
    <div className="alertBadge-outerContainer">
      {showHover && !isDeleting && (
        <div className="alertBadge-hoverContainer">
          {actions.map(alert => (
            <ActionButtons
              key={`${customKey}-${alert.actionType}`}
              clickCallback={() => handleActionPress(alert, customKey, type)}
              {...alert}
            />
          ))}
        </div>
      )}
      {typeof isDeleting !== 'undefined' && (
        <div className={`delete-confirmation ${isDeleting ? 'isDeleting' : ''}`}>
          <button className="delete" onClick={() => handleDeletion(customKey, true)}>
            x
          </button>
          <button className="undo-delete" onClick={() => handleDeletion(customKey, false)}>
            Desfazer
          </button>
        </div>
      )}
      <div className="alertBadge-leftContainer" style={{ backgroundColor }}>
        {icon}
      </div>
      <div className="alertBadge-rightContainer">
        <span>{message}</span>
        {!showHover && (
          <div className="alertBadge-countWrapper" style={{ backgroundColor }}>
            <span className={`alertBadge-arrow ${isOpen && 'alertBadge-arrow--open'}`} />
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
