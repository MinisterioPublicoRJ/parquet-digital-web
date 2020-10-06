import React, { useState } from 'react';
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
};

function Dropdown({ list, type, setOverlay }) {
  const { buildRequestParams } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [visibleAlertsList, setVisibleAlertsList] = useState(list.slice(0, 30));
  const alertChildren = visibleAlertsList.map((alert) => {
    const { actions, backgroundColor, icon, key, message, isDeleted } = alert;
    return (
      <AlertBadge
        onDeletion={(alertKey, undo) => handleAlertAction(alertKey, undo)}
        key={key}
        customKey={key}
        icon={icon}
        backgroundColor={backgroundColor}
        message={message}
        actions={actions}
        isDeleted={isDeleted}
        setOverlay={setOverlay}
        type={type}
      />
    );
  });

  const headerAlert = individualAlertFormatter({
    alertCode: type,
    dropdown: true,
    count: list.length,
  });

  function handleAlertAction(alertKey, undo) {
    if (undo) {
      restoreAlert(alertKey);
    } else {
      const alert = list.filter(({ key }) => key === alertKey)[0];

      if (alert.isDeleted) {
        removeAlert(alertKey, undo);
      } else {
        dismissAlert(alertKey);
      }
    }
  }

  function dismissAlert(alertKey) {
    const newList = list.map((alert) => {
      if (alert.key === alertKey) {
        return { ...alert, isDeleted: true };
      }
      return alert;
    });
    list = newList;
    setVisibleAlertsList((prevValue) => {
      return list.slice(0, prevValue.length + 30);
    });
    Api.removeAlert({ ...buildRequestParams(), alertId: alertKey });
  }

  function restoreAlert(alertKey) {
    const newList = list.map((alert) => {
      if (alert.key === alertKey) {
        return { ...alert, isDeleted: false };
      }
      return alert;
    });
    list = newList;
    setVisibleAlertsList((prevValue) => {
      return list.slice(0, prevValue.length + 30);
    });
    Api.undoRemoveAlert({ ...buildRequestParams(), alertId: alertKey });
  }

  function removeAlert(alertKey) {
    const newList = list.filter(({ key }) => key !== alertKey);
    list = newList;
  }

  if (!list.length) {
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
          count={list.length}
          isOpen={isOpen}
          hideHover
        />
      </button>
      <div style={!isOpen ? { display: 'none' } : {}}>
        {alertChildren}
        <button
          onClick={() => {
            setVisibleAlertsList((prevValue) => {
              return list.slice(0, prevValue.length + 30);
            });

            console.log('visibleAlertsList: ', visibleAlertsList);
          }}
        >
          MOSTRAR MAIS 30
        </button>
      </div>
    </div>
  );
}

Dropdown.propTypes = propTypes;
export default Dropdown;
