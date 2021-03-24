import React, { useEffect } from 'react';

import './styles.css';
import { useAuth } from '../../../app/authContext';
import { AlertsContext, AlertsContextCreator } from './alertsContext';

import Api from '../../../api';
import { SectionTitle, Spinner, Modal, DialogBox } from '../../../components';
import Dropdown from './Dropdown';
import Overlay from './AlertsOverlay';
import alertListFormatter from './utils/alertListFormatter';

function Alerts() {
  const { buildRequestParams } = useAuth();
  const alertsStore = AlertsContextCreator();
  const {
    alerts,
    setAlerts,
    alertCount,
    setAlertCount,
    alertsError,
    setAlertsError,
    showOverlay,
    setShowOverlay,
    overlayType,
    setOverlayType,
    docDk,
    setDocDk,
    modalContent,
    setModalContent,
    deletedAlertKey,
    setDeletedAlertKey,
  } = alertsStore;
  // const [alerts, setAlerts] = useState(undefined);
  // const [alertCount, setAlertCount] = useState(undefined);
  // const [alertsError, setAlertsError] = useState(false);
  // const [showOverlay, setShowOverlay] = useState(false);
  // const [overlayType, setOverlayType] = useState(null);
  // const [docDk, setDocDk] = useState(null);
  //
  // const [modalContent, setModalContent] = useState(null);
  // const [deletedAlertKey, setDeletedAlertKey] = useState(null);
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

  async function loadHiresAlerts() {
    let hiresAlertList = [];
    let hiresListError = false;
    try {
      hiresAlertList = await Api.getHiresAlerts(buildRequestParams());
    } catch (e) {
      hiresListError = true;
    }
    return [hiresAlertList, hiresListError];
  }

  async function loadComponent() {
    const [alertList, errorAlerts] = await loadAlerts();
    const [alertsCount, errorAlertsCount] = await loadAlertCount();
    const [hiresAlertList, errorHiresList] = await loadHiresAlerts();

    const { cpf, token, orgao } = buildRequestParams();

    const apiError = errorAlertsCount || (errorAlerts && errorHiresList);
    const fullList = alertList.concat(hiresAlertList);
    const cleanList = !apiError ? alertListFormatter(fullList, alertsCount, cpf, token, orgao) : [];

    setAlerts(cleanList);
    setAlertCount(fullList.length);
    setAlertsError(apiError);
  }

  function openDialogBox(link, key) {
    setModalContent({ link, key });
  }

  async function sendEmail() {
    const { key, link } = modalContent;
    try {
      // positive feedback after sending to ouvidoria delete the alert
      setDeletedAlertKey(key);
      const response = await Api.sendOmbudsmanEmail(link);
      window.alert(response.data.detail);
    } catch (e) {
      console.log(e);
    } finally {
      setModalContent(null);
      setDeletedAlertKey(null);
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

  function setOverlay(type, docDk) {
    setOverlayType(type);
    setDocDk(docDk);
    setShowOverlay(true);
  }

  return (
    <AlertsContext.Provider value={alertsStore}>
      <article className="alerts-wrapper">
        <div className="alerts-header">
          <SectionTitle value="central de alertas" glueToTop />
          <span className="alerts-total">{alerts ? alertCount : 0}</span>
        </div>
        <div className="alerts-body-wrapper">
          <div
            className="alerts-body"
            style={showOverlay || loading ? { overflowY: 'hidden' } : {}}
          >
            {showOverlay && (
              <Overlay type={overlayType} docDk={docDk} setShowOverlay={setShowOverlay} />
            )}
            {modalContent && (
              <Modal onToggle={() => setModalContent(null)}>
                <DialogBox
                  action={sendEmail}
                  message={dialogBoxMessage}
                  closeBox={() => setModalContent(null)}
                />
              </Modal>
            )}

            {loading && <Spinner size="large" />}
            {alertsError && 'Não existem alertas para exibir.'}
            {alerts &&
              Object.keys(alerts).map((type) => (
                <Dropdown
                  type={type}
                  list={alerts[type]}
                  key={type}
                  setOverlay={setOverlay}
                  openDialogBox={openDialogBox}
                  deletedAlertKey={deletedAlertKey}
                />
              ))}
          </div>
        </div>
      </article>
    </AlertsContext.Provider>
  );
}

export default Alerts;
