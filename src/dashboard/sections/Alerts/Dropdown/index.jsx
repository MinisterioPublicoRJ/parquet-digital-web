import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import AlertBadge from '../AlertBadge';
import individualAlertFormatter from '../utils/individualAlertFormatter';

const propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  type: PropTypes.string.isRequired,
};

function Dropdown({ list, type }) {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleAlertsList, setVisibleAlertsList] = useState(list);
  const alertChildren = visibleAlertsList.map(alert => {
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
        isDeleting={isDeleting}
      />
    );
  });

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
      <div style={!isOpen ? { display: 'none' } : {}}> {alertChildren}</div>
    </div>
  );
}

Dropdown.propTypes = propTypes;
export default Dropdown;
