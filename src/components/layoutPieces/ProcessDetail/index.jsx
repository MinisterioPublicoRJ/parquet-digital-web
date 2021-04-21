import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ListCard } from 'mapasteca-web';

import './styles.css';
import { useAuth } from '../../../app/authContext';
import Api from '../../../api';
import { Spinner } from '..';
import { ProcessDetailRobot, User, Copy } from '../../../assets';

const propTypes = {
  onToggle: PropTypes.func.isRequired,
};

function ProcessDetail({ docuNrMp, docuNrExterno, onToggle }) {
  const [processData, setProcessData] = useState(null);
  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { buildRequestParams } = useAuth();

  useEffect(() => {
    getProcessData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiError]);

  async function getProcessData() {
    setLoading(true);
    setProcessData(null);
    try {
      const data = await Api.getProcessDetail({ ...buildRequestParams(), num_doc: docuNrMp });
      setProcessData(data);
    } catch (error) {
      setApiError(true);
    } finally {
      setLoading(false);
    }
  }

  function renderComponentBody() {
    if (loading) {
      return (
        <div className="processDetail-body processDetail-loading">
          <Spinner size="large" />
        </div>
      );
    }
    if (processData) {
      return (
        <div className="processDetail-body processDetail-loadedData">
          <h3>PERSONAGENS</h3>
          <div className="processDetail-personagem">pers</div>
          <h3>ASSUNTOS</h3>
          <div className="processDetail-assunto">pers</div>
          <h3>IDENTIFICAÇÃO</h3>
          <div className="processDetail-id">pers</div>
          <h3>ÚLTIMOS ANDAMENTOS</h3>
          <div className="processDetail-andamento">pers</div>
        </div>
      );
    }
    return (
      <div className="processDetail-body processDetail-apiError">
        <span>erro</span>
      </div>
    );
  }

  //   function renderComponent() {
  //     if (apiError) {
  //       return (
  //         <article className="process-detail-outer">
  //           <h2>
  //             <strong>Detalhes do procedimento</strong>
  //           </h2>
  //           Erro de api!
  //           <div className="modal-close">
  //             <button type="button" className="close" aria-label="Fechar" onClick={onToggle}>
  //               <span aria-hidden="true">&times;</span>
  //             </button>
  //           </div>
  //         </article>
  //       );
  //     }
  //     if (loading && !processData) {
  //       return (
  //         <article className="process-detail-outer">
  //           <h2>
  //             <strong>Detalhes do procedimento</strong>
  //           </h2>
  //           <Spinner size="large" />
  //
  //           <div className="modal-close">
  //             <button type="button" className="close" aria-label="Fechar" onClick={onToggle}>
  //               <span aria-hidden="true">&times;</span>
  //             </button>
  //           </div>
  //         </article>
  //       );
  //     }
  //     if (processData) {
  //       return (
  //         <article className="process-detail-outer">
  //           <div className="process-detail-header">
  //             <h2>
  //               <strong>Detalhes do procedimento</strong>
  //             </h2>
  //             N° {processData.documento.nr_mp}
  //             <LoginPromotron height={150} />
  //           </div>
  //
  //           <div className="characters-header">
  //             <strong>PERSONAGENS</strong>
  //           </div>
  //
  //           {processData.characters.map((character) => {
  //             return (
  //               <ListCard
  //                 detailColor="#BBBFC5"
  //                 icon={<User width={46} height={46} />}
  //                 content={<>
  // {' '}
  // {character.name}
  // {' '}
  //  </>}
  //               />
  //             );
  //           })}
  //
  //           <div className="matters-header">
  //             <strong>ASSUNTOS</strong>
  //           </div>
  //
  //           <div className="modal-close">
  //             <button type="button" className="close" aria-label="Fechar" onClick={onToggle}>
  //               <span aria-hidden="true">&times;</span>
  //             </button>
  //           </div>
  //         </article>
  //       );
  //     }
  //     return null;
  //   }
  return (
    <article className="process-detail-outer">
      <div className="process-detail-header">
        <div className="processDetail-headerLeft">
          <h2>Detalhes do Procedimento</h2>
          Informações de relevância sobre o procedimento.
          <div>
            <span>{`Nº ${docuNrExterno}`}</span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(docuNrExterno);
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
        <button type="button" className="close" aria-label="Fechar" onClick={onToggle}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </article>
  );
}

ProcessDetail.propTypes = propTypes;
export default ProcessDetail;
