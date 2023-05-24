import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '../../../../../components';
import { useAppContext } from '../../../../../../core/app/App.context';

import {
  controlButtonOuter,
  controlButtonInner,
  controlButtonInactive,
  controlButtonActive,
  controlButtonBigNumber,
  controlButtonBigNumberActive,
} from './styles.module.css';

const propTypes = {
  isActive: PropTypes.bool,
  number: PropTypes.number,
  text: PropTypes.string.isRequired,
  isButton: PropTypes.bool,
  loading: PropTypes.bool,
  buttonPressed: PropTypes.func,
  error: PropTypes.bool,
};

const defaultProps = {
  isActive: false,
  isButton: false,
  buttonPressed: null,
  error: false,
  number: 0,
  loading: false,
};

function MainButton({ isActive, number, text, isButton, loading, buttonPressed, error }) {
  const { currentOffice } = useAppContext();

  let fill;
  if (isButton) {
    if (isActive) {
      fill = (
        <div
          className={`${controlButtonInner} ${controlButtonActive}`}
        >
          {loading ? (
            <Spinner size="small" />
          ) : (
            <span className={controlButtonBigNumberActive}>{error ? 0 : number}</span>
          )}
          {text}
        </div>
      );
    } else {
      fill = (
        <div
          className={`${controlButtonInner} ${controlButtonInactive}`}        >
          {loading ? (
            <Spinner size="small" />
          ) : (
            <span className={controlButtonBigNumber}>{error ? 0 : number}</span>
          )}
          {text}
        </div>
      );
    }
  } else {
    fill = (
      <div className={`${controlButtonInner} ${controlButtonInactive}`}>
        {loading ? (
          <Spinner size="small" />
        ) : (
          <span className={controlButtonBigNumber}>{error ? 0 : number}</span>
        )}
        {text}
      </div>
    );
  }

  return <div className={controlButtonOuter}>{fill}</div>;
}

MainButton.propTypes = propTypes;
MainButton.defaultProps = defaultProps;
export default MainButton;
