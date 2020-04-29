import React from 'react';

import './styles.css';
import Api from '../../api';
import { getUser } from '../../user';
import { SectionTitle, AlertBadge } from '../../components';

import ClockIcon from '../../assets/svg/clock';
import CorujaGate from '../../assets/svg/corujaGate';
import Law from '../../assets/svg/law';
import Home from '../../assets/svg/home';
import Mprj from '../../assets/svg/mprj';
import Ouvidoria from '../../assets/svg/ouvidoria';
import Va from '../../assets/svg/va';
import Tjrj from '../../assets/svg/tjrj';
import Csi from '../../assets/svg/csi';

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
    console.log(res.length);
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
        message = <span>Há 01 <strong>procedimento preparatório</strong> com prazo próximo de vencer </span>;
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

      case 'GATE':
        icon = <CorujaGate />;
        message = <span>O <strong>Gate </strong>finalizou a <strong>IT</strong> solicitada no procedimento <strong>{alert.docNum}</strong></span>;
        background = '#374354';
        break;

      case 'CSI':
        icon = <Csi />;
        message = <span>A <strong> CSI </strong> finalizou a <strong>IT</strong> solicitada no procedimento <strong>{alert.docNum}</strong></span>;
        background = '#192440';
        break;

      case 'DECISAO':
        icon = <Law />;
        message = <span>Você obteve uma <strong className="positiveDecision"> decisão favorável </strong> no processo <strong>{alert.docNum}</strong></span>;
        background = '#71D0A4';
        break;

      case 'DECISAO':
        icon = <Law />;
        message = <span>Você obteve uma <strong className="negativeDecision"> decisão desfavorável </strong> no processo <strong>{alert.docNum}</strong></span>;
        background = '#F86C72';
        break;

      case 'VADF':
        icon = <Va />;
        message = <span>Você tem <strong>10 vistas abertas</strong> em <strong>documentos sinalizados como fechado</strong></span>;
        background = '#28A7E0';
        break;

      case 'VADF':
        icon = <Home />;
        message = <span><strong>10 Movimentações</strong> em processo desta promotoria na segunda instância</span>;
        background = '#5C6FD9';
        break;

      case 'DCTJ':
        icon = <Tjrj />;
        message = <span>Há <strong>10 processos criminais</strong>no TJRJ há <strong>mais de 60 dias</strong> sem retorno</span>;
        background = '#F86C72';
        break;

      case 'DNTJ':
        icon = <Tjrj />;
        message = <span>Há <strong>20 processos não criminais</strong>no TJRJ há <strong>mais de 120 dias</strong> sem retorno</span>;
        background = '#F86C72';
        break;

      case 'MVVD':
        icon = <Ouvidoria />;
        message = <span>Há <strong>10 processos</strong> com <strong>vitimas recorrentes</strong> de <spa>violência domestica</spa></span>;
        background = '#F86C72';
        break;

      case 'DORD':
        icon = <Mprj />;
        message = <span>Há <strong>01 processo</strong> cujo <strong>orgão responsável</strong> está possivelmente<strong> desatualizado</strong></span>;
        background = '#5C6FD9';
        break;

      case 'OUVI':
        icon = <Ouvidoria />;
        message = <span>Há <strong>01 expediente</strong> de ouvidoria enviado porém<strong> não recebido</strong></span>;
        background = '#5C6FD9';
        break;

      case 'OUVI':
        icon = <ClockIcon />;
        message = <span>Há <strong>01 processo</strong> cujo <strong>orgão responsável</strong> está possivelmente<strong> desatualizado</strong></span>;
        background = '#5C6FD9';
        break;

      case 'DT2I':
        icon = <Home />;
        message = <span>Há <strong>01 processo</strong> cujo <strong>orgão responsável</strong> está possivelmente<strong> desatualizado</strong></span>;
        background = '#5C6FD9';
        break;

      case 'PA1A':
        icon = <ClockIcon />;
        message = <span>Há <strong>05 processos administrativos</strong> abertos <strong>há mais de 1 ano</strong></span>;
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
            <span>{alerts.length}</span>
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
