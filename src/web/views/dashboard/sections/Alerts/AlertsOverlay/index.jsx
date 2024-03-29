import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../../../../../../core/app/App.context';
import Spinner from '../../../../../components/layoutPieces/Spinner';

import { OVERLAY_TEXTS, PRCR_TEXTS, IC1A_TEXT, PA1A_TEXT, IIMP_TEXT } from './overlayConstants';

import {
  overlayOuter,
  alertsOverlay,
  alertsOverlayDiv,
  alertsOverlayButton,
  spinnerWraper,
} from './styles.module.css';
import { useAlertsContext } from '../alertsContext';

const propTypes = {
  type: PropTypes.string.isRequired,
  setShowOverlay: PropTypes.func.isRequired,
  children: PropTypes.node,
  docDk: PropTypes.string,
  docNum: PropTypes.string,
};

const defaultProps = { children: null, docDk: '', docNum: '' };

function AlertsOverlay({ type, setShowOverlay, children, docDk, docNum }) {
  const { buildRequestParams, Api } = useAppContext();
  const {alerts} = useAlertsContext();
  const [text, setText] = useState();


  async function getOverlayText(docType) {
    try {
      let data = await Api.getAlertOverlayData(docDk, docType, buildRequestParams());
      data = data || [];
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
          texts = typeof data === 'object' || Array.isArray(data) ? PRCR_TEXTS(type, data, docNum) : data;
          break;
        case 'IC1A':
          data = await getOverlayText(type, docDk);
          texts = typeof data === 'object' || Array.isArray(data) ? IC1A_TEXT(data) : data;
          break;
        case 'PA1A':
          data = await getOverlayText(type, docDk);
          texts = typeof data === 'object' || Array.isArray(data) ? PA1A_TEXT(data) : data;
          break;
        case 'OVERLAY_IIMP':
          texts = IIMP_TEXT(alerts?.IIMP?.find((alert) => Number(alert?.docDk) === Number(docDk))?.lastProrrogationDate);
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
        <div className={alertsOverlayDiv}>
          {text ? (
            <div>
              {text}
              <button
                onClick={() => setShowOverlay(false)}
                className={alertsOverlayButton}
                type="button"
              >
                {type === 'onDel' ? 'Entendi' : 'Sair'}
              </button>
            </div>
          ) : (
            <div className={spinnerWraper}>
            <Spinner size="medium" />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

AlertsOverlay.propTypes = propTypes;
AlertsOverlay.defaultProps = defaultProps;
export default AlertsOverlay;
