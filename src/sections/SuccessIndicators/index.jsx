import React, { useState, useEffect } from 'react';

import './styles.css';
import Api from '../../api';
import { SectionTitle, Spinner } from '../../components';
import { getUser } from '../../user';
import SuccessIndicatorsChart from '../../components/graphs/SuccessIndicatorsChart';
import '../SuccessIndicators/styles.css';

const SuccessIndicators = () => {
  // eslint-disable-next-line no-shadow
  const [successIndicators, setSuccessIndicators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await Api.getsuccessIndicators(getUser());
        console.log(response)
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

  let obj = successIndicators
  return (
    <div className="page-success-indicators">
      <SectionTitle value="Indicadores de sucesso" />

      <h3>Resolutividade</h3>
      <p>[denúncias + arquivamentos + acordos/vistas abertas]</p>
      <SuccessIndicatorsChart data={obj.taxa_resolutivdade} />

      <h3>Índice de Elucidação - Denúncias.</h3>
      <p>[Número de procedimentos com denúncia]</p>
      <SuccessIndicatorsChart data={obj.p_elucidacoes} />

      <h3>Índice de Finalização</h3>
      <p>[ Andamentos que finalizam o processo]</p>
      <SuccessIndicatorsChart data={obj.p_finalizacoes} />
    </div>
  );
};

export default SuccessIndicators;
