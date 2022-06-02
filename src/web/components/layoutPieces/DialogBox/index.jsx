import React from 'react';
import PropTypes from 'prop-types';
import { dialogBoxStyle, dialogBoxYesBtnStyle, dialogBoxNoBtnStyle } from './DialogBox.module.css';

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
    <div className={ dialogBoxStyle }>
      {message}
      <button type="button" className={ dialogBoxYesBtnStyle } onClick={() => handleClick('yes')}>        
        Sim
      </button>
      <button type="button" className={ dialogBoxNoBtnStyle } onClick={() => handleClick()}>
        Não
      </button>
    </div>
  );
}

DialogBox.propTypes = propTypes;
export default DialogBox;
