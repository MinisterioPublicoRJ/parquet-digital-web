import { createContext, useContext, useState } from 'react';
import Api from '../../../../api';

export const AlertsContext = createContext();

export const useAlertsContext = () => useContext(AlertsContext);


export const AlertsContextCreator = () => {
  // const { buildRequestParams } = useAuth();
  const [alerts, setAlerts] = useState(undefined);
  const [alertCount, setAlertCount] = useState(undefined);
  const [alertsError, setAlertsError] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayType, setOverlayType] = useState(null);
  const [docDk, setDocDk] = useState(null);

  const [modalContent, setModalContent] = useState(null);
  const [deletedAlertKey, setDeletedAlertKey] = useState(null);

  function handleAlertAction(alertKey, undo) {
    if (undo) {
      restoreAlert(alertKey);
    } else {
      const alert = alerts.filter(({ key }) => key === alertKey)[0];

      if (alert.isDeleted) {
        removeAlert(alertKey, undo);
      } else {
        dismissAlert(alertKey);
      }
    }
  }

  function dismissAlert(alertKey) {
    const newList = alerts.map((alert) => {
      if (alert.key === alertKey) {
        return { ...alert, isDeleted: true };
      }
      return alert;
    });
    setAlerts(newList);
    setVisibleAlerts((prevValue) => newList.slice(0, prevValue.length));
    Api.removeAlert({ ...buildRequestParams(), alertId: alertKey });
  }

  function restoreAlert(alertKey) {
    const newList = alerts.map((alert) => {
      if (alert.key === alertKey) {
        return { ...alert, isDeleted: false };
      }
      return alert;
    });
    setAlerts(newList);
    setVisibleAlerts((prevValue) => newList.slice(0, prevValue.length));
    Api.undoRemoveAlert({ ...buildRequestParams(), alertId: alertKey });
  }

  function removeAlert(alertKey) {
    if (!alertKey) return;
    const newList = alerts.filter(({ key }) => key !== alertKey);
    setAlerts(newList);
    setVisibleAlerts((prevValue) => newList.slice(0, prevValue.length));
  }

  return {
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
  };
};

export default AlertsContext;
