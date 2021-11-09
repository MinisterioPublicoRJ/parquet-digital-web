import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Api from '../../../../../api';
import { useAppContext } from '../../../../../../core/app/App.context';
import { Spinner } from '../../../../../../components';

import './styles.css';
import { OVERLAY_TEXTS, PRCR_TEXTS, IC1A_TEXT, PA1A_TEXT } from './overlayConstants';

const propTypes = {
  type: PropTypes.string.isRequired,
  setShowOverlay: PropTypes.func.isRequired,
  children: PropTypes.node,
};

const defaultProps = { children: null };

function AlertsOverlay({ type, setShowOverlay, children, docDk }) {
  const { buildRequestParams } = useAppContext();
  const [text, setText] = useState();


  async function getOverlayText(docType) {
    try {
      const data = await Api.getAlertOverlayData(docDk, docType, buildRequestParams());
      return data;
    } catch (e) {
      return <p>Erro ao carregar os dados</p>;
    }
  }

  async function getText() {
    let texts;
    let data;
    if (OVERLAY_TEXTS[type]) {
      texts = (
        <>
          <h4>{type === 'onDel' ? 'Dispensar Alerta' : type}</h4>
          {OVERLAY_TEXTS[type]}
        </>
      );
    } else {
      switch (type.toLocaleUpperCase()) {
        case 'PRCR':
        case 'PRCR1':
        case 'PRCR2':
        case 'PRCR3':
        case 'PRCR4':
          data = await getOverlayText('prescricao', docDk);
          texts = PRCR_TEXTS(type, data);
          break;
        case 'IC1A':
          data = await getOverlayText(type, docDk);
          texts = IC1A_TEXT(data);
          break;
        case 'PA1A':
          data = await getOverlayText(type, docDk);
          texts = PA1A_TEXT(data);
          break;
        default:
          texts = <p>{`Os dados para alertas ${type} ainda não estão disponíveis`}</p>;
      }
    }
    setText(texts);
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
          <button type="button" onClick={() => setShowOverlay(false)}>
            {type === 'onDel' ? 'Entendi' : 'Sair'}
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

AlertsOverlay.propTypes = propTypes;
AlertsOverlay.defaultProps = defaultProps;
export default AlertsOverlay;
