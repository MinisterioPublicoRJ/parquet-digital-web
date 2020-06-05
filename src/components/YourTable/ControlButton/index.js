import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import { Spinner } from '../../layoutPieces';

const propTypes = {
  isActive: PropTypes.bool,
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  isButton: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  buttonPressed: PropTypes.func,
  error: PropTypes.bool.isRequired,
};

const defaultProps = {
  isActive: false,
  isButton: false,
  buttonPressed: null,
};

function ControlButton({ isActive, number, text, isButton, loading, buttonPressed, error }) {
  if (isButton) {
    if (isActive) {
      return (
        <button
          type="button"
          className="controlButton-outer controlButton--active"
          onClick={() => buttonPressed()}
        >
          {loading ? (
            <Spinner size="small" />
          ) : (
            <span className="controlButton-bigNumber">{error ? 0 : number}</span>
          )}
          {text}
        </button>
      );
    }
    return (
      <button
        type="button"
        className="controlButton-outer controlButton--inactive"
        onClick={() => buttonPressed()}
      >
        {loading ? (
          <Spinner size="small" />
        ) : (
          <span className="controlButton-bigNumber">{error ? 0 : number}</span>
        )}
        {text}
      </button>
    );
  }
  return (
    <div className="controlButton-outer controlButton--inactive controlButton-notButton">
      {loading ? (
        <Spinner size="small" />
      ) : (
        <span className="controlButton-bigNumber">{error ? 0 : number}</span>
      )}
      {text}
    </div>
  );
}
ControlButton.propTypes = propTypes;
ControlButton.defaultProps = defaultProps;
export default ControlButton;
