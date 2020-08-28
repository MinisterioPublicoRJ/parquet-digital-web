import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import AlertBadge from '../AlertBadge';
import individualAlertFormatter from '../utils/individualAlertFormatter';

const propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  type: PropTypes.string.isRequired,
};

function Dropdown({ list, type, setShowOverlay }) {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleAlertsList, setVisibleAlertsList] = useState(list);
  const headerAlert = individualAlertFormatter({
    alertCode: type,
    dropdown: true,
    count: list.length,
  });

  function handleAlertDeletion(deleteKey) {
    const newList = list.filter(({ key }) => key !== deleteKey);
    setVisibleAlertsList(newList);
    // ADD BACKEND INTEGRATION HERE WHEN IT'S DONE!
  }

  if (!visibleAlertsList.length) {
    return null;
  }

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(prevState => !prevState)}>
        <AlertBadge {...headerAlert} customKey={headerAlert.key} hideHover />
      </button>
      {isOpen &&
        visibleAlertsList.map(alert => {
          const { actions, backgroundColor, icon, key, message } = alert;
          return (
            <AlertBadge
              onDeletion={alertKey => handleAlertDeletion(alertKey)}
              key={key}
              customKey={key}
              icon={icon}
              backgroundColor={backgroundColor}
              message={message}
              actions={actions}
              setShowOverlay={setShowOverlay}
            />
          );
        })}
    </div>
  );
}

Dropdown.propTypes = propTypes;
export default Dropdown;
