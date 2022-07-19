import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Api from '../../../../../api';
import { useAppContext } from '../../../../../../core/app/App.context';
import { Spinner } from '../../../../../components';

import { OVERLAY_TEXTS, PRCR_TEXTS, IC1A_TEXT, PA1A_TEXT } from './overlayConstants';

import { overlayOuter, alertsOverlay } from './styles.module.css';

const propTypes = {
  type: PropTypes.string.isRequired,
  setShowOverlay: PropTypes.func.isRequired,
  children: PropTypes.node,
  docDk: PropTypes.string,
};

const defaultProps = { children: null, docDk: '' };

function AlertsOverlay({ type, setShowOverlay, children, docDk }) {
  const { buildRequestParams } = useAppContext();
  const [text, setText] = useState();

  async function getOverlayText(docType) {
    try {
      let data = await Api.getAlertOverlayData(docDk, docType, buildRequestParams());
      data = data || [];
      return data;
    } catch (e) {
      console.log('error');
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
          texts = Array.isArray(data) ? PRCR_TEXTS(type, data) : data;
          break;
        case 'IC1A':
          data = await getOverlayText(type, docDk);
          texts = Array.isArray(data) ? IC1A_TEXT(data) : data;
          break;
        case 'PA1A':
          data = await getOverlayText(type, docDk);
          texts = Array.isArray(data) ? PA1A_TEXT(data) : data;
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
  }, []);

  return (
    <div
      className={overlayOuter}
      onClick={() => setShowOverlay(false)}
      onKeyDown={() => setShowOverlay(false)}
      role="button"
      tabIndex={0}
    >
      <div
        className={alertsOverlay}
        onClick={(e) => handleInnerClick(e)}
        onKeyDown={(e) => handleInnerClick(e)}
        role="button"
        tabIndex={0}
      >
        {text ? (
          <div>
            {text}
            <button type="button" onClick={() => setShowOverlay(false)}>
              {type === 'onDel' ? 'Entendi' : 'Sair'}
            </button>
          </div>
        ) : (
          <Spinner size="medium" />
        )}
        {children}
      </div>
    </div>
  );
}

AlertsOverlay.propTypes = propTypes;
AlertsOverlay.defaultProps = defaultProps;
export default AlertsOverlay;
