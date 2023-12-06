/* eslint-disable no-alert */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ActionButtons from './AlertActionButtons';

import {
  alertBadgeOuterContainer,
  openDropdownBtn,
  alertBadgeHoverContainer,
  deleteConfirmation,
  alertBadgeLeftContainer,
  alertBadgeRightContainer,
  alertBadgeSmallButtons,
  alertBadgeArrow,
  alertBadgeArrowOpen,
  alertBadgeCountWrapper,
  alertBadgeDownloadNumbers,
  openMobileDropdownBtn,
  isDeletedStyle,
  doDelete,
  undoDelete,
  showContainerInMobile,
  hoverMobile,
  openArrow,
  closeArrow
} from './styles.module.css';

const propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      actionType: PropTypes.string.isRequired,
      background: PropTypes.string,
      icon: PropTypes.node,
      text: PropTypes.node.isRequired,
      link: PropTypes.string,
    }),
  ),
  backgroundColor: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  message: PropTypes.node.isRequired,
  customKey: PropTypes.string.isRequired,
  hideHover: PropTypes.bool,
  type: PropTypes.string.isRequired,
  onDeletion: PropTypes.func,
  openDialogBox: PropTypes.func,
  count: PropTypes.number,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  isDeleted: PropTypes.bool,
  docDk: PropTypes.number,
};

const defaultProps = {
  docDk: null,
  hideHover: false,
  onDeletion: () => null,
  count: null,
  isOpen: false,
  setIsOpen: () => null,
  isDeleted: false,
  openDialogBox: () => null,
  actions: [],
};

function AlertBadge(alert) {
  const {
    actions,
    backgroundColor,
    icon,
    message,
    customKey,
    hideHover,
    handleDeletion,
    openDialogBox,
    setOverlay,
    count,
    isOpen,
    setIsOpen,
    isDeleted,
    docDk,
    type,
    docNum
  } = alert;

  const [showHoverMobile, setShowHoverMobile] = useState(false);

  // in case we got something from the backend that we don't know how to handle yet
  if (!message) {
    return null;
  }

  function handleLinks(alertAction) {
    const { link } = alertAction;
    if (link) {
      window.open(link, '_blank', 'noopener');
    } else {
      window.alert('Em breve! :)');
    }
  }

  async function handleActionLinks(alertAction, key) {
    const { link, actionType } = alertAction;
    if (link) {
      if (actionType === 'openComplaint') {
        openDialogBox(link, key, type);
      }
    } else {
      window.alert('Em breve! :)');
    }
  }

  function handleActionPress(alertAction, key) {
    const { actionType } = alertAction;
    switch (actionType) {
      case 'delete':
        setOverlay('onDel', '');
        return handleDeletion(key);
      case 'download':
        return handleLinks(alertAction);
      case 'overlay':
        return setOverlay(type, String(docDk), docNum);
      case 'overlay_iimp':
        return setOverlay('OVERLAY_IIMP', String(docDk));
      case 'link':
        return handleLinks(alertAction);
      case 'openComplaint':
        return handleActionLinks(alertAction, key);
      default:
        return window.alert('Em breve! :)');
    }
  }

  const showHover = !hideHover && actions[1];

  return (
    <div className={`${alertBadgeOuterContainer} ${showHoverMobile && showContainerInMobile}`}>
      {!showHover && (
        <button
          type="button"
          className={openDropdownBtn}
          aria-label="Open Alerts Dropdown"
          onClick={setIsOpen}
        />
      )}

      {showHover && !isDeleted && (
        <div className={alertBadgeHoverContainer}>
          <button
            className={hoverMobile}
            type="button"
            onClick={() => setShowHoverMobile(false)}
          >
            <span className={`${alertBadgeArrow} ${closeArrow}`} />
          </button>

          {actions.map((alertAction) => (
            <ActionButtons
              key={`${customKey}-${alertAction.actionType}-${alertAction.text}`}
              clickCallback={() => handleActionPress(alertAction, customKey)}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...alertAction}
            />
          ))}
        </div>
      )}

      {!hideHover && isDeleted && (
        <div className={`${deleteConfirmation} ${isDeleted ? `${isDeletedStyle}` : ''}`}>
          <button type="button" className={doDelete} onClick={() => handleDeletion(customKey)}>
            x
          </button>
          <button
            type="button"
            className={undoDelete}
            onClick={() => handleDeletion(customKey, true)}
          >
            Desfazer
          </button>
        </div>
      )}

      <div className={alertBadgeLeftContainer} style={{ backgroundColor }}>
        {icon}
      </div>

      <div className={alertBadgeRightContainer}>
        <span>{message}</span>

        <div className={alertBadgeSmallButtons}>
          {!showHover && actions[0] && (
            <>
              <button
                type="button"
                onClick={() => {
                  handleActionPress(actions[0]);
                }}
                className={alertBadgeDownloadNumbers}
              >
                {actions[0].text}
              </button>

              <button type="button" className={alertBadgeCountWrapper} onClick={setIsOpen} style={{ backgroundColor }}>
                <span className={`${alertBadgeArrow} ${isOpen && alertBadgeArrowOpen}`} />
                {count}
              </button>

              <button type='button' className={openMobileDropdownBtn} onClick={setIsOpen}>
                <span className={`${alertBadgeArrow} ${isOpen && alertBadgeArrowOpen}`} />
              </button>
            </>
          )}
        </div>
      </div>

      {showHover && (
        <button
          className={hoverMobile}
          type="button"
          onClick={() => setShowHoverMobile(true)}
        >
          <span className={`${alertBadgeArrow} ${openArrow}`} />
        </button>
      )}
    </div>
  );
}

AlertBadge.propTypes = propTypes;
AlertBadge.defaultProps = defaultProps;
export default AlertBadge;
