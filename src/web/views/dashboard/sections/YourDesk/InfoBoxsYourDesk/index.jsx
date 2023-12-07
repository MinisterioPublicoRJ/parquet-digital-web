import React from 'react';
import PropTypes, { string } from 'prop-types';
import { Spinner } from '../../../../../components';
import {
  controlButtonOuter,
  controlButtonInner,
  deskButtonsVistas,
  gray,
  white,
  blue,
  green,
} from './styles.module.css';

const propTypes = {
  number: PropTypes.number,
  text: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  color: PropTypes.oneOf(['white', 'blue', 'green', 'gray']),
};

const defaultProps = {
  error: false,
  number: 0,
  loading: false,
  color: 'white',
};

function MainButton({ number, text, loading, error, color }) {
  const cssColors = {
    green,
    white,
    blue,
    gray,
  };

  return (
    <div className={`${controlButtonOuter} ${cssColors[color]}`}>
      {loading ? (
        <Spinner size="small" />
      ) : (
        <div className={controlButtonInner}>
          {text === 'Total de vistas abertas' ? (
            <span>{error ? 0 : number}</span>
          ) : (
            <span className={deskButtonsVistas}>{error ? 0 : number}</span>
          )}
        </div>
      )}
      <p>{text}</p>
    </div>
  );
}

MainButton.propTypes = propTypes;
MainButton.defaultProps = defaultProps;
export default MainButton;
