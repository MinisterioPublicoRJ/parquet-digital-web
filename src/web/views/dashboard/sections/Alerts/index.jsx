/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';

import { useAppContext } from '../../../../../core/app/App.context';
import { useAlertsContext } from './alertsContext';

import { SectionTitle, Spinner, Modal, DialogBox } from '../../../../components';
import Dropdown from './Dropdown';
import Overlay from './AlertsOverlay';
import alertListFormatter from './utils/alertListFormatter';

import {
  alertsWrapper,
  alertsHeader,
  alertsTotalStyle,
  alertsBodyWrapper,
  alertsBody,
  spinnerWrapper
} from './styles.module.css';

function Alerts() {
  const { buildRequestParams, Api } = useAppContext();
  
  const [modalContent, setModalContent] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayType, setOverlayType] = useState(null);
  const [overlayDocDk, setOverlayDocDk] = useState(null);
  const [overlayDocNum, setOverlayDocNum] = useState(null);

  const {
    alerts,
    setAlerts,
    alertCount,
    setAlertCount,
    alertsError,
    setAlertsError,
    removeAlert
  } = useAlertsContext();


  const loading = !alerts && !alertsError;
  const dialogBoxMessage = (
    <>
      <h3>
        <b>OUVIDORIA</b>
      </h3>
      <p>Deseja que eu abra uma ouvidoria sobre este problema?</p>
    </>
  );

  async function loadAlerts() {
    let alertList = [];
    let listError = false;
    try {
      alertList = await Api.getAlerts(buildRequestParams());
    } catch (e) {
      // window.newrelic.noticeError(e);
      listError = true;
    }
    return [alertList, listError];
  }

  async function loadAlertCount() {
    let alertsTotal = [];
    let errorAlertsTotal = false;
    try {
      alertsTotal = await Api.getAlertsCount(buildRequestParams());

    } catch (e) {
      errorAlertsTotal = true;
    }
    return [alertsTotal, errorAlertsTotal];
  }
  // alerta de improbidade administrativa
  async function loadMisconductAlert() {
    let misconductAlertList = [];
    let misconductListError = false;
    try {
      misconductAlertList = await Api.getMisconductAlert(buildRequestParams());
    } catch (e) {
      misconductListError = true;
    }
    return [misconductAlertList, misconductListError];
  }

  async function loadComponent() {
    const [alertList, errorAlerts] = await loadAlerts();
    const [alertsCount, errorAlertsCount] = await loadAlertCount();
    const [misconductAlertList, misconductListError] = await loadMisconductAlert();
    const { cpf, token, orgao } = buildRequestParams();

    const apiError = errorAlertsCount || (errorAlerts && misconductListError );
    const fullList = alertList.concat(misconductAlertList );
    const cleanList = !apiError ? alertListFormatter(fullList, alertsCount, cpf, token, orgao) : [];

    setAlerts(cleanList);
    setAlertCount(fullList.length);
    setAlertsError(apiError);
  }

  const openDialogBox = (link, key, type) => {
    setModalContent({ link, key, type });
  }

  const sendEmail = async () => {
    const { key, link, type } = modalContent;
    try {
      // positive feedback after sending to ouvidoria delete the alert
      removeAlert(type, key);
      const response = await Api.sendOmbudsmanEmail(link);
      window.alert(response.data.detail || 'Houve um erro ao enviar o email. Tente novamente mais tarde');
    } catch (e) {
      window.alert('Houve um erro ao enviar o email. Ele pode já ter sido enviado. Caso contrário, tente novamente mais tarde', e);
    } finally {
      setModalContent(null);
    }
  }

  /**
   * uses alert key number to remove an alertbadge from the list, updates the state
   * @param  {number} alert key
   * @return {void}                 updates the state
   */
  // function removeAlert(key) {
  //   const oldAlerts = [...alerts];
  //   setAlerts(oldAlerts.filter(item => item.key !== key));
  // }

  // runs on "mount" only
  useEffect(() => {
    loadComponent();
  }, []);

  const setOverlay = (type, documentDk, docNum) => {
    setOverlayType(type);
    setOverlayDocDk(documentDk);
    setOverlayDocNum(docNum);
    setShowOverlay(true);
  }

  return (
      <article className={ alertsWrapper }>
        <div className={ alertsHeader }>
          <SectionTitle value="central de alertas" glueToTop />
          <span className={ alertsTotalStyle }>{alerts ? alertCount : 0}</span>
        </div>
        <div className={ alertsBodyWrapper }>
          <div
            className={ alertsBody }
            style={showOverlay || loading ? { overflowY: 'hidden' } : {}}
          >
            {showOverlay && (
              <Overlay type={overlayType} docDk={overlayDocDk} docNum={overlayDocNum} setShowOverlay={setShowOverlay} />
            )}
            {modalContent && (
              <Modal inner close={() => setModalContent(null)}>
                <DialogBox
                  action={sendEmail}
                  message={dialogBoxMessage}
                  closeBox={() => setModalContent(null)}
                />
              </Modal>
            )}

            {loading && <div className={spinnerWrapper}><Spinner size="large" /></div>}
            {alertsError && 'Não existem alertas para exibir.'}
            {alerts &&
              Object.keys(alerts).map((type) => (
                <Dropdown
                  type={type}
                  key={type}
                  setOverlay={setOverlay}
                  openDialogBox={openDialogBox}
                />
              ))}
          </div> 
        </div>
      </article>
  );
}

export default Alerts;
