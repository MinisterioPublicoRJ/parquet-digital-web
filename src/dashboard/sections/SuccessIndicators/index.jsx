import React, { useState, useEffect } from 'react';

import './styles.css';
import SuccessIndicatorsChart from './SuccessIndicatorsChart';
import Api from '../../../api';
import { formatPercent } from '../../../utils';
import { useAuth } from '../../../app/authContext';
import { SectionTitle, Spinner } from '../../../components';

const SuccessIndicators = () => {
  const { user } = useAuth();
  const [successIndicators, setSuccessIndicators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await Api.getsuccessIndicators(user);
        setSuccessIndicators(response);
      } catch (e) {
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <Spinner size="medium" />;
  }

  // this values will never be lower than zero
  const resolutividadePercent = successIndicators.pResolutividade
    ? formatPercent(successIndicators.pResolutividade[0].y)
    : '0%';
  const elucidacoesPercent = successIndicators.pElucidacoes
    ? formatPercent(successIndicators.pElucidacoes[0].y)
    : '0%';
  const finalizacoesPercent = successIndicators.pFinalizacoes
    ? formatPercent(successIndicators.pFinalizacoes[0].y)
    : '0%';

  return (
    <article className="successIndicators-outer">
      <SectionTitle value="Indicadores de sucesso" glueToTop />
      <div className="successIndicators-main">
        <div className="successIndicators-item">
          <h3>Resolutividade</h3>
          <span>Denúncias + arquivamentos + acordos/vistas abertas, nos últimos 30 dias</span>
          <div className="successIndicators-tooltip--first">
            <strong>{resolutividadePercent}</strong>
          </div>

          <SuccessIndicatorsChart
            className="chart"
            data={successIndicators.pResolutividade}
            color={resolutividadePercent === '0%' ? '#f8f9fb' : '#F86C72'}
          />
        </div>
        <div className="successIndicators-item">
          <h3>Índice de Elucidação de Casos</h3>
          <span>
            Número de procedimentos com denúncia/Número de procedimentos do Grupo de vistas abertas,
            no período de 18 a 6 meses atrás
          </span>
          <div className="successIndicators-tooltip--second">
            <strong>{elucidacoesPercent}</strong>
          </div>
          <SuccessIndicatorsChart
            data={successIndicators.pElucidacoes}
            color={elucidacoesPercent === '0%' ? '#f8f9fb' : '#F8BD6C'}
          />
        </div>
        <div className="successIndicators-item">
          <h3>Índice de Finalização</h3>
          <span>
            Denúncias, arquivamentos, acordos/Número de procedimentos do Grupo de vistas abertas, no
            período de 18 a 6 meses atrás
          </span>
          <div className="successIndicators-tooltip--third">
            <strong>{finalizacoesPercent}</strong>
          </div>
          <SuccessIndicatorsChart
            className="chart"
            data={successIndicators.pFinalizacoes}
            color={finalizacoesPercent === '0%' ? '#f8f9fb' : '#71D0A4'}
          />
        </div>
      </div>
    </article>
  );
};

export default SuccessIndicators;