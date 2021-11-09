import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const propTypes = {
  action: PropTypes.func.isRequired,
  closeBox: PropTypes.func.isRequired,
  message: PropTypes.node.isRequired,
};

function DialogBox({ action, message, closeBox }) {
  function handleClick(response) {
    if (response === 'yes') {
      action();
    }
    closeBox();
  }
  return (
    <div className="dialog-box">
      {message}
      <button className="dialog-box-yes-btn" onClick={(event) => handleClick('yes')}>
        Sim
      </button>
      <button className="dialog-box-no-btn" onClick={(event) => handleClick()}>
        Não
      </button>
    </div>
  );
}

DialogBox.propTypes = propTypes;
export default DialogBox;
