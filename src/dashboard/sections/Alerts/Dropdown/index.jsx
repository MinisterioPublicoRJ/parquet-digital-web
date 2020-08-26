import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import AlertBadge from '../AlertBadge';

const propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  type: PropTypes.string.isRequired,
};

function Dropdown({ list, type }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(prevState => !prevState)}>
        {`I'm always visible! My type is ${type}`}
      </button>
      {isOpen &&
        list.map(alert => {
          const { actions, backgroundColor, icon, key, message } = alert;
          return (
            <AlertBadge
              key={key}
              icon={icon}
              backgroundColor={backgroundColor}
              message={message}
              actions={actions}
            />
          );
        })}
    </div>
  );
}

Dropdown.propTypes = propTypes;
export default Dropdown;
