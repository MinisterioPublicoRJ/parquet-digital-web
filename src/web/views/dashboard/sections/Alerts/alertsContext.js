import { createContext, useContext, useState } from 'react';

export const AlertsContext = createContext();

export const useAlertsContext = () => {
  return useContext(AlertsContext);
};

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
