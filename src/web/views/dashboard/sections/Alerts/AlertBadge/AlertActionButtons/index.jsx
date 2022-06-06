import React from 'react';
import PropTypes from 'prop-types';

import {
  actionButtonOuter,
} from './styles.module.css';

const propTypes = {
  background: PropTypes.string.isRequired,
  clickCallback: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  text: PropTypes.node.isRequired,
};

function AlertActionButtons({ icon, background, text, clickCallback }) {
  return (
    <button
      className={ actionButtonOuter }
      type="button"
      style={{ background }}
      onClick={clickCallback}
    >
      <div>{icon}</div>
      <span>{text}</span>
    </button>
  );
}

AlertActionButtons.propTypes = propTypes;
export default AlertActionButtons;
