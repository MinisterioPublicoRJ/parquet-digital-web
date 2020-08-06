import React, { useState, useEffect } from 'react';

import './styles.css';
import { useAuth } from '../../../app/authContext';

import Api from '../../../api';
import AlertBadge from './AlertBadge';
import { SectionTitle, Spinner } from '../../../components';
import { cleanAlertList } from './alertFormatters';

function Alerts() {
  const { buildRequestParams } = useAuth();
  const [alerts, setAlerts] = useState(undefined);
  const [alertsError, setAlertsError] = useState(false);
  const loading = !alerts && !alertsError;

  async function loadAlerts() {
    let alertList;
    let listError = false;
    try {
      alertList = await Api.getAlerts(buildRequestParams());
    } catch (e) {
      listError = true;
    }
    return [alertList, listError];
  }

  async function loadAlertCount() {
    let alertsTotal;
    let errorAlertsTotal = false;
    try {
      alertsTotal = await Api.getAlertsCount(buildRequestParams());
    } catch (e) {
      errorAlertsTotal = true;
    }
    return [alertsTotal, errorAlertsTotal];
  }

  async function loadComponent() {
    const [alertList, errorAlerts] = await loadAlerts();
    const [alertsCount, errorAlertsCount] = await loadAlertCount();

    const apiError = errorAlerts || errorAlertsCount;
    const cleanList = !apiError ? cleanAlertList(alertList, alertsCount) : [];

    setAlerts(cleanList);
    setAlertsError(apiError);
  }

  // runs on "mount" only
  useEffect(() => {
    loadComponent();
  }, []);

  if (loading) {
    return (
      <article className="alerts-wrapper">
        <Spinner size="large" />
      </article>
    );
  }

  return (
    <article className="alerts-wrapper">
      <div className="alerts-header">
        <SectionTitle value="central de alertas" glueToTop />
        <span className="alerts-total">{alertsError ? 0 : alerts.length}</span>
      </div>
      <div className="alerts-body">
        {alertsError && 'Não existem alertas para exibir.'}
        {alerts &&
          alerts.map(alert => {
            const { icon, message, action, actionLink, background, key } = alert;
            return (
              <AlertBadge
                key={key}
                icon={icon}
                iconBg={background}
                message={message}
                action={action}
                actionLink={actionLink}
              />
            );
          })}
      </div>
    </article>
  );
}

export default Alerts;
