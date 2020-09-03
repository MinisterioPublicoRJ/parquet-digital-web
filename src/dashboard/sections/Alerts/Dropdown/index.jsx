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
};

function Dropdown({ list, type }) {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleAlertsList, setVisibleAlertsList] = useState(list);
  const headerAlert = individualAlertFormatter({
    alertCode: type,
    dropdown: true,
    count: list.length,
  });

  function handleAlertAction(alertKey, undo) {
    console.log('handleAlertAction', alertKey, undo);
    if (undo) {
      restoreAlert(alertKey);
    } else {
      const alert = visibleAlertsList.filter(({ key }) => key === alertKey)[0];

      if (alert.isDeleting) {
        removeAlert(alertKey, undo);
      } else {
        dismissAlert(alertKey);
      }
    }
    // let newList;
    // if (isDeleting) {
    //   newList = visibleAlertsList.filter(({ key }) => key !== deleteKey);
    // } else {
    //   newList = visibleAlertsList.map(alert => {
    //     if (alert.key !== deleteKey) {
    //       return alert;
    //     }
    //     if (alert.isDeleting) {
    //       return { ...alert, isDeleting: false };
    //     }
    //     return { ...alert, isDeleting: true };
    //   });
    // }

    // setVisibleAlertsList(newList);
    // ADD BACKEND INTEGRATION HERE WHEN IT'S DONE!
  }

  async function dismissAlert(alertKey) {
    const newList = visibleAlertsList.map(alert => {
      if (alert.key === alertKey) {
        return { ...alert, isDeleting: true };
      }
      return alert;
    })
    setVisibleAlertsList(newList);
  }

  async function restoreAlert(alertKey) {
    const newList = visibleAlertsList.map(alert => {
      if (alert.key === alertKey) {
        return { ...alert, isDeleting: false };
      }
      return alert;
    })
    setVisibleAlertsList(newList);
  }

  function removeAlert(alertKey) {
    console.log('removeAlert', alertKey);
    const newList = visibleAlertsList.filter(({ key }) => key !== alertKey);
    setVisibleAlertsList(newList);
  }

  if (!visibleAlertsList.length) {
    return null;
  }

  return (
    <div className="box-btn-dropdow">
      <button
        className="dropdowBtn"
        type="button"
        onClick={() => setIsOpen(prevState => !prevState)}
      >
        <AlertBadge
          {...headerAlert}
          customKey={headerAlert.key}
          count={visibleAlertsList.length}
          isOpen={isOpen}
          hideHover
        />
      </button>
      {isOpen &&
        visibleAlertsList.map(alert => {
          const { actions, backgroundColor, icon, key, message, isDeleting } = alert;
          return (
            <AlertBadge
              onDeletion={(alertKey, undo) => handleAlertAction(alertKey, undo)}
              key={key}
              customKey={key}
              icon={icon}
              backgroundColor={backgroundColor}
              message={message}
              actions={actions}
              isDeleting={isDeleting}
            />
          );
        })}
    </div>
  );
}

Dropdown.propTypes = propTypes;
export default Dropdown;
