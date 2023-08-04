import React from 'react';
import PropTypes, { string } from 'prop-types';
import { Spinner } from '../../../../../components';
import { controlButtonOuter, controlButtonInner, deskButtonsVistas, deskTextParagrap } from './styles.module.css';

const propTypes = {
  number: PropTypes.number,
  text: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

const defaultProps = {
  error: false,
  number: 0,
  loading: false,
};

function MainButton({ number, text, loading, error }) {

  return (
    <div className={controlButtonOuter}>
      {loading ? (
        <Spinner size="small" />
      ) : (
        <div className={controlButtonInner}>
          {text === 'Total de vistas abertas' ? (
            <span className={deskTextParagrap}>{error ? 0 : number}</span>
          ):(
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
