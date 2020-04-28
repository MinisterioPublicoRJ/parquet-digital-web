import React from 'react';

import './styles.css';
import Api from '../../api';
import { getUser } from '../../user';
import { SectionTitle, AlertBadge } from '../../components';

import ClockIcon from '../../assets/svg/clock';
import CorujaGate from '../../assets/svg/corujaGate';
import Law from '../../assets/svg/law';
import Home from '../../assets/svg/home';
import MPRJ from '../../assets/svg/mprj';
import TJRJ from '../../assets/svg/tjrj';
import OUVIDORIA from '../../assets/svg/ouvidoria';


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
        message = <span>Há 01 procedimento preparatório com prazo próximo de vencer<strong className="featuredMessage"> {alert.docNum} converter em inquerito policial -></strong></span>;
        background = '#f86c72';
        break;

      case 'NF30':
        icon = <ClockIcon />;
        message = <span>Há 01 <strong> noticia de fato </strong>autuada há mais de <strong>120 dias</strong> e ainda está <strong>sem tratamento</strong></span>;
        background = '#f86c72';
        break;

      case 'OFFP':
        icon = <ClockIcon />;
        message = <span>Há 01 <strong> oficio </strong>com  <strong> prazo de apreciação esgotado </strong></span>;
        background = '#f86c72';
        break;

      case 'IC1A':
        icon = <ClockIcon />;
        message = <span>Há 01 <strong> inquérito civil </strong> ativo <strong> sem prorrogação </strong> há <strong>mais de 1 ano</strong></span>;
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
        icon = <TJRJ />;
        message = <span>O procedimento <strong>{alert.docNum}</strong> completará <strong>{alert.daysPassed}</strong> ano! <stron className="featuredMessage">{alert.docNum} realizar uma prorogação</stron></span>;
        background = '#f86c72';
        break;

      case 'VADF':
        icon = <Home />;
        message = <span><strong>10 Movimentações</strong> em processo desta promotoria na segunda instância</span>;
        background = '#5C6FD9';
        break;

      case 'DCTJ':
        icon = <MPRJ />;
        message = <span>Há <strong>01 processo </strong>cujo <strong>orgão responsável</strong> está possivelmente <strong>desatualizado</strong></span>;
        background = '#374354';
        break;

      case 'VADF':
        icon = <OUVIDORIA />;
        message = <span>O procedimento <strong>{alert.docNum}</strong> completará <strong>{alert.daysPassed}</strong> ano! <stron className="featuredMessage">{alert.docNum} realizar uma prorogação</stron></span>;
        background = '#5C6FD9';
        break;

      case 'DCTJ':
        icon = <TJRJ />;
        message = <span>O procedimento <strong>{alert.docNum}</strong> completará <strong>{alert.daysPassed}</strong> ano! <stron className="featuredMessage">{alert.docNum} realizar uma prorogação</stron></span>;
        background = '#5C6FD9';
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
