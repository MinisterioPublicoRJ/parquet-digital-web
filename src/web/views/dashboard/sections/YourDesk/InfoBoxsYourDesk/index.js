import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '../../../../../components';
import { useAppContext } from '../../../../../../core/app/App.context';
import {
  controlButtonOuter,
  controlButtonInner,
  controlButtonBigNumber,
} from './styles.module.css';

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

function MainButton({  number, text, loading, error }) {
  const { currentOffice } = useAppContext();

  return <div className={controlButtonOuter}>
    <div className={`${controlButtonInner}` }
    >
      {loading ? (
        <Spinner size="small" />
      ) : (
        <span>{error ? 0 : number}</span>
      )}
      {text}
    </div>
  </div>;
}

MainButton.propTypes = propTypes;
MainButton.defaultProps = defaultProps;
export default MainButton;
