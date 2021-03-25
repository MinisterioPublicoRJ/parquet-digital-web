import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import Api from '../../../../api';
import AlertBadge from '../AlertBadge';
import { useAuth } from '../../../../app/authContext';
import individualAlertFormatter from '../utils/individualAlertFormatter';

const propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  type: PropTypes.string.isRequired,
  setOverlay: PropTypes.func.isRequired,
  openDialogBox: PropTypes.func.isRequired,
  deletedAlertKey: PropTypes.string,
};

function Dropdown({ list, type, setOverlay, openDialogBox, deletedAlertKey }) {
  const { buildRequestParams } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [alertsList, setAlertsList] = useState(list);
  const [visibleAlertsList, setVisibleAlertsList] = useState(list.slice(0, 30));
  const [isShowMoreInHover, setIsShowMoreInHover] = useState(false);
  const { orgao, token } = buildRequestParams();
  const headerAlert = individualAlertFormatter(
    {
      alertCode: type,
      dropdown: true,
      count: alertsList.length,
    },
    '',
    token,
    orgao,
  );

  useEffect(() => {
    removeAlert(deletedAlertKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedAlertKey]);

  function handleAlertAction(alertKey, undo) {
    if (undo) {
      restoreAlert(alertKey);
    } else {
      const alert = alertsList.filter(({ key }) => key === alertKey)[0];

      if (alert.isDeleted) {
        removeAlert(alertKey, undo);
      } else {
        dismissAlert(alertKey);
      }
    }
  }

  function dismissAlert(alertKey) {
    const newList = alertsList.map((alert) => {
      if (alert.key === alertKey) {
        return { ...alert, isDeleted: true };
      }
      return alert;
    });
    setAlertsList(newList);
    setVisibleAlertsList((prevValue) => {
      return newList.slice(0, prevValue.length);
    });
    Api.removeAlert({ ...buildRequestParams(), alertId: alertKey });
  }

  function restoreAlert(alertKey) {
    const newList = alertsList.map((alert) => {
      if (alert.key === alertKey) {
        return { ...alert, isDeleted: false };
      }
      return alert;
    });
    setAlertsList(newList);
    setVisibleAlertsList((prevValue) => {
      return newList.slice(0, prevValue.length);
    });
    Api.undoRemoveAlert({ ...buildRequestParams(), alertId: alertKey });
  }

  function removeAlert(alertKey) {
    if (!alertKey) return;
    const newList = alertsList.filter(({ key }) => key !== alertKey);
    setAlertsList(newList);
    setVisibleAlertsList((prevValue) => newList.slice(0, prevValue.length));
  }

  if (!alertsList.length) {
    return null;
  }

  return (
    <div className="box-btn-dropdown">
      <button
        className="dropdownBtn"
        type="button"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <AlertBadge
          {...headerAlert}
          customKey={headerAlert.key}
          count={alertsList.length}
          isOpen={isOpen}
          hideHover
        />
      </button>
      <div style={!isOpen ? { display: 'none' } : {}}>
        {visibleAlertsList.map((alert) => {
          const {
            actions,
            backgroundColor,
            backgroundColorChild,
            icon,
            key,
            message,
            isDeleted,
            docDk,
          } = alert;
          return (
            <AlertBadge
              onDeletion={(alertKey, undo) => handleAlertAction(alertKey, undo)}
              removeAlert={removeAlert}
              key={key}
              customKey={key}
              icon={icon}
              backgroundColor={backgroundColorChild || backgroundColor}
              message={message}
              actions={actions}
              isDeleted={isDeleted}
              setOverlay={setOverlay}
              docDk={docDk}
              type={type}
              openDialogBox={openDialogBox}
            />
          );
        })}

        {alertsList.length !== visibleAlertsList.length ? (
          <button
            type="button"
            onMouseEnter={() => setIsShowMoreInHover(true)}
            onMouseLeave={() => setIsShowMoreInHover(false)}
            style={
              isShowMoreInHover
                ? {
                    color: 'white',
                    backgroundColor: headerAlert.backgroundColor,
                  }
                : {
                    color: headerAlert.backgroundColor,
                    backgroundColor: 'white',
                    borderTopColor: headerAlert.backgroundColor,
                  }
            }
            onClick={() => {
              setVisibleAlertsList((prevValue) => {
                return alertsList.slice(0, prevValue.length + 30);
              });
            }}
            className="show-more-alerts"
          >
            MOSTRAR +30 ALERTAS
          </button>
        ) : null}
      </div>
    </div>
  );
}

Dropdown.propTypes = propTypes;
export default Dropdown;
