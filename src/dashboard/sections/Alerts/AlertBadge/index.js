import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
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
  removeAlert: PropTypes.func,
  count: PropTypes.number,
  isOpen: PropTypes.bool,
  isDeleted: PropTypes.bool,
};

const defaultProps = {
  hideHover: false,
  onDeletion: null,
  count: null,
  isOpen: false,
  isDeleted: false,
};

const AlertBadge = ({
  actions,
  backgroundColor,
  icon,
  message,
  customKey,
  hideHover,
  onDeletion,
  removeAlert,
  setOverlay,
  type,
  count,
  isOpen,
  isDeleted,
}) => {
  // in case we got something from the backend that we don't know how to handle yet
  if (!message) {
    return null;
  }

  function handleDeletion(key, undo) {
    onDeletion(key, undo);
  }

  function handleLinks(alert) {
    const { link } = alert;
    if (link) {
      window.open(link, '_blank', 'noopener');
    } else {
      window.alert('Em breve! :)');
    }
  }

  async function handleActionLinks(alert, key) {
    const { link } = alert;
    const formData = new FormData();
    if (link) {
      try {
        // positive feedback after sending to ouvidoria delete the alert
        removeAlert(key);
        const response = await axios.post(link, formData);
        window.alert(response.data.detail);
      } catch (e) {
        console.log(e);
      }
    } else {
      window.alert('Em breve! :)');
    }
  }

  function handleActionPress(alert, key, type) {
    const { actionType } = alert;
    switch (actionType) {
      case 'delete':
        return handleDeletion(key);
      case 'download':
        return handleLinks(alert);
      case 'overlay':
        return setOverlay(type);
      case 'link':
        return handleLinks(alert);
      case 'actionLink':
        return handleActionLinks(alert, key);
      default:
        return window.alert('Em breve! :)');
    }
  }

  const showHover = !hideHover && actions[0];

  return (
    <div className="alertBadge-outerContainer">
      {showHover && !isDeleted && (
        <div className="alertBadge-hoverContainer">
          {actions.map((alert) => (
            <ActionButtons
              key={`${customKey}-${alert.actionType}`}
              clickCallback={() => handleActionPress(alert, customKey, type)}
              {...alert}
            />
          ))}
        </div>
      )}
      {!hideHover && isDeleted && (
        <div className={`delete-confirmation ${isDeleted ? 'isDeleted' : ''}`}>
          <button type="button" className="delete" onClick={() => handleDeletion(customKey)}>
            x
          </button>
          <button
            type="button"
            className="undo-delete"
            onClick={() => handleDeletion(customKey, true)}
          >
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
