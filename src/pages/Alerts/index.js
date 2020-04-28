import React from 'react';

import './styles.css';
import Api from '../../api';
import { getUser } from '../../user';
import { SectionTitle, AlertBadge } from '../../components';

import ClockIcon from '../../assets/svg/clock';
import CorujaGate from '../../assets/svg/corujaGate';
import Law from '../../assets/svg/law';

class Alerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    this.getAlertsList();
  }

  async getAlertsList() {
    const res = await Api.getAlertsList(getUser());
    console.log(res);
    this.setState({ alerts: res, isLoading: false });
  }

  cleanAlert(alert) {
    // this will be completed for all alert types later
    let icon = null;
    let message = null;
    const action = null;
    const actionLink = null;
    let background = null;

    switch (alert.alertCode) {
      case 'PPFP':
        icon = <ClockIcon />;
        message =  <span>Há 01 procedimento preparatório com prazo próximo de vencer<strong className="featuredMessage"> {alert.docNum} converter em inquerito policial -></strong></span>;
        background = '#f86c72';
        break;
        
      case 'DCTJ':
        icon = <CorujaGate />;
        message = <span>O <strong>Gate </strong>finalizou a <strong>IT</strong> solicitada no procedimento <strong>{alert.docNum}</strong></span>;
        background = '#374354';
        break;

      case 'IC1A':
        icon = <Law />;
        message = <span>Você obteve uma <strong className="featuredMessageDecision">decisão favorável</strong> no processo <strong>{alert.docDk}</strong></span>;
        background = '#71D0A4';
        break;

      case 'VADF':
        icon = <ClockIcon />;
        message = <span>O procedimento <strong>{alert.docNum}</strong> completará <strong>{alert.daysPassed}</strong> ano! <stron className="featuredMessage">{alert.docNum} realizar uma prorogação</stron></span>;
        background = '#f86c72';
        break;
    }

    return { icon, message, action, actionLink, background };
  }

  render() {
    const { alerts, isLoading } = this.state;

    if (isLoading) return <aside>...</aside>;
    return (
      <aside className="alertsWrapper">
        <div className="alertsHeader">
          <SectionTitle value="central de alertas" />
          <div className="totalAlerts">
            <span>25</span>
          </div>
        </div>
        <div className="alertsBody">
          {alerts.map((alert, i) => {
            const { icon, message, action, actionLink, background } = this.cleanAlert(alert);
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
      </aside>
    );
  }
}

export default Alerts;
