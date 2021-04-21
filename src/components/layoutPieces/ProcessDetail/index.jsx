import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ListCard } from 'mapasteca-web';

import './styles.css';
import { useAuth } from '../../../app/authContext';
import Api from '../../../api';
import { Spinner } from '..';
import { LoginPromotron, User } from '../../../assets';

const propTypes = {
  onToggle: PropTypes.func.isRequired,
};

function ProcessDetail({ docuNrMp, onToggle }) {
  const [processData, setProcessData] = useState(null);
  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { buildRequestParams } = useAuth();

  async function getProcessData() {
    let promise;
    setLoading(true);
    try {
      promise = Api.getProcessDetail({ ...buildRequestParams(), num_doc: docuNrMp });
      const data = await promise;
      console.log('data: ', data);
      setProcessData(data);
      return data;
    } catch (error) {
      setApiError(true);
      return error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProcessData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiError]);

  function renderComponent() {
    if (apiError) {
      return (
        <article className="process-detail-outer">
          <h2>
            <strong>Detalhes do procedimento</strong>
          </h2>
          Erro de api!
          <div className="modal-close">
            <button type="button" className="close" aria-label="Fechar" onClick={onToggle}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </article>
      );
    }
    if (loading && !processData) {
      return (
        <article className="process-detail-outer">
          <h2>
            <strong>Detalhes do procedimento</strong>
          </h2>
          <Spinner size="large" />

          <div className="modal-close">
            <button type="button" className="close" aria-label="Fechar" onClick={onToggle}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </article>
      );
    }
    if (processData) {
      return (
        <article className="process-detail-outer">
          <div className="process-detail-header">
            <h2>
              <strong>Detalhes do procedimento</strong>
            </h2>
            N° {processData.documento.nr_mp}
            <LoginPromotron height={150} />
          </div>

          <div className="characters-header">
            <strong>PERSONAGENS</strong>
          </div>

          {processData.characters.map((character) => {
            return (
              <ListCard
                detailColor="#BBBFC5"
                icon={<User width={46} height={46} />}
                content={<> {character.name} </>}
              />
            );
          })}

          <div className="matters-header">
            <strong>ASSUNTOS</strong>
          </div>

          <div className="modal-close">
            <button type="button" className="close" aria-label="Fechar" onClick={onToggle}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </article>
      );
    }
    return null;
  }
  return renderComponent();
}

ProcessDetail.propTypes = propTypes;
export default ProcessDetail;
