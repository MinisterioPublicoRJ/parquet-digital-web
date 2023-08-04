/* eslint-disable no-shadow */
// eslint-disable import/no-cycle
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ListCard from '../ListCard/ListCard';

import {
  processDetailOuter,
  processDetailHeader,
  processAlertsListEmpty,
  processDetailHeaderLeft,
  processDetailBody,
  processDetailLoadingOrError,
  processDetailLoadedData,
  processDetailSection,
  processDetailListCardWrapper,
  listCardContent,
  processDetailIdSection,
  processDetailProceedings,
  processAlertsList,
  processDetailHeaderRight,
  alertWrapper,
  spanProcessAlertsList,
  alertWrapperTextEmpty,
} from './styles.module.css';
import { useAppContext } from '../../../../core/app/App.context';
import { useAlertsContext } from '../../../views/dashboard/sections/Alerts/alertsContext';
import Api from '../../../api';
import Spinner from '../Spinner';
import { ProcessDetailRobot, User, Copy, ProcessFile } from '../../../assets';

import AlertBadge from '../../../views/dashboard/sections/Alerts/AlertBadge';
import AlertsOverlay from '../../../views/dashboard/sections/Alerts/AlertsOverlay';
import individualAlertFormatter from '../../../views/dashboard/sections/Alerts/utils/individualAlertFormatter';

const propTypes = {
  docuNrMp: PropTypes.string,
  docuNrExterno: PropTypes.string,
};

const defaultProps = {
  docuNrMp: '-',
  docuNrExterno: '-',
};

function ProcessDetail({ docuNrMp, docuNrExterno }) {
  const [processData, setProcessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [overlayType, setOverlayType] = useState(null);
  const [overlayDocDk, setOverlayDocDk] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const { buildRequestParams } = useAppContext();
  const { cpf, token, orgao } = buildRequestParams();
  const { alerts, handleAlertAction } = useAlertsContext();
  
  function openDialogBox(link, key) {
    setModalContent({ link, key });
  }

  function setOverlay(type, documentDk) {
    setOverlayType(type);
    setOverlayDocDk(documentDk);
    setShowOverlay(true);
  }

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
        <div className={`${processDetailBody} ${processDetailLoadingOrError}`}>
          <Spinner size="large" />
        </div>
      );
    }
    if (processData) {
      const { situation, phase, currentOwner, loader, secrecy, docClass, matter } =
        processData.identification;
      return (
        <div className={`${processDetailBody} ${processDetailLoadedData}`}>
          {processData.alerts.length === 0 ? (
            <strong className={processAlertsListEmpty}>Este procedimento não possui alertas</strong>
          ) : (
            <>
              <strong>
                Este procedimento possui {processData.alerts.length} alerta
                {processData.alerts.length === 1 ? '' : 's'} 
                <span className={spanProcessAlertsList}>(clique no alerta para ver as ações)</span>
              </strong>
              <div className={processAlertsList}>
                {processData.alerts.map((alertTag) => {
                  const type = alertTag.alertCode;
                  // searches for alert in alerts saved in context
                  let alert = alerts? alerts[alertTag.alertCode]?.find(
                    (alert) => alert.docNum === docuNrMp,
                  ) : null;

                  if (!alert) {
                    const formattedAlert = individualAlertFormatter(
                      { docNum: docuNrMp, ...alertTag },
                      cpf,
                      token,
                      orgao,
                    );
                    alert = formattedAlert;
                    // pass empty actions to hide them
                    alert.actions = [];
                  }
                  if(!alert){
                    return (
                       <div className={alertWrapper}>
                        <p className={alertWrapperTextEmpty}>Alerta e ações indisponível no momento...</p>
                       </div>
                    )
                  }
                  const {
                    actions,
                    backgroundColor,
                    backgroundColorChild,
                    icon,
                    key,
                    message,
                    isDeleted,
                    docDk,
                    docNum
                  } = alert;

                  return (
                    <div className={alertWrapper} key={key}>
                      <AlertBadge
                        handleDeletion={(alertKey, undo) => handleAlertAction(type, alertKey, undo)}
                        key={key}
                        customKey={key}
                        icon={icon}
                        backgroundColor={backgroundColorChild || backgroundColor}
                        message={message}
                        actions={actions}
                        isDeleted={isDeleted}
                        setOverlay={setOverlay}
                        docDk={docDk}
                        docNum={docNum}
                        type={type}
                        openDialogBox={openDialogBox}
                      />
                    </div>
                  );
                })}
              </div>

              {showOverlay && (
                <AlertsOverlay
                  type={overlayType}
                  docDk={overlayDocDk}
                  setShowOverlay={setShowOverlay}
                />
              )}
            </>
          )}

          <h3>PERSONAGENS</h3>
          <div className={processDetailSection}>
            {processData.characters.map(({ name, role }) => (
              <div className={processDetailListCardWrapper} key={`${name}-${role}`}>
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
          <div className={processDetailSection}>
            {processData.matters.map(({ matter, detail }) => (
              <div className={processDetailListCardWrapper} key={`${matter}-${detail}`}>
                <ListCard
                  fixedHeight
                  title={matter}
                  content={
                    <span className={listCardContent} title={detail}>
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
          <div className={processDetailIdSection}>
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
          <div className={processDetailProceedings}>
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
      <div className={`${processDetailBody} ${processDetailLoadingOrError}`}>
        <h3>Falha na conexão, tente novamente mais tarde.</h3>
      </div>
    );
  }

  return (
    <article className={processDetailOuter}>
      <div className={processDetailHeader}>
        <div className={processDetailHeaderLeft}>
          <h2>Detalhes do Procedimento</h2>
          Informações de relevância sobre o procedimento.
          <div>
            <span>{`Nº MPRJ: ${docuNrMp}`}</span>
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
        <div className={processDetailHeaderRight}>
          <ProcessDetailRobot height="120%" />
        </div>
      </div>
      {renderComponentBody()}
    </article>
  );
}

ProcessDetail.propTypes = propTypes;
ProcessDetail.defaultProps = defaultProps;
export default ProcessDetail;
