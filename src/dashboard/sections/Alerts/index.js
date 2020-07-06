import React, { useState, useEffect } from 'react';

import './styles.css';
import { useAuth } from '../../../app/authContext';

import Api from '../../../api';
import { getUser } from '../../../user';
import AlertBadge from './AlertBadge';
import { SectionTitle, Spinner } from '../../../components';
import { cleanAlertList } from './alertFormatters';

// class AlertsOld extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { loading: true };
//   }
//
//   componentDidMount() {
//     this.loadComponent();
//   }
//
//   async loadComponent() {
//     const [alertList, errorAlerts] = await this.loadAlerts();
//     const [alertsCount, errorAlertsCount] = await this.loadAlertCount();
//
//     const alerts = cleanAlertList(alertList, alertsCount);
//     const error = errorAlerts || errorAlertsCount;
//
//     this.setState({ alerts, loading: false, error });
//   }
//
//   /**
//    * Fetches array of alerts from API and saves to state
//    * @return {void} saves to state
//    */
//   async loadAlerts() {
//     let alerts;
//     let errorAlerts = false;
//     try {
//       alerts = await Api.getAlerts(getUser());
//     } catch (e) {
//       errorAlerts = true;
//     }
//     return [alerts, errorAlerts];
//   }
//
//   async loadAlertCount() {
//     let alertsTotal;
//     let errorAlertsTotal = false;
//     try {
//       alertsTotal = await Api.getAlertsCount(getUser());
//     } catch (e) {
//       errorAlertsTotal = true;
//     }
//     return [alertsTotal, errorAlertsTotal];
//   }
//
//   render() {
//     const { alerts, error, loading } = this.state;
//     // const loading = !(alerts || errorAlerts) || !(alertsTotal || errorAlertsTotal);
//
//     if (loading) {
//       return (
//         <article className="alerts-wrapper">
//           <Spinner size="large" />
//         </article>
//       );
//     }
//
//     if (error) {
//       return <article className="alerts-wrapper">Não existem alertas para exibir.</article>;
//     }
//
//     return (
//       <article className="alerts-wrapper">
//         <div className="alerts-header">
//           <SectionTitle value="central de alertas" />
//           <div className="alerts-total">{/* <span>{alertsTotal.length}</span> */}</div>
//         </div>
//         <div className="alerts-body">
//           {alerts.map((alert, i) => {
//             const { icon, message, action, actionLink, background } = alert;
//             return (
//               <AlertBadge
//                 key={alert.docNum + alert.date + i}
//                 icon={icon}
//                 iconBg={background}
//                 message={message}
//                 action={action}
//                 actionLink={actionLink}
//               />
//             );
//           })}
//         </div>
//       </article>
//     );
//   }
// }

function Alerts() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState(undefined);
  const [alertsError, setAlertsError] = useState(false);
  const loading = !alerts && !alertsError;

  async function loadAlerts() {
    let alertList;
    let listError = false;
    try {
      alertList = await Api.getAlerts(user);
    } catch (e) {
      listError = true;
    }
    return [alertList, listError];
  }

  async function loadAlertCount() {
    let alertsTotal;
    let errorAlertsTotal = false;
    try {
      alertsTotal = await Api.getAlertsCount(user);
    } catch (e) {
      errorAlertsTotal = true;
    }
    return [alertsTotal, errorAlertsTotal];
  }

  async function loadComponent() {
    const [alertList, errorAlerts] = await loadAlerts();
    const [alertsCount, errorAlertsCount] = await loadAlertCount();

    const cleanList = cleanAlertList(alertList, alertsCount);
    const apiError = errorAlerts || errorAlertsCount;

    setAlerts(cleanList);
    setAlertsError(apiError);
  }

  // runs on "mount" only
  useEffect(loadComponent, []);

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
        <div className="alerts-total">
          <span>{alertsError ? 0 : alerts.length}</span>
        </div>
      </div>
      <div className="alerts-body">
        {alertsError && 'Não existem alertas para exibir.'}
        {alerts &&
          alerts.map((alert, i) => {
            const { icon, message, action, actionLink, background } = alert;
            return (
              <AlertBadge
                key={alert.docNum + alert.date + i}
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
