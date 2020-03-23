import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import Api from '../../api';
import { getUser } from '../../user';
import { SectionTitle, AlertBadge } from '../../components';

class Alerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.getAlertsList();
  }

  async getAlertsList() {
    console.log('getAlertsList');
    const res = await Api.getAlertsList(getUser());
    console.log("ALERTS", res);
    this.setState({ alerts: res, isLoading: false });
  }

  // async updateAlertsList() {
  //
  // }

  render() {
    const { alerts, isLoading } = this.state;

    if (isLoading) return <aside>...</aside>;

    return (
      <aside className="alertsWrapper">
        <div className="alertsHeader">
          <SectionTitle value="central de alertas" />
        </div>
        <div className="alertsBody">
          {alerts.map(alert => (
            <AlertBadge
              type={alert.type}
              message={alert.message}
              action={alert.actionCaption}
              actionLink={alert.link}
            />
          ))}
        </div>
      </aside>
    );
  }
}

export default Alerts;
