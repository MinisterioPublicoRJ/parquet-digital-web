/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ListCard } from 'mapasteca-web';

import './styles.css';
import { useAppContext } from '../../../../core/app/App.context';
import Api from '../../../api';
import Spinner from '../Spinner';
import { ProcessDetailRobot, User, Copy, ProcessFile } from '../../../assets';
import AlertBadge from '../../../views/dashboard/sections/Alerts/AlertBadge';
import individualAlertFormatter from '../../../views/dashboard/sections/Alerts/utils/individualAlertFormatter';

const propTypes = {
  close: PropTypes.func.isRequired,
  docuNrMp: PropTypes.string,
  docuNrExterno: PropTypes.string,
};

const defaultProps = {
  docuNrMp: '-',
  docuNrExterno: '-',
}

function ProcessDetail({ docuNrMp, docuNrExterno, close }) {
  const [processData, setProcessData] = useState(null);
  // const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { buildRequestParams } = useAppContext();
  const { cpf, token, orgao } = buildRequestParams();
  const [isAlertsVisible, setIsAlertsVisible] = useState(false);

  useEffect(() => {
    getProcessData();
  }, []);

  async function getProcessData() {
    setLoading(true);
    setProcessData(null);
    try {
      const data = await Api.getProcessDetail({ ...buildRequestParams(), num_doc: docuNrMp });
      setProcessData(data);
    } catch (error) {
      // setApiError(true);
    } finally {
      setLoading(false);
    }
  }

  function renderComponentBody() {
    if (loading) {
      return (
        <div className="processDetail-body processDetail-loadingOrError">
          <Spinner size="large" />
        </div>
      );
    }
    if (processData) {
      const { situation, phase, currentOwner, loader, secrecy, docClass, matter } =
        processData.identification;
      return (
        <div className="processDetail-body processDetail-loadedData">
          <button
            type="button"
            className="process-alerts-btn"
            onClick={() => setIsAlertsVisible((prevValue) => !prevValue)}
          >
            Este procedimento possui {processData.alerts.length} alerta
            {processData.alerts.length === 1 ? '' : 's'}
            <div
              className={`process-alerts-arrow ${
                isAlertsVisible ? 'process-alerts-arrow--rotated' : ''
              }`}
            />
          </button>

          <div
            className={`process-alerts-list ${isAlertsVisible ? 'process-alerts-list--visible' : ''
              }`}
          >
            {processData.alerts.map((alert) => {
              const formattedAlert = individualAlertFormatter(
                { docNum: docuNrMp, ...alert },
                cpf,
                token,
                orgao,
              );
              const { backgroundColor, backgroundColorChild, icon, key, message, type } =
                formattedAlert;
              return (
                <AlertBadge
                  key={key}
                  customKey={key}
                  icon={icon}
                  backgroundColor={backgroundColorChild || backgroundColor}
                  message={message}
                  docDk={docuNrMp}
                  overlayType={type}
                  /* Passes empty actions to hide actions */
                  actions={[]}
                />
              );
            })}
          </div>

          <h3>PERSONAGENS</h3>
          <div className="processDetail-section">
            {processData.characters.map(({ name, role }) => (
              <div className="processDetail-ListCardWrapper">
                <ListCard
                  fixedHeight
                  title={name}
                  content={<span>{role}</span>}
                  fillColor="#F8F9FB"
                  detailColor="#C5C6C8"
                  icon={<User width={46} height={46} />}
                />
              </div>
            ))}
          </div>
          <h3>ASSUNTOS</h3>
          <div className="processDetail-section">
            {/* eslint-disable-next-line no-shadow */}
            {processData.matters.map(({ matter, detail }) => (
              <div className="processDetail-ListCardWrapper" key={`${matter}-${detail}`}>
                <ListCard
                  fixedHeight
                  title={matter}
                  content={
                    <span className="ListCard-content" title={detail}>
                      <abbr>{detail}</abbr>
                    </span>
                  }
                  detailColor="#F86C72"
                  icon={<ProcessFile width={40} height={40} />}
                />
              </div>
            ))}
          </div>
          <h3>IDENTIFICAÇÃO</h3>
          <div className="processDetail-idSection">
            <div>
              <div>
                <strong>Número Externo</strong>
                {docuNrExterno}
              </div>
              <div>
                <strong>Situação</strong>
                {situation}
              </div>
              <div>
                <strong>Fase</strong>
                {phase}
              </div>
            </div>
            <div>
              <div>
                <strong>Órgão Responsável</strong>
                {currentOwner}
              </div>
              <div>
                <strong>Órgão de carga</strong>
                {loader}
              </div>
              <div>
                <strong>Sigilo</strong>
                {secrecy}
              </div>
            </div>
            <div>
              <div>
                <strong>Classe</strong>
                {docClass}
              </div>
              <div>
                <strong>Atribuição</strong>
                {matter}
              </div>
            </div>
          </div>
          <h3>ÚLTIMOS ANDAMENTOS</h3>
          <div className="processDetail-proceedings">
            {processData.proceedings.map(({ date, person, motion, motionDetails }) => (
              <div key={`${person}-${date}`}>
                <div>{date}</div>
                <div>
                  <strong>{person}</strong>
                  {motion}
                  <br />
                  {motionDetails}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="processDetail-body processDetail-loadingOrError">
        <h3>Falha na conexão, tente novamente mais tarde.</h3>
      </div>
    );
  }

  return (
    <article className="process-detail-outer">
      <div className="process-detail-header">
        <div className="processDetail-headerLeft">
          <h2>Detalhes do Procedimento</h2>
          Informações de relevância sobre o procedimento.
          <div>
            <span>{`Nº MPRJ: ${ docuNrMp }`}</span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(docuNrMp);
              }}
            >
              <Copy height="80%" />
            </button>
          </div>
        </div>
        <div className="processDetail-headerRight">
          <ProcessDetailRobot height="120%" />
        </div>
      </div>
      {renderComponentBody()}
      <div className="modal-close">
        <button type="button" className="close" aria-label="Fechar" onClick={close}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </article>
  );
}

ProcessDetail.propTypes = propTypes;
ProcessDetail.defaultProps = defaultProps;
export default ProcessDetail;
