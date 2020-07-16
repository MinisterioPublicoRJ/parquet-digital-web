import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import { Bin, Tack } from '../../../../assets';

const propTypes = {
  onPin: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isPinned: PropTypes.bool.isRequired,
};

function ActionButtons({ onPin, onDelete, isPinned }) {
  return (
    <>
      <button type="button" onClick={onPin}>
        <Tack activated={isPinned} />
      </button>
      <button type="button" onClick={onDelete}>
        <Bin />
      </button>
    </>
  );
}

ActionButtons.propTypes = propTypes;
export default ActionButtons;
