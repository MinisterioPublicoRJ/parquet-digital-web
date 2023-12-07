import { createContext, useContext, useState } from 'react';
// import Api from '../../../../../core/api/Api';

export const AlertsContext = createContext();

export const useAlertsContext = () => useContext(AlertsContext);


export const AlertsContextCreator = (buildRequestParams, Api) => {
  // const { buildRequestParams } = useAuth();
  // const { buildRequestParams } = useAppContext();

  const [alerts, setAlerts] = useState(undefined);
  const [alertCount, setAlertCount] = useState(undefined);
  const [alertsError, setAlertsError] = useState(false);

  function handleAlertAction(type, alertKey, undo) {
    if (undo) {
      restoreAlert(type, alertKey);
    } else {
      const alert = alerts[type].filter(({ key }) => key === alertKey)[0];

      if (alert.isDeleted) {
        removeAlert(type, alertKey);
      } else {
        dismissAlert(type, alertKey);
      }
    }
  }

  function dismissAlert(type, alertKey) {
    const newList = alerts[type].map((alert) => {
      if (alert.key === alertKey) {
        return { ...alert, isDeleted: true };
      }
      return alert;
    });

    setAlerts((prevValue) => ({ ...prevValue, [type]: newList }));

    Api.removeAlert({ ...buildRequestParams(), alertId: alertKey, alertType: type });

    return newList;
  }

  function restoreAlert(type, alertKey) {
    const newList = alerts[type].map((alert) => {
      if (alert.key === alertKey) {
        return { ...alert, isDeleted: false };
      }
      return alert;
    });
    setAlerts((prevValue) => ({ ...prevValue, [type]: newList }));

    Api.undoRemoveAlert({ ...buildRequestParams(), alertId: alertKey });

    return newList;
  }

  function removeAlert(type, alertKey) {
    if (!alertKey) return null;
    const newList = alerts[type].filter(({ key }) => key !== alertKey);
    setAlerts(prevValue => ({ ...prevValue, [type]: newList }));
    setAlertCount(prevValue => prevValue - 1);
    return newList;
  }

  return {
    alerts,
    setAlerts,
    alertCount,
    setAlertCount,
    alertsError,
    setAlertsError,
    removeAlert,
    handleAlertAction
  };
};

export default AlertsContext;
