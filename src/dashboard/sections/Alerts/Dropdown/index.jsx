import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import AlertBadge from '../AlertBadge';
import individualAlertFormatter from '../utils/individualAlertFormatter';

const propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  type: PropTypes.string.isRequired,
  setOverlay: PropTypes.func.isRequired,
};

function Dropdown({ list, type, setOverlay }) {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleAlertsList, setVisibleAlertsList] = useState(list);
  const headerAlert = individualAlertFormatter({
    alertCode: type,
    dropdown: true,
    count: list.length,
  });

  function handleAlertDeletion(deleteKey, isDeleting) {
    let newList;
    if (isDeleting) {
      newList = visibleAlertsList.filter(({ key }) => key !== deleteKey);
    } else {
      newList = visibleAlertsList.map(alert => {
        if (alert.key !== deleteKey) {
          return alert;
        } else if (alert.isDeleting) {
          return { ...alert, isDeleting: false };
        } else {
          return { ...alert, isDeleting: true };
        }
      });
    }

    setVisibleAlertsList(newList);
    // ADD BACKEND INTEGRATION HERE WHEN IT'S DONE!
  }

  if (!visibleAlertsList.length) {
    return null;
  }

  return (
    <div className="box-btn-dropdown">
      <button
        className="dropdownBtn"
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
              onDeletion={(alertKey, isDeleting) => handleAlertDeletion(alertKey, isDeleting)}
              key={key}
              customKey={key}
              icon={icon}
              backgroundColor={backgroundColor}
              message={message}
              actions={actions}
              setOverlay={setOverlay}
              type={type}
              isDeleting={isDeleting}
            />
          );
        })}
    </div>
  );
}

Dropdown.propTypes = propTypes;
export default Dropdown;
