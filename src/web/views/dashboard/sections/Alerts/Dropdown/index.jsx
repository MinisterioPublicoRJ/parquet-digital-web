/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import AlertBadge from '../AlertBadge';
import { useAppContext } from '../../../../../../core/app/App.context';
import { useAlertsContext } from '../alertsContext';
import individualAlertFormatter from '../utils/individualAlertFormatter';

const propTypes = {
  type: PropTypes.string.isRequired,
  setOverlay: PropTypes.func.isRequired,
  openDialogBox: PropTypes.func.isRequired,
};

function Dropdown({ type, setOverlay, openDialogBox }) {
  
  const { removeAlert, alerts, handleAlertAction } = useAlertsContext();
  const { buildRequestParams } = useAppContext();
  const { orgao, token } = buildRequestParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isShowMoreInHover, setIsShowMoreInHover] = useState(false);
  const [visibleAlerts, setVisibleAlerts] = useState(30);
  const alertsList = alerts[type];
  const visibleAlertsList = alertsList.slice(0, visibleAlerts);
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
              onDeletion={(alertKey, undo) => handleAlertAction(type, alertKey, undo)}
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
              setVisibleAlerts((prevValue) => prevValue + 30);
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
