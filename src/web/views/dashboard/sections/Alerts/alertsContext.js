import { createContext, useContext, useState } from 'react';
import Api from '../../../../api';

export const AlertsContext = createContext();

export const useAlertsContext = () => useContext(AlertsContext);


export const AlertsContextCreator = (buildRequestParams) => {
  // const { buildRequestParams } = useAuth();
  // const { buildRequestParams } = useAppContext();
  console.log('CREATING ALERTS CONTEXT');

  const [alerts, setAlerts] = useState(undefined);
  const [alertCount, setAlertCount] = useState(undefined);
  const [alertsError, setAlertsError] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayType, setOverlayType] = useState(null);
  const [docDk, setDocDk] = useState(null);

  console.log('alerts:', alerts);

  const [deletedAlertKey, setDeletedAlertKey] = useState(null);

  function handleAlertAction(type, alertKey, undo, setVisibleAlerts) {
    if (undo) {
      restoreAlert(type, alertKey, setVisibleAlerts);
    } else {
      console.log('alerts:', alerts);
      const alert = alerts[type].filter(({ key }) => key === alertKey)[0];

      if (alert.isDeleted) {
        removeAlert(type, alertKey,setVisibleAlerts);
      } else {
        dismissAlert(type, alertKey, setVisibleAlerts);
      }
    }
  }

  function dismissAlert(type, alertKey, setVisibleAlerts) {
    const newList = alerts[type].map((alert) => {
      if (alert.key === alertKey) {
        return { ...alert, isDeleted: true };
      }
      return alert;
    });
    console.log('dismissing');
    setAlerts((prevValue) => ({...prevValue, [type]: newList}));
    setVisibleAlerts((prevValue) => newList.slice(0, prevValue.length));
    Api.removeAlert({ ...buildRequestParams(), alertId: alertKey });
    return newList;
  }

  function restoreAlert(type, alertKey, setVisibleAlerts) {
    const newList = alerts[type].map((alert) => {
      if (alert.key === alertKey) {
        return { ...alert, isDeleted: false };
      }
      return alert;
    });
    setAlerts((prevValue) => ({...prevValue, [type]: newList}));
    setVisibleAlerts((prevValue) => newList.slice(0, prevValue.length));
    Api.undoRemoveAlert({ ...buildRequestParams(), alertId: alertKey });
    return newList;
  }

  function removeAlert(type, alertKey, setVisibleAlerts) {
    console.log('removing alert');
    if (!alertKey) return null;
    const newList = alerts[type].filter(({ key }) => key !== alertKey);
    setAlerts(prevValue =>( {...prevValue, [type]:newList}));
    setVisibleAlerts((prevValue) => newList.slice(0, prevValue.length));
    return newList;
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
    deletedAlertKey,
    setDeletedAlertKey,
    removeAlert,
    handleAlertAction
  };
};

export default AlertsContext;
