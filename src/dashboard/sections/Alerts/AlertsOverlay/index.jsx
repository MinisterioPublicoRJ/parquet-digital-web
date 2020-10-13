import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Api from '../../../../api';
import { useAuth } from '../../../../app/authContext';
import { Spinner } from '../../../../components';

import './styles.css';
import { OVERLAY_TEXTS, PRCR_TEXTS } from './overlayConstants';

const propTypes = {
  type: PropTypes.string.isRequired,
  setShowOverlay: PropTypes.func.isRequired,
  children: PropTypes.node,
};

function AlertsOverlay({ type, setShowOverlay, children, docDk }) {
  const { buildRequestParams } = useAuth();
  const [text, setText] = useState();

  async function getPRCRText(type, docDk) {
    let data = null;
    try {
      data = await Api.getPRCRData(docDk, buildRequestParams());
    } catch (e) {
    } finally {
      return data;
    }
  }

  async function getText() {
    if (OVERLAY_TEXTS[type])
      setText(
        <>
          <h4> {type} </h4>
          {OVERLAY_TEXTS[type]}
        </>,
      );
    else if (type && type.slice(0, 4) === 'PRCR') {
      const data = await getPRCRText(type, docDk);
      setText(PRCR_TEXTS(type, data));
    } else {
      setText(
        <p>
          Isso é um overlay do tipo
          {type}
        </p>,
      );
    }
  }

  /**
   * Prevent close when click in the div.innerWrapper
   */
  function handleInnerClick(e) {
    e.stopPropagation();
  }

  useEffect(() => {
    getText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="overlay-outer"
      onClick={(e) => setShowOverlay(false)}
      onKeyDown={(e) => setShowOverlay(false)}
    >
      <div
        className="alerts-overlay"
        onClick={(e) => handleInnerClick(e)}
        onKeyDown={(e) => handleInnerClick(e)}
      >
        <div>
          {text || <Spinner size="medium" />}
          <button onClick={() => setShowOverlay(false)}> Sair</button>
          {children}
        </div>
      </div>
    </div>
  );
}

AlertsOverlay.propTypes = propTypes;
export default AlertsOverlay;
