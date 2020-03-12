import React from 'react';
import { useHistory } from 'react-router-dom';

const defaultProps = {
  isCompact: false,
};

const ChangeModeButton = ({ cb, isCompact }) => {
  const history = useHistory();
  const func = async () => {
    await cb();
    history.push('/');
  };
  return (
    <button className="change-mode-button" type="button" onClick={func}>
      modo
      {isCompact ? ' dashboard' : ' compacto'}
    </button>
  );
};

ChangeModeButton.defaultProps = defaultProps;

export default ChangeModeButton;
