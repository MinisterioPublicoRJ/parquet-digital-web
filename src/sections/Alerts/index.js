import React from 'react';

import './styles.css';
import Api from '../../api';
import { getUser } from '../../user';
import { SectionTitle, AlertBadge } from '../../components';
import { cleanAlertList } from './alertFormatters';

class Alerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.loadComponent();
  }

  /**
   * Fetches array of alerts from API and saves to state
   * @return {void} saves to state
   */
  // async getAlertsList() {
  //   let alerts;
  //   let errorAlerts = false;
  //   try {
  //     alerts = await Api.getAlertsList(getUser());
  //   } catch (e) {
  //     errorAlerts = true;
  //   } finally {
  //     this.setState({ alerts, errorAlerts, loading: false });
  //   }
  // }

  async loadAlerts() {
    let alertList;
    let listError = false;
    try {
      alertList = await Api.getAlertsList(getUser());
    } catch (e) {
      listError = true;
    }
    return [alertList, listError];
  }

  async loadAlertCount() {
    let alertsTotal;
    let errorAlertsTotal = false;
    try {
      alertsTotal = await Api.getAlertsCount(getUser());
    } catch (e) {
      errorAlertsTotal = true;
    }
    return [alertsTotal, errorAlertsTotal];
  }

  async loadComponent() {
    const [alertList, errorAlerts] = await this.loadAlerts();
    const [alertsCount, errorAlertsCount] = await this.loadAlertCount();

    const cleanList = cleanAlertList(alertList, alertsCount);
    const apiError = errorAlerts || errorAlertsCount;

    this.setState({ alerts: cleanList, errorAlerts: apiError, loading: false });
  }

  render() {
    const { alerts, loading, errorAlerts } = this.state;

    if (loading) return <aside>Carregando...</aside>;
    return (
      <article className="alerts-wrapper">
        <div className="alerts-header">
          <SectionTitle value="central de alertas" />
          <div className="alerts-total">
            <span>{alerts.length}</span>
          </div>
        </div>
        <div className="alerts-body">
          {alerts.map(alert => {
            const { icon, message, action, actionLink, background, key } = alert;
            return (
              <AlertBadge
                key={key}
                icon={icon}
                iconBg={background}
                message={message}
                action={action}
                actionLink={actionLink}
                loading={errorAlerts}
              />
            );
          })}
        </div>
      </article>
    );
  }
}

export default Alerts;
