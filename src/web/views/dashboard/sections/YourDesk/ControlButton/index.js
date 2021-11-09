import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import { Spinner } from '../../../../../components';

const propTypes = {
  isActive: PropTypes.bool,
  number: PropTypes.number,
  text: PropTypes.string.isRequired,
  isButton: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  buttonPressed: PropTypes.func,
  error: PropTypes.bool,
};

const defaultProps = {
  isActive: false,
  isButton: false,
  buttonPressed: null,
  error: false,
  number: 0,
};

function ControlButton({ isActive, number, text, isButton, loading, buttonPressed, error }) {
  let fill;
  if (isButton) {
    if (isActive) {
      fill = (
        <button
          type="button"
          className="controlButton-inner controlButton--active"
          onClick={() => buttonPressed()}
        >
          {loading ? (
            <Spinner size="small" />
          ) : (
            <span className="controlButton-bigNumber--active">{error ? 0 : number}</span>
          )}
          {text}
        </button>
      );
    } else {
      fill = (
        <button
          type="button"
          className="controlButton-inner controlButton--inactive"
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
  } else {
    fill = (
      <div className="controlButton-inner controlButton--inactive controlButton-notButton">
        {loading ? (
          <Spinner size="small" />
        ) : (
          <span className="controlButton-bigNumber">{error ? 0 : number}</span>
        )}
        {text}
      </div>
    );
  }

  return <div className="controlButton-outer">{fill}</div>;
}
ControlButton.propTypes = propTypes;
ControlButton.defaultProps = defaultProps;
export default ControlButton;
