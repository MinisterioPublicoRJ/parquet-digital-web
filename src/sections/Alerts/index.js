import React from 'react';

import './styles.css';
import Api from '../../api';
import { getUser } from '../../user';
import { SectionTitle, AlertBadge } from '../../components';

import ClockIcon from '../../assets/svg/clock';
import CorujaGate from '../../assets/svg/corujaGate';
import Home from '../../assets/svg/home';
import Ouvidoria from '../../assets/svg/ouvidoria';
import Va from '../../assets/svg/va';
import Tjrj from '../../assets/svg/tjrj';
import Law from '../../assets/svg/law';
import Mprj from '../../assets/svg/mprj';
import Csi from '../../assets/svg/csi';


class Alerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.getAlertsList();
    this.getAlertsListInfo();
  }

  /**
   * Fetches array of alerts from API and saves to state
   * @return {void} saves to state
   */
  async getAlertsList() {
    let alerts;
    let errorAlerts = false;
    try {
      alerts = await Api.getAlertsList(getUser());
      console.log(alerts);
    } catch (e) {
      errorAlerts = true;
    } finally {
      this.setState({ alerts, errorAlerts, loading: false });
    }
  }

  async getAlertsListInfo() {
    let alertsInfo;
    let errorAlerts = false;
    try {
      alertsInfo = await Api.getAlertsListInfo(getUser());
      console.log(alertsInfo);
    } catch (e) {
      errorAlerts = true;
    } finally {
      this.setState({ alertsInfo, errorAlerts, loading: false });
    }
  }

  cleanAlertInfo(alertsInfo) {
    let text = null;

   
  }

  /**
   * Finds the details for each alert type
   * @param  {json} alert {alertCode}
   * @return {json}       { icon: node, message: node, action: null, actionLink: null, background: string }
   */
  cleanAlert(alert) {
    // this will be completed for all alert types later
    let icon = null;
    let message = null;
    const action = null;
    const actionLink = null;
    let background = null;

    switch (alert.alertCode) {
      // ALERTAS DA TUTELA
      case 'DCTJ':
        icon = <Tjrj />;
        message = (
          <span>
            O  processo <strong>{alert.docNum}</strong> criminal está há mais de <strong>{alert.daysPassed}</strong> dias sem retorno.
          </span>
        );
        background = '#F86C72';
        break;

      case 'DNTJ':
        icon = <Tjrj />;
        message = (
          <span>
            O processo <strong>{alert.docNum}</strong> não criminal está há mais de <strong>{alert.daysPassed}</strong> sem retorno.
          </span>
        );
        background = '#F86C72';
        break;

      case 'DT2I':
        icon = <Home />;
        message = (
          <span>
            <strong>{alert.docNum.length} movimentações </strong> em processo desta promotoria na <strong>segunda instância</strong>
          </span>
        );
        background = '#5C6FD9';
        break;

      case 'MVVD':
        icon = <Ouvidoria />;
        message = (
          <span>
            <strong> {alert.docNum.length}</strong> processos com <strong>vitimas recorrentes</strong> de violência domestica.
          </span>
        );
        background = '#F86C72';
        break;

      case 'PA1A':
        icon = <ClockIcon />;
        message = (
          <span>
            Há <strong> {alert.docNum.length}</strong> processos administrativos abertos há mais de um ano.
          </span>
        );
        background = '#5C6FD9';
        break;

      case 'PPFP':
        icon = <ClockIcon />;
        message = (
          <span>
            Há <strong>{alert.docNum.length} procedimento preparatório</strong> com <strong>prazo de tratamento esgotado</strong>.
          </span>
        );
        background = '#f86c72';
        break;

      case 'IC1A':
        icon = <ClockIcon />;
        message = (
          <span>
            O inquérito civil ativo <strong>{alert.docNum}</strong> <strong> está sem prorrogação </strong> há <strong>mais de 1 ano</strong>.
          </span>
        );
        background = '#f86c72';
        break;

      case 'NF30':
        icon = <ClockIcon />;
        message = (
          <span>
            Há <strong>{alert.docNum.length}</strong> <strong>notícia de fato</strong> autuada há mais de <strong>{alert.daysPassed}</strong> dias e ainda <strong>sem tratamento</strong>.
          </span>
        );
        background = '#f86c72';
        break;

      case 'OFFP':
        icon = <ClockIcon />;
        message = (
          <span>
            Há <strong>{alert.docNum.length}</strong> <strong>oficio</strong> com prazo de apreciação esgotado.
          </span>
        );
        background = '#f86c72';
        break;

      case 'OUVI':
        icon = <Ouvidoria />;
        message = (
          <span>
            <strong>{alert.docNum.length}</strong> <strong>expediente</strong> de ouvidoria enviado porém <strong>não recebido</strong>.
          </span>
        );
        background = '#5C6FD9';
        break;

      case 'VADF':
        icon = <Va />;
        message = (
          <span>
            Você tem <strong>{alert.docNum.length}</strong> vistas abertas<strong> em documentos sinalizados como fechado</strong>
          </span>
        );
        background = '#28A7E0';
        break;

      case 'DORD':
        icon = <Mprj />;
        message = (
          <span>
            Há um processo <strong> {alert.docNum}</strong> cujo orgão responsável está possivelmente<strong> desatualizado</strong>.
          </span>
        );
        background = '#5C6FD9';
        break;

      // ALERTAS DA PIP
      case 'GATE':
        icon = <CorujaGate />;
        message = (
          <span>
            O <strong>Gate </strong>finalizou a <strong>IT</strong> solicitada no procedimento <strong>{alert.docNum}</strong>
          </span>
        );
        background = '#374354';
        break;

      case 'CSI':
        icon = <Csi />;
        message = (
          <span>
            A <strong> CSI </strong> finalizou a <strong>IT</strong> solicitada no procedimento <strong>{alert.docNum}</strong>
          </span>
        );
        background = '#192440';
        break;

      // case 'DECISAO':
      //  icon = <Law />;
      //  message = (
      //   <span>
      //     Você obteve uma <strong className="positiveDecision"> decisão favorável </strong> no
      //      processo
      //      <strong>{alert.docNum}</strong>
      //    </span>
      //  );
      //  background = '#71D0A4';
      //  break;

      // case 'DECISAO':
      // icon = <Law />;
      // message = (
      //  <span>
      //   Você obteve uma <strong className="negativeDecision"> decisão desfavorável </strong> no
      //   processo
      //   <strong>{alert.docNum}</strong>
      // </span>
      //  );
      //  background = '#F86C72';
      //  break;
      default:
        break;
    }

    return { icon, message, action, actionLink, background };
  }

  render() {
    const { alerts, alertsInfo, loading, errorAlerts } = this.state;

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
