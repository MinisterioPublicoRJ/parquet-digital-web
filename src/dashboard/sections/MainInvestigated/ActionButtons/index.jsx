import React from 'react';

import './styles.css';
import { Bin, Tack } from '../../../../assets';

export default function ActionButtons({ onPin, onDelete, isPinned }) {
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
